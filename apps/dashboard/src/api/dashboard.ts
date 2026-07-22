import { api } from "./client";
import type { DashboardAnalytics } from "../types/analytics";

import type { DashboardSummary } from "../types/dashboard";

import type {
  SessionsResponse,
  SessionDetails,
} from "../types/session";

export const DashboardApi = {
  async summary(): Promise<DashboardSummary> {
    const { data } = await api.get("/dashboard/summary");
    return data;
  },

  async sessions(
    page = 1,
    limit = 10
  ): Promise<SessionsResponse> {
    const { data } = await api.get("/dashboard/sessions", {
      params: {
        page,
        limit,
      },
    });

    return data.data;
  },

  async session(
    id: string
  ): Promise<SessionDetails> {
    const { data } = await api.get(
      `/dashboard/sessions/${id}`
    );

    return data.data;
  },

  async analytics(): Promise<DashboardAnalytics> {
    const { data } = await api.get("/dashboard/analytics");

    return data.data;
  },

};