import type { LucideIcon } from "lucide-react";
import { Card } from "../ui/Card";

type Props = {
  title: string;
  value: string | number;
  icon: LucideIcon;
};

export function KpiCard({ title, value, icon: Icon }: Props) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 break-words text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div className="rounded-lg bg-slate-800 p-3">
          <Icon size={22} />
        </div>
      </div>
    </Card>
  );
}