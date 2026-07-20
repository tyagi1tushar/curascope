import { SpanStatusCode } from "@opentelemetry/api";

import { tracer } from "../../../core/telemetry";
import { SessionService } from "../sessions/session.service";

import { GeminiProvider } from "./providers";
import { CostEstimator } from "./pricing";
import { PromptScanner } from "./security";
import { ChatRequest, ChatResponse } from "./gateway.types";

import {
    aiCostCounter,
    aiErrorsCounter,
    aiInputTokensCounter,
    aiLatencyHistogram,
    aiOutputTokensCounter,
    aiRequestsCounter,
} from "../../../core/telemetry";

export class GatewayService {
    static async chat(request: ChatRequest): Promise<ChatResponse> {
        return tracer.startActiveSpan("ai.chat", async (span) => {
            const start = Date.now();

            try {
                const security = PromptScanner.scan(request.prompt);

                span.setAttributes({
                    "ai.provider": request.provider,
                    "ai.model": request.model,
                    "security.score": security.score,
                    "security.risk": security.risk,
                    "security.findings.count": security.findings.length,
                });

                span.addEvent("Security scan completed");

                const providerResponse = await GeminiProvider.generate(request);

                span.addEvent("Provider response received");

                const latency = Date.now() - start;

                const estimatedCost = CostEstimator.estimate(
                    request.provider,
                    request.model,
                    providerResponse.tokens.input,
                    providerResponse.tokens.output
                );

                const session = await SessionService.createSession({
                    request: {
                        prompt: request.prompt,
                        provider: request.provider,
                        model: request.model,
                    },
                    response: {
                        text: providerResponse.text,
                        status: "success",
                    },
                    performance: {
                        latency,
                        tokens: providerResponse.tokens,
                        estimatedCost,
                    },
                    security: {
                        score: security.score,
                        risk: security.risk,
                        findings: security.findings,
                    },
                });

                span.addEvent("Session persisted");

                span.setAttributes({
                    "ai.latency.ms": latency,
                    "ai.tokens.input": providerResponse.tokens.input,
                    "ai.tokens.output": providerResponse.tokens.output,
                    "ai.tokens.total": providerResponse.tokens.total,
                    "ai.cost.estimated": estimatedCost,
                    "session.id": session._id.toString(),
                });

                span.setStatus({
                    code: SpanStatusCode.OK,
                });

                aiRequestsCounter.add(1, {
                    provider: request.provider,
                    model: request.model,
                });

                aiLatencyHistogram.record(latency, {
                    provider: request.provider,
                    model: request.model,
                });

                aiInputTokensCounter.add(providerResponse.tokens.input, {
                    provider: request.provider,
                    model: request.model,
                });

                aiOutputTokensCounter.add(providerResponse.tokens.output, {
                    provider: request.provider,
                    model: request.model,
                });

                aiCostCounter.add(estimatedCost, {
                    provider: request.provider,
                    model: request.model,
                });

                return {
                    text: providerResponse.text,
                    provider: request.provider,
                    model: request.model,
                    latency,
                    tokens: providerResponse.tokens,
                    estimatedCost,
                    traceId: span.spanContext().traceId,
                    sessionId: session._id.toString(),
                };
            } catch (error) {
                aiErrorsCounter.add(1, {
                    provider: request.provider,
                    model: request.model,
                });

                span.recordException(error as Error);

                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message:
                        error instanceof Error ? error.message : "Unknown error",
                });

                throw error;
            } finally {
                span.end();
            }
        });
    }
}