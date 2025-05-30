import express, { type Application } from "express"
import mongoose from "mongoose"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import morgan from "morgan"
import "reflect-metadata" // Required for class-validator and class-transformer

import partRoutes from "./routes/part.routes"
import { errorMiddleware } from "./middleware/error.middleware"

export class App {
  public app: Application

  constructor() {
    this.app = express()
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(morgan("dev"))
  }

  private initializeRoutes(): void {
    this.app.use("/api/parts", partRoutes)
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware)
  }

  public async connectToDatabase(mongoUri: string): Promise<void> {
    try {
      await mongoose.connect(mongoUri)
      console.log("Connected to MongoDB")
    } catch (error) {
      console.error("MongoDB connection error:", error)
      process.exit(1)
    }
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }
}
