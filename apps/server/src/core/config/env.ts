import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),

  PORT: z.coerce.number().default(5000),

  MONGODB_URI: z.string().min(1),

 GROQ_API_KEY: z.string().min(1),

  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),

  OTEL_EXPORTER_OTLP_HEADERS: z.string().default(""),

  APP_NAME: z.string(),
});

export const env = envSchema.parse(process.env);