import { useState } from "react";

import { useDashboardSessions } from "../../hooks/useDashboardSessions";

import { Card } from "../ui/Card";
import { SessionDrawer } from "./SessionDrawer";

import { formatLatency } from "../../utils/formatLatency";
import { formatCost } from "../../utils/formatCost";
import { formatRelativeTime } from "../../utils/formatRelativeTime";

export function SessionsTable() {
  const { data, isLoading } = useDashboardSessions();

  const [selectedSession, setSelectedSession] =
    useState<string | null>(null);

  if (isLoading) {
    return <Card>Loading sessions...</Card>;
  }

  if (!data) {
    return <Card>No sessions found.</Card>;
  }

  return (
    <>
      <Card>
        <h2 className="mb-6 text-xl font-semibold">
          Recent AI Sessions
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b border-slate-700 text-slate-400">

              <tr>

                <th className="pb-3">Prompt</th>

                <th className="pb-3">Provider</th>

                <th className="pb-3">Status</th>

                <th className="pb-3">Latency</th>

                <th className="pb-3">Cost</th>

                <th className="pb-3">Created</th>

              </tr>

            </thead>

            <tbody>

              {data.sessions.map((session) => (

                <tr
                  key={session.id}
                  onClick={() =>
                    setSelectedSession(session.id)
                  }
                  className="cursor-pointer border-b border-slate-800 transition-colors hover:bg-slate-800/40"
                >

                  <td
                    className="max-w-sm truncate py-4"
                    title={session.prompt}
                  >
                    {session.prompt}
                  </td>

                  <td className="capitalize">
                    {session.provider}
                  </td>

                  <td>

                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-400">
                      {session.status}
                    </span>

                  </td>

                  <td>
                    {formatLatency(session.latency)}
                  </td>

                  <td>
                    {formatCost(
                      session.estimatedCost
                    )}
                  </td>

                  <td>
                    {formatRelativeTime(
                      session.createdAt
                    )}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </Card>

      <SessionDrawer
        sessionId={selectedSession}
        onClose={() =>
          setSelectedSession(null)
        }
      />
    </>
  );
}