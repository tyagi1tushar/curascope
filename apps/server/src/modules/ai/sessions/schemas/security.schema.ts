import { Schema } from "mongoose";

export const SecuritySchema = new Schema(
  {
    score: {
      type: Number,
      default: 100,
    },

    risk: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    findings: {
      type: [String],
      default: [],
    },
  },
  {
    _id: false,
  }
);