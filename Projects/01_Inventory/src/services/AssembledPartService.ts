import { AssembledPart, type IAssembledPartDocument } from "../models/AssembledPart"
import type { IAssembledPart, IPartQuery } from "../@types"
import { AppError } from "../utils/AppError"

export class AssembledPartService {
  async createAssembledPart(partData: Partial<IAssembledPart>): Promise<IAssembledPartDocument> {
    try {
      const assembledPart = new AssembledPart(partData)
      return await assembledPart.save()
    } catch (error: any) {
      throw new AppError(error.message, 400)
    }
  }

  async getAllAssembledParts(query: IPartQuery): Promise<{
    parts: IAssembledPartDocument[]
    totalCount: number
    currentPage: number
    totalPages: number
  }> {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      search,
      minPrice,
      maxPrice,
      inStock,
    } = query

    // Build filter object
    const filter: any = {}

    if (search) {
      filter.$text = { $search: search }
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {}
      if (minPrice !== undefined) filter.price.$gte = minPrice
      if (maxPrice !== undefined) filter.price.$lte = maxPrice
    }

    if (inStock !== undefined) {
      filter.stockQuantity = inStock ? { $gt: 0 } : { $eq: 0 }
    }

    // Build sort object
    const sort: any = {}
    sort[sortBy] = sortOrder === "asc" ? 1 : -1

    const skip = (page - 1) * limit

    const [parts, totalCount] = await Promise.all([
      AssembledPart.find(filter).populate("components.partId").sort(sort).skip(skip).limit(limit).lean(),
      AssembledPart.countDocuments(filter),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return {
      parts: parts as IAssembledPartDocument[],
      totalCount,
      currentPage: page,
      totalPages,
    }
  }

  async getAssembledPartById(id: string): Promise<IAssembledPartDocument> {
    const part = await AssembledPart.findById(id).populate("components.partId")
    if (!part) {
      throw new AppError("Assembled part not found", 404)
    }
    return part
  }

  async updateAssembledPart(id: string, updateData: Partial<IAssembledPart>): Promise<IAssembledPartDocument> {
    try {
      const part = await AssembledPart.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true },
      ).populate("components.partId")

      if (!part) {
        throw new AppError("Assembled part not found", 404)
      }

      return part
    } catch (error: any) {
      throw new AppError(error.message, 400)
    }
  }

  async deleteAssembledPart(id: string): Promise<void> {
    // Check if this part is used in other assembled parts
    const usedInAssembly = await AssembledPart.findOne({
      "components.partId": id,
      "components.partType": "AssembledPart",
    })

    if (usedInAssembly) {
      throw new AppError(`Cannot delete part. It is used in assembled part: ${usedInAssembly.name}`, 400)
    }

    const part = await AssembledPart.findByIdAndDelete(id)
    if (!part) {
      throw new AppError("Assembled part not found", 404)
    }
  }

  async calculateTotalCost(id: string): Promise<{
    totalCost: number
    breakdown: Array<{
      partId: string
      name: string
      type: string
      unitCost: number
      quantity: number
      subtotal: number
      isOptional: boolean
    }>
  }> {
    const part = await AssembledPart.findById(id).populate("components.partId")
    if (!part) {
      throw new AppError("Assembled part not found", 404)
    }

    let totalCost = 0
    const breakdown = []

    for (const component of part.components) {
      const componentPart = component.partId as any
      const subtotal = componentPart.price * component.quantity

      if (!component.isOptional) {
        totalCost += subtotal
      }

      breakdown.push({
        partId: componentPart._id.toString(),
        name: componentPart.name,
        type: component.partType,
        unitCost: componentPart.price,
        quantity: component.quantity,
        subtotal,
        isOptional: component.isOptional || false,
      })
    }

    return { totalCost, breakdown }
  }

  async checkComponentAvailability(
    id: string,
    requiredQuantity = 1,
  ): Promise<{
    canAssemble: boolean
    missingComponents: Array<{
      partId: string
      name: string
      required: number
      available: number
      shortage: number
    }>
  }> {
    const part = await AssembledPart.findById(id).populate("components.partId")
    if (!part) {
      throw new AppError("Assembled part not found", 404)
    }

    const missingComponents = []
    let canAssemble = true

    for (const component of part.components) {
      if (component.isOptional) continue

      const componentPart = component.partId as any
      const requiredTotal = component.quantity * requiredQuantity

      if (componentPart.stockQuantity < requiredTotal) {
        canAssemble = false
        missingComponents.push({
          partId: componentPart._id.toString(),
          name: componentPart.name,
          required: requiredTotal,
          available: componentPart.stockQuantity,
          shortage: requiredTotal - componentPart.stockQuantity,
        })
      }
    }

    return { canAssemble, missingComponents }
  }

  async getPartsBySkillLevel(skillLevel: "beginner" | "intermediate" | "advanced"): Promise<IAssembledPartDocument[]> {
    return await AssembledPart.find({ skillLevel }).populate("components.partId").sort({ assemblyTime: 1 })
  }
}
