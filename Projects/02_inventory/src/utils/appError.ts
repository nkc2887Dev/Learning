// utils/AppError.ts
export function AppError(message: string, statusCode = 500, errors?: string[]) {
  const error = new Error(message) as Error & {
    statusCode: number
    errors?: string[]
    name: string
  }

  error.name = "AppError"
  error.statusCode = statusCode
  error.errors = errors

  return error
}
