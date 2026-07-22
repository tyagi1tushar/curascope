type Props = {
  status: string;
};

export function StatusBadge({ status }: Props) {
  const value = status.toLowerCase();

  const styles =
    value === "success"
      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
      : value === "failed"
      ? "bg-red-500/15 text-red-400 border border-red-500/30"
      : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}