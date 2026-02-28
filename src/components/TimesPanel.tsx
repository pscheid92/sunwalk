import type { Times } from "../lib/sunwalk";
import TimeRow from "./TimeRow";

interface TimesPanelProps {
    times: Times;
    formatTime: (date: Date) => string;
}

export default function TimesPanel({ times, formatTime }: TimesPanelProps) {
    return (
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-slate-800">
                {/* Morning */}
                <div className="md:pr-4 pb-4 md:pb-0">
                    <h3 className="text-xs uppercase tracking-wider text-amber-500/80 font-semibold mb-2">Morgens</h3>
                    <TimeRow
                        dotColor="bg-indigo-400"
                        label="Astro. Dämmerung"
                        time={formatTime(times.astronomicalDawn)}
                    />
                    <TimeRow dotColor="bg-blue-400" label="Naut. Dämmerung" time={formatTime(times.nauticalDawn)} />
                    <TimeRow dotColor="bg-sky-400" label="Zivile Dämmerung" time={formatTime(times.civilDawn)} />
                    <TimeRow dotColor="bg-amber-400" label="Sonnenaufgang" time={formatTime(times.sunriseStart)} />
                    <TimeRow dotColor="bg-yellow-300" label="Goldene Stunde" time={formatTime(times.sunriseEnd)} />
                    <TimeRow dotColor="bg-slate-400" label="Tag" time={formatTime(times.goldenHourEnd)} />
                </div>

                {/* Evening */}
                <div className="md:pl-4 border-t border-slate-800 md:border-t-0 pt-4 md:pt-0">
                    <h3 className="text-xs uppercase tracking-wider text-orange-500/80 font-semibold mb-2">Abends</h3>
                    <TimeRow dotColor="bg-yellow-300" label="Goldene Stunde" time={formatTime(times.goldenHourStart)} />
                    <TimeRow dotColor="bg-amber-400" label="Sonnenuntergang" time={formatTime(times.sunsetStart)} />
                    <TimeRow dotColor="bg-sky-400" label="Zivile Dämmerung" time={formatTime(times.sunsetEnd)} />
                    <TimeRow dotColor="bg-blue-400" label="Naut. Dämmerung" time={formatTime(times.civilDusk)} />
                    <TimeRow dotColor="bg-indigo-400" label="Astro. Dämmerung" time={formatTime(times.nauticalDusk)} />
                    <TimeRow dotColor="bg-indigo-600" label="Nacht" time={formatTime(times.astronomicalDusk)} />
                </div>
            </div>
        </div>
    );
}
