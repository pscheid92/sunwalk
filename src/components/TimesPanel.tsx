import { isValidTime, PHASES, type Phase } from "../lib/phases";
import type { Times } from "../lib/sunwalk";
import TimeRow from "./TimeRow";

interface TimesPanelProps {
    times: Times;
    date: Date;
    formatTime: (date: Date) => string;
}

const MORNING_PHASES = PHASES.slice(1, 7);
const EVENING_PHASES = PHASES.slice(7);

function isToday(date: Date): boolean {
    let now = new Date();
    return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
    );
}

function formatDuration(minutes: number): string {
    let h = Math.floor(minutes / 60);
    let m = minutes % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
}

export default function TimesPanel({ times, date, formatTime }: TimesPanelProps) {
    let today = isToday(date);
    let now = new Date();

    function renderPhaseRow(phase: Phase) {
        let from = times[phase.fromKey];
        let to = times[phase.toKey];
        let validFrom = isValidTime(from);
        let validTo = isValidTime(to);

        let time = validFrom && validTo ? `${formatTime(from)} – ${formatTime(to)}` : "--:--";

        let durationMin = validFrom && validTo ? Math.round((to.getTime() - from.getTime()) / 60_000) : null;
        let isActive = today && validFrom && validTo && now >= from && now < to;

        let duration: string | undefined;
        if (isActive) {
            let remaining = Math.ceil((to.getTime() - now.getTime()) / 60_000);
            duration = `noch ${formatDuration(remaining)}`;
        } else if (durationMin != null) {
            duration = formatDuration(durationMin);
        }

        return (
            <TimeRow
                key={`${phase.fromKey}-${phase.toKey}`}
                dotColor={phase.tw}
                label={phase.name}
                time={time}
                duration={duration}
                isActive={isActive}
            />
        );
    }

    let nightActive = today && isValidTime(times.astronomicalDusk) && now >= times.astronomicalDusk;
    let nightDuration: string | undefined;
    if (nightActive) {
        let nextDawn = new Date(times.astronomicalDawn.getTime() + 24 * 60 * 60_000);
        let remaining = Math.ceil((nextDawn.getTime() - now.getTime()) / 60_000);
        nightDuration = `noch ${formatDuration(remaining)}`;
    }

    return (
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-slate-800">
                <div className="md:pr-4 pb-4 md:pb-0">
                    <h3 className="text-xs uppercase tracking-wider text-amber-500/80 font-semibold mb-2">Morgens</h3>
                    {MORNING_PHASES.map(renderPhaseRow)}
                </div>

                <div className="md:pl-4 border-t border-slate-800 md:border-t-0 pt-4 md:pt-0">
                    <h3 className="text-xs uppercase tracking-wider text-orange-500/80 font-semibold mb-2">Abends</h3>
                    {EVENING_PHASES.map(renderPhaseRow)}
                    <TimeRow
                        dotColor="bg-indigo-600"
                        label="Nacht"
                        time={
                            isValidTime(times.astronomicalDusk) ? `ab ${formatTime(times.astronomicalDusk)}` : "--:--"
                        }
                        duration={nightDuration}
                        isActive={nightActive}
                    />
                </div>
            </div>
        </div>
    );
}
