import { LatencyTrendChart } from "./LatencyTrendChart";
import { RequestsTrendChart } from "./RequestsTrendChart";

import { useDashboardAnalytics } from "../../hooks/useDashboardAnalytics";

export function AnalyticsSection() {
    const { data, isLoading } = useDashboardAnalytics();

    if (isLoading) {
        return (
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="h-80 animate-pulse rounded-2xl bg-slate-900" />
                <div className="h-80 animate-pulse rounded-2xl bg-slate-900" />
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">

            <div className="mb-6">
                <h2 className="text-xl font-semibold">
                    Analytics
                </h2>

                <p className="text-sm text-slate-400">
                    Request volume and latency trends.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <RequestsTrendChart
                    data={data.requestsTrend}
                />

                <LatencyTrendChart
                    data={data.latencyTrend}
                />
            </div>

        </section>
    );
}

