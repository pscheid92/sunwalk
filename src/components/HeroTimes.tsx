interface HeroTimesProps {
    sunrise: string;
    solarNoon: string;
    sunset: string;
    goldenHourMorningEnd: string;
    goldenHourEveningStart: string;
}

export default function HeroTimes({
    sunrise,
    solarNoon,
    sunset,
    goldenHourMorningEnd,
    goldenHourEveningStart
}: HeroTimesProps) {
    return (
        <div className="grid grid-cols-3 gap-4 py-6 text-center">
            <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Sonnenaufgang</div>
                <div className="text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums">{sunrise}</div>
                <div className="text-xs text-slate-500 mt-1">GH bis {goldenHourMorningEnd}</div>
            </div>
            <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Sonnenhochstand</div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-400 tabular-nums">{solarNoon}</div>
            </div>
            <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Sonnenuntergang</div>
                <div className="text-2xl sm:text-3xl font-bold text-orange-400 tabular-nums">{sunset}</div>
                <div className="text-xs text-slate-500 mt-1">GH ab {goldenHourEveningStart}</div>
            </div>
        </div>
    );
}
