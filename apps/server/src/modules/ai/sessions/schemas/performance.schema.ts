import { Schema } from "mongoose";

export const PerformanceSchema = new Schema(
  {
    latency: {
      type: Number,
      default: 0,
    },

    tokens: {
      input: {
        type: Number,
        default: 0,
      },

      output: {
        type: Number,
        default: 0,
      },

      total: {
        type: Number,
        default: 0,
      },
    },

    estimatedCost: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);