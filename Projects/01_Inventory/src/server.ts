import dotenv from "dotenv"
import { App } from "./app"

// Load environment variables
dotenv.config()

const PORT = Number.parseInt(process.env['PORT'] || "3000", 10)

// Create and start the application
const app = new App()
app.start(PORT)

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: unknown, promise: Promise<any>) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason)
  process.exit(1)
})

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception:", error)
  process.exit(1)
})
