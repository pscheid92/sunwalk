interface TimeRowProps {
    dotColor: string;
    label: string;
    time: string;
}

export default function TimeRow({ dotColor, label, time }: TimeRowProps) {
    return (
        <div className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-sm text-slate-300">{label}</span>
            </div>
            <span className="text-sm font-mono text-slate-100 tabular-nums">{time}</span>
        </div>
    );
}
