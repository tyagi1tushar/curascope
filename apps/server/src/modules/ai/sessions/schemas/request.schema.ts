import { Schema } from "mongoose";

export const RequestSchema = new Schema(
  {
    prompt: {
      type: String,
      required: true,
      trim: true,
    },

    provider: {
      type: String,
      enum: [
        "gemini",
        "openai",
        "claude",
        "grok",
        "ollama",
        "deepseek",
        "other",
      ],
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    temperature: {
      type: Number,
      default: 0,
    },

    maxTokens: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);