import type { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"
import type { IApiResponse } from "../@types"

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error("Error:", error)

  let statusCode = 500
  let message = "Internal Server Error"
  let errors: string[] = []

  if (error instanceof AppError) {
    statusCode = error.statusCode
    message = error.message
    errors = error.errors || []
  } else if (error.name === "ValidationError") {
    statusCode = 400
    message = "Validation Error"
    errors = Object.values((error as any).errors).map((err: any) => err.message)
  } else if (error.name === "CastError") {
    statusCode = 400
    message = "Invalid ID format"
  } else if ((error as any).code === 11000) {
    statusCode = 400
    message = "Duplicate field value"
    const field = Object.keys((error as any).keyValue)[0]
    errors = [`${field} already exists`]
  }

  const response: IApiResponse = {
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined,
  }

  res.status(statusCode).json(response)
}
