import { Schema } from "mongoose";

export const ResponseSchema = new Schema(
  {
    text: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["success", "error"],
      default: "success",
    },

    finishReason: {
      type: String,
      default: "",
    },

  },
  {
    _id: false,
  }
);