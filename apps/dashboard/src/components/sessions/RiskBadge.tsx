type Props = {
  risk: string;
};

export function RiskBadge({ risk }: Props) {
  const value = risk.toLowerCase();

  const styles =
    value === "low"
      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
      : value === "medium"
      ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
      : "bg-red-500/15 text-red-400 border border-red-500/30";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles}`}
    >
      {risk.toUpperCase()}
    </span>
  );
}