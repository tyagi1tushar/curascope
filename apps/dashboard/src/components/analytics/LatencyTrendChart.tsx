import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";

import type { AnalyticsPoint } from "../../types/analytics";
import { ChartHeader } from "./ChartHeader";

interface LatencyTrendChartProps {
    data: AnalyticsPoint[];
}

const axisTickStyle = {
    fill: "#94A3B8",
    fontSize: 12,
};

export function LatencyTrendChart({ data, }: LatencyTrendChartProps) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <ChartHeader
                title="Average Latency"
                period="Last 7 Days"
            />

            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid
                        vertical={false}
                        stroke="#1E293B"
                        strokeDasharray="4 4"
                    />

                    <XAxis
                        dataKey="time"
                        angle={-25}
                        textAnchor="end"
                        height={60}
                        tick={axisTickStyle}
                    />

                    <YAxis
                        tick={axisTickStyle}
                        domain={[0, "dataMax + 500"]}
                    />

                    <Tooltip
                        formatter={(value) => [`${value} ms`, "Latency"]}
                        contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid #334155",
                            borderRadius: 12,
                            color: "#fff",
                        }}
                        labelStyle={{
                            color: "#CBD5E1",
                        }}
                    />

                    <Line
                        dataKey="value"
                        type="natural"
                        stroke="#22C55E"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}