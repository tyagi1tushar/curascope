import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}