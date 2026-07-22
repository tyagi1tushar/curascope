import { Activity, Clock3, Coins, Database } from "lucide-react";
import { KpiCard } from "../components/cards/KpiCard";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { SessionsTable } from "../components/sessions/SessionsTable";
import { AnalyticsSection } from "../components/analytics/AnalyticsSection";

export function DashboardPage() {
    const { data, isLoading, error } = useDashboardSummary();

    if (isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#0B1020] text-white">
                Loading dashboard...
            </main>
        );
    }

    if (error || !data) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#0B1020] text-red-400">
                Failed to load dashboard.
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0B1020] text-white">
            <div className="mx-auto max-w-7xl px-8 py-8">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">
                            CuraScope
                        </h1>

                        <p className="mt-2 text-slate-400">
                            AI Gateway &amp; Observability Dashboard
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                        Connected
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <KpiCard
                        title="Requests"
                        value={data.totalRequests.toLocaleString()}
                        icon={Activity}
                    />

                    <KpiCard
                        title="Average Latency"
                        value={`${Math.round(data.averageLatency)} ms`}
                        icon={Clock3}
                    />

                    <KpiCard
                        title="Tokens"
                        value={data.totalTokens.toLocaleString()}
                        icon={Database}
                    />

                    <KpiCard
                        title="Estimated Cost"
                        value={`$${data.estimatedCost.toFixed(4)}`}
                        icon={Coins}
                    />
                </div>

                <div className="mt-10">
                    <AnalyticsSection />
                </div>

                <div className="mt-10">
                    <SessionsTable />
                </div>
            </div>
        </main>
    );
}