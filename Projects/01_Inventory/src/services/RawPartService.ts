import { RawPart, type IRawPartDocument } from "../models/RawPart"
import type { IRawPart, IPartQuery } from "../@types"
import { AppError } from "../utils/AppError"

export class RawPartService {
  async createRawPart(partData: Partial<IRawPart>): Promise<IRawPartDocument> {
    try {
      const rawPart = new RawPart(partData)
      return await rawPart.save()
    } catch (error: any) {
      if (error.code === 11000) {
        throw new AppError("Part number already exists", 400)
      }
      throw new AppError(error.message, 400)
    }
  }

  async getAllRawParts(query: IPartQuery): Promise<{
    parts: IRawPartDocument[]
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
      category,
      minPrice,
      maxPrice,
      inStock,
    } = query

    // Build filter object
    const filter: any = {}

    if (search) {
      filter.$text = { $search: search }
    }

    if (category) {
      filter.category = category
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
      RawPart.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      RawPart.countDocuments(filter),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return {
      parts: parts as IRawPartDocument[],
      totalCount,
      currentPage: page,
      totalPages,
    }
  }

  async getRawPartById(id: string): Promise<IRawPartDocument> {
    const part = await RawPart.findById(id)
    if (!part) {
      throw new AppError("Raw part not found", 404)
    }
    return part
  }

  async updateRawPart(id: string, updateData: Partial<IRawPart>): Promise<IRawPartDocument> {
    try {
      const part = await RawPart.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true })

      if (!part) {
        throw new AppError("Raw part not found", 404)
      }

      return part
    } catch (error: any) {
      if (error.code === 11000) {
        throw new AppError("Part number already exists", 400)
      }
      throw new AppError(error.message, 400)
    }
  }

  async deleteRawPart(id: string): Promise<void> {
    // Check if this part is used in any assembled parts
    const { AssembledPart } = await import("../models/AssembledPart")
    const usedInAssembly = await AssembledPart.findOne({
      "components.partId": id,
      "components.partType": "RawPart",
    })

    if (usedInAssembly) {
      throw new AppError(`Cannot delete part. It is used in assembled part: ${usedInAssembly.name}`, 400)
    }

    const part = await RawPart.findByIdAndDelete(id)
    if (!part) {
      throw new AppError("Raw part not found", 404)
    }
  }

  async updateStock(id: string, quantity: number, operation: "add" | "subtract"): Promise<IRawPartDocument> {
    const part = await RawPart.findById(id)
    if (!part) {
      throw new AppError("Raw part not found", 404)
    }

    const newQuantity = operation === "add" ? part.stockQuantity + quantity : part.stockQuantity - quantity

    if (newQuantity < 0) {
      throw new AppError("Insufficient stock quantity", 400)
    }

    part.stockQuantity = newQuantity
    return await part.save()
  }

  async getLowStockParts(threshold = 10): Promise<IRawPartDocument[]> {
    return await RawPart.find({
      stockQuantity: { $lte: threshold, $gt: 0 },
    }).sort({ stockQuantity: 1 })
  }

  async getPartsBySupplier(supplier: string): Promise<IRawPartDocument[]> {
    return await RawPart.find({ supplier }).sort({ name: 1 })
  }
}
