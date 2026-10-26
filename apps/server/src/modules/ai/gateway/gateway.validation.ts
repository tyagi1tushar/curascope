import { z } from "zod";

export const gatewayRequestSchema = z
    .object({
        prompt: z
            .string()
            .trim()
            .min(1, "Prompt cannot be empty")
            .max(20_000, "Prompt cannot exceed 20,000 characters"),

        provider: z.literal("groq", {
            error: "Only the Groq provider is currently supported",
        }),

        model: z
            .string()
            .trim()
            .min(1, "Model is required")
            .max(100, "Model cannot exceed 100 characters"),
    })
    .strict();

export type GatewayRequestInput = z.infer<typeof gatewayRequestSchema>;