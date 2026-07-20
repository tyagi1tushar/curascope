import { Schema } from "mongoose";

export const TelemetrySchema = new Schema(
  {
    traceId: {
      type: String,
      default: "",
    },

    spanId: {
      type: String,
      default: "",
    },

    spanName: {
      type: String,
      default: "",
    },

    serviceName: {
      type: String,
      default: "CuraScope",
    },
  },
  {
    _id: false,
  }
);