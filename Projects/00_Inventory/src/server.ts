import { App } from "./app"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

const app = new App()
const PORT = Number.parseInt(process.env.PORT || "3000", 10)
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/assembly-parts"

// Connect to database and start server
const startServer = async () => {
  try {
    await app.connectToDatabase(MONGO_URI)
    app.listen(PORT)
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
