import { MapPin, Search } from "lucide-react";
import { useRef, useState } from "react";
import { type Place, search } from "../lib/photon";

interface SearchBoxProps {
    query: string;
    onQueryChange: (query: string) => void;
    onSelect: (place: Place) => void;
}

export default function SearchBox({ query, onQueryChange, onSelect }: SearchBoxProps) {
    let [results, setResults] = useState<Place[]>([]);
    let [isSearching, setIsSearching] = useState(false);
    let [showResults, setShowResults] = useState(false);
    let debounceTimer = useRef<number | undefined>(undefined);

    async function performSearch(searchQuery: string) {
        if (searchQuery.trim().length < 2) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        try {
            let places = await search(searchQuery);
            setResults(places);
        } catch (error) {
            console.error("Search error:", error);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    }

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        onQueryChange(value);
        setShowResults(true);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = window.setTimeout(() => {
            performSearch(value);
        }, 300);
    }

    function selectPlace(place: Place) {
        onQueryChange(place.name);
        setShowResults(false);
        setResults([]);
        onSelect(place);
    }

    function handleBlur() {
        setTimeout(() => {
            setShowResults(false);
        }, 200);
    }

    return (
        <div className="relative w-full">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-slate-500" />
                </div>
                <input
                    type="search"
                    placeholder="Ort suchen..."
                    value={query}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    onFocus={() => setShowResults(query.length >= 2)}
                    className="block w-full py-2 pl-9 pr-3 text-sm text-slate-200 border border-slate-700 rounded-lg bg-slate-900 focus:ring-amber-500 focus:border-amber-500 placeholder-slate-500"
                />
            </div>

            {showResults && (results.length > 0 || isSearching) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
                    {isSearching ? (
                        <div className="flex items-center gap-3 px-4 py-3 text-slate-400">
                            <svg
                                className="animate-spin h-4 w-4 text-amber-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            <span className="text-sm">Suche läuft...</span>
                        </div>
                    ) : (
                        results.map((place) => (
                            <button
                                key={place.displayName}
                                type="button"
                                className="w-full text-left px-4 py-2.5 hover:bg-slate-700 border-b border-slate-700 last:border-b-0 transition-colors focus:outline-none focus:bg-slate-700"
                                onMouseDown={() => selectPlace(place)}
                            >
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-slate-200">{place.displayName}</div>
                                        <div className="text-xs text-slate-500 mt-0.5 truncate">{place.context}</div>
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
