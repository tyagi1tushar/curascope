interface ChartHeaderProps {
    title: string;
    period: string;
}

export function ChartHeader({
    title,
    period,
}: ChartHeaderProps) {
    return (
        <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
                {title}
            </h3>

            <span className="text-xs text-slate-400">
                {period}
            </span>
        </div>
    );
}