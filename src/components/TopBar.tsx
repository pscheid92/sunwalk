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
        <div className="flex flex-col gap-3 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 sm:py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2">
                        <Sun className="h-5 w-5 flex-shrink-0 text-amber-400" />
                        <span className="text-lg font-bold text-slate-100">Sunwalk</span>
                        <span className="hidden text-slate-600 sm:inline">&bull;</span>
                        <span className="hidden min-w-0 truncate text-sm text-slate-400 sm:block">{place}</span>
                    </div>
                    <div className="mt-1 truncate text-sm text-slate-400 sm:hidden">{place}</div>
                </div>

                <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_2.75rem] items-center gap-2">
                    <SearchBox query={searchQuery} onQueryChange={onSearchQueryChange} onSelect={onPlaceSelect} />
                    <button
                        type="button"
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-50"
                        onClick={onLocationClick}
                        disabled={isLocating}
                        title="Standort bestimmen"
                        aria-label="Standort bestimmen"
                    >
                        {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-2 sm:flex sm:justify-end">
                <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
                    onClick={onPreviousDay}
                    aria-label="Vorheriger Tag"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <input
                    type="date"
                    value={toDateString(date)}
                    onChange={(e) => onDateChange(fromDateString(e.target.value))}
                    className="h-11 min-w-0 rounded-lg border border-slate-700 bg-slate-900 px-3 text-base text-slate-200 focus:border-amber-500 focus:ring-amber-500 sm:w-auto sm:text-sm"
                />
                <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
                    onClick={onNextDay}
                    aria-label="Nächster Tag"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
