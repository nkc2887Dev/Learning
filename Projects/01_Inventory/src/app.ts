import express, { type Application } from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import morgan from "morgan"
import rateLimit from "express-rate-limit"

import { connectDatabase } from "./config/database"
import { errorHandler } from "./middleware/errorHandler"
import { notFound } from "./middleware/notFound"

import rawPartRoutes from "./routes/rawPartRoutes"
import assembledPartRoutes from "./routes/assembledPartRoutes"

export class App {
  public app: Application

  constructor() {
    this.app = express()
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet())

    // CORS configuration
    this.app.use(
      cors({
        origin: process.env["ALLOWED_ORIGINS"]?.split(",") || ["http://localhost:3000"],
        credentials: true,
      }),
    )

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: {
        success: false,
        message: "Too many requests from this IP, please try again later.",
      },
    })
    this.app.use("/api", limiter)

    // Body parsing middleware
    this.app.use(express.json({ limit: "10mb" }))
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }))

    // Compression middleware
    this.app.use(compression())

    // Logging middleware
    if (process.env["NODE_ENV"] !== "test") {
      this.app.use(morgan("combined"))
    }
  }

  private initializeRoutes(): void {
    // Health check endpoint
    this.app.get("/health", (_req, res) => {
      res.json({
        success: true,
        message: "Assembly Parts API is running",
        timestamp: new Date().toISOString(),
        environment: process.env["NODE_ENV"] || "development",
      })
    })

    // API routes
    this.app.use("/api/raw-parts", rawPartRoutes)
    this.app.use("/api/assembled-parts", assembledPartRoutes)
  }

  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFound)

    // Global error handler
    this.app.use(errorHandler)
  }

  public async start(port: number): Promise<void> {
    try {
      await connectDatabase()

      this.app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`)
        console.log(`📚 API Documentation: http://localhost:${port}/health`)
        console.log(`🌍 Environment: ${process.env["NODE_ENV"] || "development"}`)
      })
    } catch (error) {
      console.error("❌ Failed to start server:", error)
      process.exit(1)
    }
  }
}