import type { Request, Response, NextFunction } from "express"
import { AssembledPartService } from "../services/AssembledPartService"
import { AppError } from "../utils/AppError"
import type { IApiResponse, IPartQuery } from "../@types"

export class AssembledPartController {
  private assembledPartService: AssembledPartService

  constructor() {
    this.assembledPartService = new AssembledPartService()
  }

  createAssembledPart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const part = await this.assembledPartService.createAssembledPart(req.body)

      const response: IApiResponse = {
        success: true,
        data: part,
        message: "Assembled part created successfully",
      }

      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }

  getAllAssembledParts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: IPartQuery = {
        page: Number.parseInt(req.query["page"] as string) || 1,
        limit: Number.parseInt(req.query['limit'] as string) || 10,
        sortBy: req.query['sortBy'] as string,
        sortOrder: req.query['sortOrder'] as "asc" | "desc",
        search: req.query['search'] as string,
        minPrice: req.query['minPrice'] ? Number.parseFloat(req.query['minPrice'] as string) : undefined,
        maxPrice: req.query['maxPrice'] ? Number.parseFloat(req.query['maxPrice'] as string) : undefined,
        inStock: req.query['inStock'] ? req.query['inStock'] === "true" : undefined,
      }

      const result = await this.assembledPartService.getAllAssembledParts(query)

      const response: IApiResponse = {
        success: true,
        data: {
          parts: result.parts,
          pagination: {
            currentPage: result.currentPage,
            totalPages: result.totalPages,
            totalCount: result.totalCount,
            hasNext: result.currentPage < result.totalPages,
            hasPrev: result.currentPage > 1,
          },
        },
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  getAssembledPartById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const part = await this.assembledPartService.getAssembledPartById(req.params['id']!)

      const response: IApiResponse = {
        success: true,
        data: part,
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  updateAssembledPart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const part = await this.assembledPartService.updateAssembledPart(req.params['id']!, req.body)

      const response: IApiResponse = {
        success: true,
        data: part,
        message: "Assembled part updated successfully",
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  deleteAssembledPart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.assembledPartService.deleteAssembledPart(req.params['id']!)

      const response: IApiResponse = {
        success: true,
        message: "Assembled part deleted successfully",
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  calculateTotalCost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.assembledPartService.calculateTotalCost(req.params['id']!)

      const response: IApiResponse = {
        success: true,
        data: result,
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  checkComponentAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requiredQuantity = Number.parseInt(req.query['quantity'] as string) || 1
      const result = await this.assembledPartService.checkComponentAvailability(req.params['id']!, requiredQuantity)

      const response: IApiResponse = {
        success: true,
        data: result,
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  getPartsBySkillLevel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { skillLevel } = req.params;

      if (!skillLevel) {
        res.status(400).json({
          success: false,
          message: "Skill Level is required",
          errors: {},
        })
        return
      }

      if (!["beginner", "intermediate", "advanced"].includes(skillLevel)) {
        throw new AppError("Invalid skill level", 400)
      }

      const parts = await this.assembledPartService.getPartsBySkillLevel(skillLevel as any)

      const response: IApiResponse = {
        success: true,
        data: parts,
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
