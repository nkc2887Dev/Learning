import mongoose from "mongoose"
import { Part, RawPart, AssembledPart, type IPart, type IRawPart, type IAssembledPart } from "../models/part.model"
import type {
  CreateRawPartDto,
  CreateAssembledPartDto,
  UpdateRawPartDto,
  UpdateAssembledPartDto,
} from "../dtos/part.dto"
import { NotFoundException, BadRequestException } from "../utils/exceptions"

export class PartService {
  // Get all parts with optional filtering
  async getAllParts(type?: "raw" | "assembled"): Promise<IPart[]> {
    const filter = type ? { type } : {}
    return await Part.find(filter).populate({
      path: "components.part",
      model: "Part",
    })
  }

  // Get a part by ID
  async getPartById(id: string): Promise<IPart> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid part ID")
    }

    const part = await Part.findById(id).populate({
      path: "components.part",
      model: "Part",
    })

    if (!part) {
      throw new NotFoundException(`Part with ID ${id} not found`)
    }

    return part
  }

  // Create a raw part
  async createRawPart(partData: CreateRawPartDto): Promise<IRawPart> {
    const rawPart = new RawPart(partData)
    return await rawPart.save()
  }

  // Create an assembled part
  async createAssembledPart(partData: CreateAssembledPartDto): Promise<IAssembledPart> {
    // Validate that all component parts exist
    await this.validateComponents(partData.components)

    const assembledPart = new AssembledPart(partData)
    return await assembledPart.save()
  }

  // Update a raw part
  async updateRawPart(id: string, updateData: UpdateRawPartDto): Promise<IRawPart> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid part ID")
    }

    const part = await RawPart.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true })

    if (!part) {
      throw new NotFoundException(`Raw part with ID ${id} not found`)
    }

    return part
  }

  // Update an assembled part
  async updateAssembledPart(id: string, updateData: UpdateAssembledPartDto): Promise<IAssembledPart> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid part ID")
    }

    // If components are being updated, validate them
    if (updateData.components) {
      await this.validateComponents(updateData.components)
    }

    const part = await AssembledPart.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).populate({
      path: "components.part",
      model: "Part",
    })

    if (!part) {
      throw new NotFoundException(`Assembled part with ID ${id} not found`)
    }

    return part
  }

  // Delete a part
  async deletePart(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Invalid part ID")
    }

    // Check if this part is used in any assembled parts
    const usedInAssembly = await AssembledPart.findOne({
      "components.part": id,
    })

    if (usedInAssembly) {
      throw new BadRequestException(`Cannot delete part. It is used in assembled part: ${usedInAssembly.name}`)
    }

    const result = await Part.findByIdAndDelete(id)

    if (!result) {
      throw new NotFoundException(`Part with ID ${id} not found`)
    }
  }

  // Helper method to validate components
  private async validateComponents(components: { part: string; quantity: number }[]): Promise<void> {
    for (const component of components) {
      if (!mongoose.Types.ObjectId.isValid(component.part)) {
        throw new BadRequestException(`Invalid component part ID: ${component.part}`)
      }

      const partExists = await Part.findById(component.part)
      if (!partExists) {
        throw new NotFoundException(`Component part with ID ${component.part} not found`)
      }
    }
  }

  // Calculate the total cost of an assembled part
  async calculateAssembledPartCost(id: string): Promise<{ totalCost: number; breakdown: any[] }> {
    const part = await AssembledPart.findById(id).populate({
      path: "components.part",
      model: "Part",
    })

    if (!part) {
      throw new NotFoundException(`Assembled part with ID ${id} not found`)
    }

    let totalCost = 0
    const breakdown = []

    for (const component of part.components) {
      const componentPart = component.part as IPart
      const componentCost = componentPart.price * component.quantity
      totalCost += componentCost

      breakdown.push({
        partId: componentPart._id,
        name: componentPart.name,
        unitPrice: componentPart.price,
        quantity: component.quantity,
        subtotal: componentCost,
      })
    }

    return { totalCost, breakdown }
  }
}
