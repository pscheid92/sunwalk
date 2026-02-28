import { ChevronLeft, ChevronRight, Loader2, MapPin, Sun } from "lucide-react";
import type { Place } from "../lib/photon";
import SearchBox from "./SearchBox";

interface TopBarProps {
    place: string;
    date: Date;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    onPlaceSelect: (place: Place) => void;
    onLocationClick: () => void;
    isLocating: boolean;
    onDateChange: (date: Date) => void;
    onPreviousDay: () => void;
    onNextDay: () => void;
}

function toDateString(date: Date): string {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function fromDateString(value: string): Date {
    let [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

export default function TopBar({
    place,
    date,
    searchQuery,
    onSearchQueryChange,
    onPlaceSelect,
    onLocationClick,
    isLocating,
    onDateChange,
    onPreviousDay,
    onNextDay
}: TopBarProps) {
    return (
        <div className="flex flex-col gap-3 py-4">
            {/* Row 1: Brand + Place + Search + GPS */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Sun className="w-5 h-5 text-amber-400" />
                    <span className="text-lg font-bold text-slate-100">Sunwalk</span>
                    <span className="text-slate-600 mx-1">&mdash;</span>
                    <span className="text-sm text-slate-400 truncate">{place}</span>
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <SearchBox query={searchQuery} onQueryChange={onSearchQueryChange} onSelect={onPlaceSelect} />
                    <button
                        type="button"
                        className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors disabled:opacity-50 flex-shrink-0"
                        onClick={onLocationClick}
                        disabled={isLocating}
                        title="Standort bestimmen"
                    >
                        {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Row 2: Date navigation */}
            <div className="flex items-center gap-2 justify-center sm:justify-end">
                <button
                    type="button"
                    className="p-1.5 rounded text-slate-400 hover:text-slate-200 transition-colors"
                    onClick={onPreviousDay}
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <input
                    type="date"
                    value={toDateString(date)}
                    onChange={(e) => onDateChange(fromDateString(e.target.value))}
                    className="py-1 px-2 text-sm text-slate-200 border border-slate-700 rounded bg-slate-900 focus:ring-amber-500 focus:border-amber-500"
                />
                <button
                    type="button"
                    className="p-1.5 rounded text-slate-400 hover:text-slate-200 transition-colors"
                    onClick={onNextDay}
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
