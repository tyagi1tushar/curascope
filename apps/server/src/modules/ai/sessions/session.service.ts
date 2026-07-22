import { Span, SpanStatusCode } from "@opentelemetry/api";
import { SessionQuery } from "./session.query";
import { tracer } from "../../../core/telemetry";
import { AISession } from "./session.model";
import { IAISession } from "./session.types";
import { env } from "../../../core/config/env";

export class SessionService {
    static async createSession(data: Partial<IAISession>) {
        return tracer.startActiveSpan(
            "ai.session.create",
            async (span: Span) => {
                const start = Date.now();

                try {
                    const session = new AISession(data);

                    span.addEvent("AI session initialized");

                    const spanContext = span.spanContext();

                    session.telemetry.spanName = "ai.session.create";

                    // Save telemetry
                    session.telemetry.traceId = spanContext.traceId;
                    session.telemetry.spanId = spanContext.spanId;
                    session.telemetry.serviceName = env.APP_NAME;
                    
                    const gatewayLatency = session.performance.latency ?? 0;

                    await session.save();

                    const mongoDuration = Date.now() - start;

                    span.setAttributes({
                        "ai.provider": session.request.provider,
                        "ai.model": session.request.model,
                        "ai.prompt.length": session.request.prompt.length,

                        "db.system": "mongodb",
                        "db.collection": "AISession",
                        "db.operation": "insert",
                        "db.operation.duration.ms": mongoDuration,

                        "ai.tokens.input": session.performance.tokens?.input ?? 0,
                        "ai.tokens.output": session.performance.tokens?.output ?? 0,
                        "ai.tokens.total": session.performance.tokens?.total ?? 0,
                        "ai.cost.estimated": session.performance.estimatedCost ?? 0,

                        "security.score": session.security.score,
                        "security.risk": session.security.risk,

                        "session.id": session._id.toString(),
                    });

                    span.setAttribute("db.operation.duration.ms", mongoDuration);

                    span.addEvent("AI session stored in MongoDB");

                    span.setStatus({
                        code: SpanStatusCode.OK,
                    });

                    return session;
                } catch (error) {
                    span.recordException(error as Error);

                    span.setStatus({
                        code: SpanStatusCode.ERROR,
                    });

                    throw error;
                } finally {
                    span.end();
                }
            }
        );
    }

    static async getAllSessions(query: SessionQuery) {

        const page = query.page || 1;
        const limit = query.limit || 10;

        const skip = (page - 1) * limit;

        const filter: Record<string, unknown> = {};

        if (query.provider) {
            filter["request.provider"] = query.provider;
        }

        if (query.status) {
            filter["response.status"] = query.status;
        }

        if (query.risk) {
            filter["security.risk"] = query.risk;
        }

        if (query.search) {
            filter["request.prompt"] = {
                $regex: query.search,
                $options: "i",
            };
        }

        const allowedSortFields = [
            "createdAt",
            "performance.latency",
            "security.score",
            "request.provider",
        ] as const;

        const sort: Record<string, 1 | -1> = {};

        if (!query.sort) {
            sort.createdAt = -1;
        } else {

            const field = query.sort.startsWith("-")
                ? query.sort.substring(1)
                : query.sort;

            if (!allowedSortFields.includes(field as typeof allowedSortFields[number])) {
                throw new Error("Invalid sort field");
            }

            sort[field] = query.sort.startsWith("-") ? -1 : 1;
        }

        const sessions = await AISession.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const totalDocuments = await AISession.countDocuments(filter);

        return {
            data: sessions,

            pagination: {
                page,
                limit,
                totalDocuments,
                totalPages: Math.ceil(totalDocuments / limit),
            },
        };
    }

    static async getSessionById(id: string) {
        return AISession.findById(id);
    }
}