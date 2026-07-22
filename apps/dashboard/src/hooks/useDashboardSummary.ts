import { useQuery } from "@tanstack/react-query";
import { DashboardApi } from "../api/dashboard";
import type { DashboardSummary } from "../types/dashboard";

export function useDashboardSummary() {
  return useQuery<DashboardSummary>({
    queryKey: ["dashboard-summary"],
    queryFn: DashboardApi.summary,
  });
}