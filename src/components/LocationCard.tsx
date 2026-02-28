import { MapPin } from "lucide-react";
import type { Place } from "../lib/photon";
import SearchBox from "./SearchBox";

interface LocationCardProps {
    place: string;
    lat: number;
    lng: number;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    onPlaceSelect: (place: Place) => void;
    onLocationClick: () => void;
}

export default function LocationCard({
    place,
    lat,
    lng,
    searchQuery,
    onSearchQueryChange,
    onPlaceSelect,
    onLocationClick
}: LocationCardProps) {
    return (
        <div className="rounded-lg shadow-lg border-2 border-gray-200 bg-white p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{place}</h2>
                    <div className="flex gap-2 mt-1">
                        <span className="text-sm text-gray-600">Lat: {lat.toFixed(4)}&deg;</span>
                        <span className="text-sm text-gray-400">&bull;</span>
                        <span className="text-sm text-gray-600">Lng: {lng.toFixed(4)}&deg;</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <SearchBox query={searchQuery} onQueryChange={onSearchQueryChange} onSelect={onPlaceSelect} />
                <button
                    type="button"
                    className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-lg hover:shadow-xl hover:bg-primary-700 transition-shadow"
                    onClick={onLocationClick}
                >
                    <MapPin className="w-4 h-4 mr-2" />
                    Standort bestimmen
                </button>
            </div>
        </div>
    );
}
