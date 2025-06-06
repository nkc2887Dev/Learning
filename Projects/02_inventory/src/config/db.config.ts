import mongoose from "mongoose";
import config from "./processEnv.config";
import { DB_EVENTS } from "../utils/constants/common";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGO.URL);
    console.log("✅ MongoDB connected successfully.");

    const db = mongoose.connection;

    db.once(DB_EVENTS.OPEN, () => {
      console.log("📡 MongoDB connection is open.");
    });

    db.on(DB_EVENTS.OPEN, (error) => {
      console.error("❌ MongoDB error:", error);
    });

    db.on(DB_EVENTS.DISCONNECTED, () => {
      console.warn("⚠️ MongoDB disconnected.");
    });
  } catch (err) {
    console.error("❌ MongoDB initial connection error:", err);
    process.exit(1);
  }
};

export { connectDB, mongoose };
