import { AISession } from "../sessions/session.model";
import { OverviewAnalytics } from "./analytics.types";

/**
 * AnalyticsService
 *
 * Provides aggregated metrics for the CuraScope dashboard.
 * Uses MongoDB aggregation pipelines to efficiently compute
 * observability insights in a single database query.
 */
export class AnalyticsService {
    /**
     * Returns high-level dashboard metrics for the analytics overview.
     */
    static async getOverview(): Promise<OverviewAnalytics> {
        const result = await AISession.aggregate([
            {
                
                $group: {
                    _id: null,

                    providers: {
                        $addToSet: "$request.provider",
                    },

                    totalRequests: {
                        $sum: 1,
                    },

                    successfulRequests: {
                        $sum: {
                            $cond: [{ $eq: ["$response.status", "success"] }, 1, 0],
                        },
                    },

                    failedRequests: {
                        $sum: {
                            $cond: [{ $eq: ["$response.status", "error"] }, 1, 0],
                        },
                    },

                    averageLatency: {
                        $avg: "$performance.latency",
                    },

                    averageSecurityScore: {
                        $avg: "$security.score",
                    },

                    totalTokens: {
                        $sum: {
                            $ifNull: ["$performance.tokens.total", 0],
                        },
                    },

                    estimatedCost: {
                        $sum: {
                            $ifNull: ["$performance.estimatedCost", 0],
                        },
                    },
                },
            },
        ]);

        // Return default values if no sessions exist.
        if (!result.length) {
            return {
                totalRequests: 0,
                successfulRequests: 0,
                failedRequests: 0,
                successRate: 0,
                averageLatency: 0,
                averageSecurityScore: 0,
                totalTokens: 0,
                estimatedCost: 0,
                activeProviders: 0,
            };
        }

        const analytics = result[0];

        const successRate =
            analytics.totalRequests === 0
                ? 0
                : (analytics.successfulRequests / analytics.totalRequests) * 100;

        return {
            totalRequests: analytics.totalRequests,

            successfulRequests: analytics.successfulRequests,

            failedRequests: analytics.failedRequests,

            successRate: Number(successRate.toFixed(2)),

            averageLatency: Number(
                (analytics.averageLatency ?? 0).toFixed(2)
            ),

            averageSecurityScore: Number(
                (analytics.averageSecurityScore ?? 0).toFixed(2)
            ),

            totalTokens: analytics.totalTokens ?? 0,

            estimatedCost: Number(
                (analytics.estimatedCost ?? 0).toFixed(4)
            ),

            activeProviders: analytics.providers?.length ?? 0,
        };
    }
}