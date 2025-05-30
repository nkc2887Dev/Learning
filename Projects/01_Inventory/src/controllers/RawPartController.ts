import type { Request, Response, NextFunction } from "express"
import { RawPartService } from "../services/RawPartService"
import { AppError } from "../utils/AppError"
import type { IApiResponse, IPartQuery } from "../@types"

export class RawPartController {
  private rawPartService: RawPartService

  constructor() {
    this.rawPartService = new RawPartService()
  }

  createRawPart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const part = await this.rawPartService.createRawPart(req.body)

      const response: IApiResponse = {
        success: true,
        data: part,
        message: "Raw part created successfully",
      }

      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }

  getAllRawParts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: IPartQuery = {
        page: Number.parseInt(req.query["page"] as string) || 1,
        limit: Number.parseInt(req.query['limit'] as string) || 10,
        sortBy: req.query['sortBy'] as string,
        sortOrder: req.query['sortOrder'] as "asc" | "desc",
        search: req.query['search'] as string,
        category: req.query['category'] as string,
        minPrice: req.query['minPrice'] ? Number.parseFloat(req.query['minPrice'] as string) : undefined,
        maxPrice: req.query['maxPrice'] ? Number.parseFloat(req.query['maxPrice'] as string) : undefined,
        inStock: req.query['inStock'] ? req.query['inStock'] === "true" : undefined,
      }
      const result = await this.rawPartService.getAllRawParts(query)

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

  getRawPartById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const part = await this.rawPartService.getRawPartById(req.params['id']!)

      const response: IApiResponse = {
        success: true,
        data: part,
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  updateRawPart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const part = await this.rawPartService.updateRawPart(req.params['id']!, req.body)

      const response: IApiResponse = {
        success: true,
        data: part,
        message: "Raw part updated successfully",
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  deleteRawPart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.rawPartService.deleteRawPart(req.params['id']!)

      const response: IApiResponse = {
        success: true,
        message: "Raw part deleted successfully",
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  updateStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { quantity, operation } = req.body

      if (!quantity || !operation) {
        throw new AppError("Quantity and operation are required", 400)
      }

      if (!["add", "subtract"].includes(operation)) {
        throw new AppError('Operation must be either "add" or "subtract"', 400)
      }

      const part = await this.rawPartService.updateStock(req.params['id']!, quantity, operation)

      const response: IApiResponse = {
        success: true,
        data: part,
        message: `Stock ${operation === "add" ? "added" : "subtracted"} successfully`,
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  getLowStockParts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const threshold = Number.parseInt(req.query['threshold'] as string) || 10
      const parts = await this.rawPartService.getLowStockParts(threshold)

      const response: IApiResponse = {
        success: true,
        data: parts,
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  getPartsBySupplier = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { supplier } = req.params;

      if (!supplier) {
        res.status(400).json({
          success: false,
          message: "Supplier ID is required",
          errors: {},
        })
        return
      }
      const parts = await this.rawPartService.getPartsBySupplier(supplier)

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
