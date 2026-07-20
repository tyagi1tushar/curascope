export interface OverviewAnalytics {
    totalRequests: number;

    successfulRequests: number;

    failedRequests: number;

    successRate: number;

    averageLatency: number;

    averageSecurityScore: number;

    totalTokens: number;

    estimatedCost: number;

    activeProviders: number;
}