import { SpanStatusCode } from "@opentelemetry/api";

import { tracer } from "../../../core/telemetry";
import { SessionService } from "../sessions/session.service";

import { GeminiProvider } from "./providers";
import { CostEstimator } from "./pricing";
import { PromptScanner } from "./security";
import { ChatRequest, ChatResponse } from "./gateway.types";

import { aiLogger } from "./gateway.logger";

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

            const timeline: {
                name: string;
                timestamp: Date;
            }[] = [];

            const recordEvent = (name: string) => {
                const timestamp = new Date();

                timeline.push({
                    name,
                    timestamp,
                });

                span.addEvent(name, {
                    timestamp: timestamp.toISOString(),
                });
            };

            recordEvent("Request received");

            aiLogger.info({
                event: "ai.request.started",
                provider: request.provider,
                model: request.model,
                promptLength: request.prompt.length,
            });

            try {
                const security = PromptScanner.scan(request.prompt);

                recordEvent("Prompt scanned");

                span.setAttributes({
                    "ai.provider": request.provider,
                    "ai.model": request.model,
                    "security.score": security.score,
                    "security.risk": security.risk,
                    "security.findings.count": security.findings.length,
                });

                recordEvent("Security scan completed");

                aiLogger.info({
                    event: "ai.security.scan",
                    score: security.score,
                    risk: security.risk,
                    findings: security.findings,
                });

                const providerName =
                    request.provider.charAt(0).toUpperCase() +
                    request.provider.slice(1);

                recordEvent(`${providerName} called`);

                const providerResponse = await GeminiProvider.generate(request);

                recordEvent("Response received");

                const latency = Date.now() - start;

                const estimatedCost = CostEstimator.estimate(
                    request.provider,
                    request.model,
                    providerResponse.tokens.input,
                    providerResponse.tokens.output
                );

                recordEvent("Cost estimated");

                recordEvent("Session stored");

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

                    events: timeline,
                });

                aiLogger.info({
                    event: "ai.request.completed",

                    traceId: span.spanContext().traceId,
                    spanId: span.spanContext().spanId,

                    sessionId: session._id.toString(),

                    provider: request.provider,
                    model: request.model,

                    duration: latency,

                    inputTokens: providerResponse.tokens.input,
                    outputTokens: providerResponse.tokens.output,
                    totalTokens: providerResponse.tokens.total,

                    estimatedCost,

                    securityRisk: security.risk,

                    status: "success",
                });

                span.setAttributes({
                    // Provider
                    "ai.provider": request.provider,
                    "ai.model": request.model,

                    // Prompt
                    "ai.prompt.length": request.prompt.length,

                    // Performance
                    "ai.latency.ms": latency,
                    "ai.tokens.input": providerResponse.tokens.input,
                    "ai.tokens.output": providerResponse.tokens.output,
                    "ai.tokens.total": providerResponse.tokens.total,
                    "ai.cost.estimated": estimatedCost,

                    // Security
                    "security.score": security.score,
                    "security.risk": security.risk,
                    "security.findings.count": security.findings.length,

                    // Session
                    "session.id": session._id.toString(),

                    // Response
                    "response.status": "success",
                });

                span.addEvent("Request completed");

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

                    security: {
                        score: security.score,
                        risk: security.risk,
                        findings: security.findings,
                    },

                    traceId: span.spanContext().traceId,

                    sessionId: session._id.toString(),
                };
            } catch (error) {
                aiErrorsCounter.add(1, {
                    provider: request.provider,
                    model: request.model,
                });

                aiLogger.error({
                    event: "ai.request.failed",

                    traceId: span.spanContext().traceId,

                    provider: request.provider,
                    model: request.model,

                    error: error instanceof Error ? error.message : "Unknown error",
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