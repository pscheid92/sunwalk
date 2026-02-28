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
                    <Search className="w-5 h-5 text-gray-500" />
                </div>
                <input
                    type="search"
                    placeholder="Ort suchen..."
                    value={query}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    onFocus={() => setShowResults(query.length >= 2)}
                    className="block w-full p-3 pl-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
                />
            </div>

            {showResults && (results.length > 0 || isSearching) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
                    {isSearching ? (
                        <div className="flex items-center gap-3 px-4 py-4 text-gray-500">
                            <svg
                                className="animate-spin h-4 w-4 text-orange-500"
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
                                className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 border-b border-gray-100 last:border-b-0 transition-all focus:outline-none focus:bg-gradient-to-r focus:from-orange-50 focus:to-amber-50 group"
                                onMouseDown={() => selectPlace(place)}
                            >
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-gray-900 group-hover:text-orange-700 transition-colors">
                                            {place.displayName}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-0.5 truncate">{place.context}</div>
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
