import { useQuery } from "@tanstack/react-query";

import { DashboardApi } from "../api/dashboard";

export function useDashboardAnalytics() {
  return useQuery({
    queryKey: ["dashboard-analytics"],
    queryFn: DashboardApi.analytics,
    staleTime: 30_000,
  });
}