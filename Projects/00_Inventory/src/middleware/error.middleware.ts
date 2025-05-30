import type { Request, Response, NextFunction } from "express"
import { HttpException } from "../utils/exceptions"
import { ValidationError } from "class-validator"

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`[Error] ${error.message}`)
  console.error(error.stack)

  if (error instanceof HttpException) {
    res.status(error.status).json({
      success: false,
      message: error.message,
    })
    return
  }

  // Handle class-validator errors
  if (error instanceof Array && error[0] instanceof ValidationError) {
    const validationErrors = error.flatMap((err: ValidationError) => {
      return Object.values(err.constraints || {})
    })

    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validationErrors,
    })
    return
  }

  // Default error handler
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  })
}
