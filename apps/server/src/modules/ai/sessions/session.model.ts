import { Schema, model } from "mongoose";
import { IAISession } from "./session.types";
import { RequestSchema, ResponseSchema, PerformanceSchema, TelemetrySchema, SecuritySchema } from "./schemas";

const aiSessionSchema = new Schema<IAISession>(
    {
        request: {
            type: RequestSchema,
            required: true,
        },

        response: {
            type: ResponseSchema,
            default: () => ({}),
        },

        performance: {
            type: PerformanceSchema,
            default: () => ({}),
        },

        telemetry: {
            type: TelemetrySchema,
            default: () => ({}),
        },

        security: {
            type: SecuritySchema,
            default: () => ({}),
        },
    },
    {
        timestamps: true,
    }
);

export const AISession = model("AISession", aiSessionSchema);