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