export interface AnalyticsPoint {
  time: string;
  value: number;
}

export interface DashboardAnalytics {
  requestsTrend: AnalyticsPoint[];
  latencyTrend: AnalyticsPoint[];
}