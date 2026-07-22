import { useQuery } from "@tanstack/react-query";
import { DashboardApi } from "../api/dashboard";

export function useDashboardSessions() {
  return useQuery({
    queryKey: ["dashboard-sessions"],
    queryFn: () => DashboardApi.sessions(),
  });
}