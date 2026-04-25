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
            className={`grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-2 py-2 sm:py-1.5 ${isActive ? "-mx-2 rounded-md bg-slate-800/50 px-2" : ""}`}
        >
            <div className="flex min-w-0 items-center gap-2">
                <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${dotColor}`} />
                <span className={`text-sm truncate ${isActive ? "text-slate-100 font-medium" : "text-slate-300"}`}>
                    {label}
                </span>
            </div>
            <span className="text-right font-mono text-sm tabular-nums text-slate-100">{time}</span>
            <span
                className={`w-16 text-right text-xs tabular-nums whitespace-nowrap sm:w-20 ${isActive ? "text-amber-400" : "text-slate-500"}`}
            >
                {duration}
            </span>
        </div>
    );
}
