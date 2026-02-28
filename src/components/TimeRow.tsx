interface TimeRowProps {
    dotColor: string;
    label: string;
    time: string;
    duration?: string;
    isActive?: boolean;
}

export default function TimeRow({ dotColor, label, time, duration, isActive }: TimeRowProps) {
    return (
        <div
            className={`grid grid-cols-[1fr_auto_auto] items-baseline gap-x-2 py-1.5 ${isActive ? "bg-slate-800/50 -mx-2 px-2 rounded" : ""}`}
        >
            <div className="flex items-center gap-2 min-w-0">
                <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
                <span className={`text-sm truncate ${isActive ? "text-slate-100 font-medium" : "text-slate-300"}`}>
                    {label}
                </span>
            </div>
            <span className="text-sm font-mono text-slate-100 tabular-nums text-right">{time}</span>
            <span
                className={`text-xs tabular-nums text-right whitespace-nowrap w-20 ${isActive ? "text-amber-400" : "text-slate-500"}`}
            >
                {duration}
            </span>
        </div>
    );
}
