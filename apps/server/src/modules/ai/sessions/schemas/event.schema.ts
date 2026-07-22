import { Schema } from "mongoose";

export const EventSchema = new Schema(
    {
        name: String,
        timestamp: Date,
    },
    {
        _id: false,
    }
);