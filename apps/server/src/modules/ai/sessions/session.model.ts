import { Schema, model } from "mongoose";
import { IAISession } from "./session.types";
import { RequestSchema, ResponseSchema, PerformanceSchema, TelemetrySchema, SecuritySchema } from "./schemas";
import { EventSchema } from "./schemas/event.schema";

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

        events: {
            type: [EventSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

aiSessionSchema.index({
    createdAt: -1,
});

aiSessionSchema.index({
    "request.provider": 1,
});

aiSessionSchema.index({
    "security.risk": 1,
});

aiSessionSchema.index({
    "performance.latency": -1,
});

export const AISession = model("AISession", aiSessionSchema);