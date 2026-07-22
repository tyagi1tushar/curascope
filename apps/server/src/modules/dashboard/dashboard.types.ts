export interface DashboardSummary {
    totalRequests: number;

    successfulRequests: number;

    failedRequests: number;

    successRate: number;

    averageLatency: number;

    totalTokens: number;

    estimatedCost: number;

    highRiskRequests: number;
}

export interface DashboardSession {
    id: string;
    provider: string;
    model: string;
    latency: number;
    estimatedCost: number;
    risk: string;
    traceId: string;
    createdAt: Date;
}

export interface DashboardSessionsResponse {
    sessions: DashboardSession[];
    total: number;
    page: number;
    limit: number;
}

export interface DashboardSession {
    id: string;
    prompt: string;
    provider: string;
    model: string;
    latency: number;
    estimatedCost: number;
    risk: string;
    status: string;
    traceId: string;
    createdAt: Date;
}

export interface DashboardSessionsResponse {
    sessions: DashboardSession[];
    total: number;
    page: number;
    limit: number;
}

export interface TrendPoint {
    time: string;
    value: number;
}

export interface DashboardAnalytics {
    requestsTrend: TrendPoint[];
    latencyTrend: TrendPoint[];
}