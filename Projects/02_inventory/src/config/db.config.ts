import mongoose from "mongoose";
import config from "./processEnv.config";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGO.URL);
    console.log("✅ MongoDB connected successfully.");

    const db = mongoose.connection;

    db.once("open", () => {
      console.log("📡 MongoDB connection is open.");
    });

    db.on("error", (error) => {
      console.error("❌ MongoDB error:", error);
    });

    db.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected.");
    });
  } catch (err) {
    console.error("❌ MongoDB initial connection error:", err);
    process.exit(1);
  }
};

export { connectDB, mongoose };
