import { z } from "zod";

export const createSessionSchema = z.object({
  prompt: z.string().min(1),

  provider: z.enum([
    "gemini",
    "openai",
    "claude",
    "grok",
    "ollama",
    "deepseek",
    "other",
  ]),

  model: z.string().min(1),
});