import type { Request, Response, NextFunction } from "express"
import { PartService } from "../services/part.service"
import { validateOrReject } from "class-validator"
import { plainToClass } from "class-transformer"
import { CreateRawPartDto, CreateAssembledPartDto, UpdateRawPartDto, UpdateAssembledPartDto } from "../dtos/part.dto"

export class PartController {
  private partService: PartService

  constructor() {
    this.partService = new PartService()
  }

  // Get all parts
  getAllParts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const type = req.query.type as "raw" | "assembled" | undefined
      const parts = await this.partService.getAllParts(type)
      res.status(200).json({ success: true, data: parts })
    } catch (error) {
      next(error)
    }
  }

  // Get a part by ID
  getPartById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const part = await this.partService.getPartById(req.params.id)
      res.status(200).json({ success: true, data: part })
    } catch (error) {
      next(error)
    }
  }

  // Create a raw part
  createRawPart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const partData = plainToClass(CreateRawPartDto, req.body)
      await validateOrReject(partData)

      const newPart = await this.partService.createRawPart(partData)
      res.status(201).json({ success: true, data: newPart })
    } catch (error) {
      next(error)
    }
  }

  // Create an assembled part
  createAssembledPart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const partData = plainToClass(CreateAssembledPartDto, req.body)
      await validateOrReject(partData)

      const newPart = await this.partService.createAssembledPart(partData)
      res.status(201).json({ success: true, data: newPart })
    } catch (error) {
      next(error)
    }
  }

  // Update a raw part
  updateRawPart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updateData = plainToClass(UpdateRawPartDto, req.body)
      await validateOrReject(updateData)

      const updatedPart = await this.partService.updateRawPart(req.params.id, updateData)
      res.status(200).json({ success: true, data: updatedPart })
    } catch (error) {
      next(error)
    }
  }

  // Update an assembled part
  updateAssembledPart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updateData = plainToClass(UpdateAssembledPartDto, req.body)
      await validateOrReject(updateData)

      const updatedPart = await this.partService.updateAssembledPart(req.params.id, updateData)
      res.status(200).json({ success: true, data: updatedPart })
    } catch (error) {
      next(error)
    }
  }

  // Delete a part
  deletePart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.partService.deletePart(req.params.id)
      res.status(200).json({ success: true, message: "Part deleted successfully" })
    } catch (error) {
      next(error)
    }
  }

  // Calculate assembled part cost
  calculateAssembledPartCost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const costBreakdown = await this.partService.calculateAssembledPartCost(req.params.id)
      res.status(200).json({ success: true, data: costBreakdown })
    } catch (error) {
      next(error)
    }
  }
}
