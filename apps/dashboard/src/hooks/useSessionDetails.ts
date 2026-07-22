import { useQuery } from "@tanstack/react-query";

import { DashboardApi } from "../api/dashboard";

export function useSessionDetails(
  sessionId: string | null
) {
  return useQuery({
    queryKey: ["session", sessionId],

    queryFn: () =>
      DashboardApi.session(sessionId!),

    enabled: !!sessionId,
  });
}