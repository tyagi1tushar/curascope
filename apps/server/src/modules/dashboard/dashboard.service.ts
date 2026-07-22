import { AISession } from "../ai/sessions/session.model";
import { DashboardSummary, DashboardSession, DashboardSessionsResponse, DashboardAnalytics } from "./dashboard.types";

export class DashboardService {
    static async getSummary(): Promise<DashboardSummary> {
        const result = await AISession.aggregate([
            {
                $group: {
                    _id: null,

                    totalRequests: {
                        $sum: 1,
                    },

                    successfulRequests: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: [
                                        "$response.status",
                                        "success",
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },

                    failedRequests: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: [
                                        "$response.status",
                                        "error",
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },

                    averageLatency: {
                        $avg: "$performance.latency",
                    },

                    totalTokens: {
                        $sum: "$performance.tokens.total",
                    },

                    estimatedCost: {
                        $sum: "$performance.estimatedCost",
                    },

                    highRiskRequests: {
                        $sum: {
                            $cond: [
                                { $eq: ["$security.risk", "HIGH"] },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
        ]);

        const summary = result[0];

        const totalRequests =
            summary?.totalRequests ?? 0;

        const successfulRequests =
            summary?.successfulRequests ?? 0;

        const failedRequests =
            summary?.failedRequests ?? 0;

        const successRate =
            totalRequests === 0
                ? 0
                : Number(
                    (
                        (successfulRequests /
                            totalRequests) *
                        100
                    ).toFixed(2)
                );

        return {
            totalRequests,

            successfulRequests,

            failedRequests,

            successRate,

            averageLatency:
                Math.round(summary?.averageLatency ?? 0),

            totalTokens:
                summary?.totalTokens ?? 0,

            estimatedCost:
                Number(
                    (
                        summary?.estimatedCost ?? 0
                    ).toFixed(6)
                ),

            highRiskRequests:
                summary?.highRiskRequests ?? 0,
        };
    }

    static async getSessions(
        page = 1,
        limit = 10
    ): Promise<DashboardSessionsResponse> {

        const skip = (page - 1) * limit;

        const [sessions, total] = await Promise.all([
            AISession.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select({
                    "request.prompt": 1,
                    "request.provider": 1,
                    "request.model": 1,
                    "performance.latency": 1,
                    "performance.estimatedCost": 1,
                    "security.risk": 1,
                    "response.status": 1,
                    "telemetry.traceId": 1,
                    createdAt: 1,
                }),

            AISession.countDocuments(),
        ]);

        return {
            sessions: sessions.map((session): DashboardSession => ({
                id: session._id.toString(),
                prompt: session.request.prompt,
                provider: session.request.provider,
                model: session.request.model,

                latency: session.performance.latency ?? 0,

                estimatedCost:
                    session.performance.estimatedCost ?? 0,

                risk: session.security.risk,
                status: session.response.status,

                traceId:
                    session.telemetry.traceId ?? "",

                createdAt: session.createdAt,
            })),

            total,
            page,
            limit,
        };
    }

    static async getSessionDetails(id: string) {
        return AISession.findById(id).lean();
    }

    static async getAnalytics(): Promise<DashboardAnalytics> {
        const [result] = await AISession.aggregate([
            {
                $facet: {
                    requestsTrend: [
                        {
                            $group: {
                                _id: {
                                    $dateToString: {
                                        format: "%d %b %H:00",
                                        date: "$createdAt",
                                    },
                                },
                                value: {
                                    $sum: 1,
                                },
                            },
                        },
                        {
                            $sort: {
                                _id: 1,
                            },
                        },
                    ],

                    latencyTrend: [
                        {
                            $group: {
                                _id: {
                                    $dateToString: {
                                        format: "%d %b %H:00",
                                        date: "$createdAt",
                                    },
                                },
                                value: {
                                    $avg: "$performance.latency",
                                },
                            },
                        },
                        {
                            $sort: {
                                _id: 1,
                            },
                        },
                    ],
                },
            },
        ]);

        return {
            requestsTrend:
                result.requestsTrend.map(
                    (item: { _id: string; value: number }) => ({
                        time: item._id,
                        value: item.value,
                    })
                ),

            latencyTrend:
                result.latencyTrend.map(
                    (item: { _id: string; value: number }) => ({
                        time: item._id,
                        value: Math.round(item.value),
                    })
                ),
        };
    }
}

