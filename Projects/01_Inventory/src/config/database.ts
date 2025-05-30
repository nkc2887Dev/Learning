import mongoose from "mongoose"

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env["MONGODB_URI"] || "mongodb://localhost:27017/01-Inventory"

    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    console.log("✅ Connected to MongoDB")

    // Handle connection events
    mongoose.connection.on("error", (error) => {
      console.error("❌ MongoDB connection error:", error)
    })

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected")
    })

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close()
      console.log("🔌 MongoDB connection closed through app termination")
      process.exit(0)
    })
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error)
    process.exit(1)
  }
}
