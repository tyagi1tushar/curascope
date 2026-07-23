import { SpanStatusCode } from "@opentelemetry/api";

import { tracer } from "../../../core/telemetry";
import { SessionService } from "../sessions/session.service";

import { GeminiProvider } from "./providers";
import { CostEstimator } from "./pricing";
import { PromptScanner } from "./security";
import { ChatRequest, ChatResponse } from "./gateway.types";
import { observability } from "../../../core/telemetry/observability";
import {
    aiRequestsCounter,
    aiLatencyHistogram,
    aiInputTokensCounter,
    aiOutputTokensCounter,
    aiCostCounter,
    aiErrorsCounter,
    aiSecurityCounter,
} from "../../../core/telemetry/metrics";

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

            observability.info("ai.request.received", {
                provider: request.provider,
                model: request.model,
                promptLength: request.prompt.length,
            });

            try {
                const security = PromptScanner.scan(request.prompt);

                aiSecurityCounter.add(1, {
                    risk: security.risk,
                    provider: request.provider,
                    model: request.model,
                });

                recordEvent("Prompt scanned");

                span.setAttributes({
                    "ai.provider": request.provider,
                    "ai.model": request.model,
                    "security.score": security.score,
                    "security.risk": security.risk,
                    "security.findings.count": security.findings.length,
                });

                recordEvent("Security scan completed");

                observability.info("security.scan.completed", {
                    score: security.score,
                    risk: security.risk,
                    findings: security.findings.length,
                });

                const providerName =
                    request.provider.charAt(0).toUpperCase() +
                    request.provider.slice(1);

                recordEvent(`${providerName} called`);

                observability.info("provider.request.started", {
                    provider: request.provider,
                    model: request.model,
                });

                const providerResponse = await GeminiProvider.generate(request);

                const latency = Date.now() - start;

                observability.info("provider.response.received", {
                    latency,
                    inputTokens: providerResponse.tokens.input,
                    outputTokens: providerResponse.tokens.output,
                    totalTokens: providerResponse.tokens.total,
                });

                recordEvent("Response received");

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

                observability.info("database.session.saved", {
                    sessionId: session._id.toString(),
                });

                observability.info("ai.request.completed", {
                    sessionId: session._id.toString(),
                    provider: request.provider,
                    model: request.model,
                    latency,
                    estimatedCost,
                    inputTokens: providerResponse.tokens.input,
                    outputTokens: providerResponse.tokens.output,
                    totalTokens: providerResponse.tokens.total,
                    securityRisk: security.risk,
                });

                span.setAttributes({
                    "ai.provider": request.provider,
                    "ai.model": request.model,
                    "ai.prompt.length": request.prompt.length,
                    "ai.latency.ms": latency,
                    "ai.tokens.input": providerResponse.tokens.input,
                    "ai.tokens.output": providerResponse.tokens.output,
                    "ai.tokens.total": providerResponse.tokens.total,
                    "ai.cost.estimated": estimatedCost,
                    "security.score": security.score,
                    "security.risk": security.risk,
                    "security.findings.count": security.findings.length,
                    "session.id": session._id.toString(),
                    "response.status": "success",
                });

                span.addEvent("Request completed");

                span.setStatus({
                    code: SpanStatusCode.OK,
                });

                console.log("Recording ai.requests");

                aiRequestsCounter.add(1, {
                    provider: request.provider,
                    model: request.model,
                    risk: security.risk,
                    status: "success",
                });

                aiLatencyHistogram.record(latency, {
                    provider: request.provider,
                    model: request.model,
                    risk: security.risk,
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
                    risk: security.risk,
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

                aiRequestsCounter.add(1, {
                    provider: request.provider,
                    model: request.model,
                    status: "failed",
                });

                observability.error("ai.request.failed", {
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