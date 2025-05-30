export class AppError extends Error {
    public statusCode: number
    public errors?: string[]
  
    constructor(message: string, statusCode = 500, errors?: string[]) {
      super(message)
      this.statusCode = statusCode
      this.errors = errors
  
      Error.captureStackTrace(this, this.constructor)
    }
  }
  