import mongoose from "mongoose";
import { env } from "../config/env";
import { logger } from "../logger/logger";

export async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGODB_URI);

    logger.info("✅ MongoDB connected successfully");
  } catch (error) {
    logger.error(error, "❌ MongoDB connection failed");

    process.exit(1);
  }
}