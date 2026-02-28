import { Clock, Eye, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DateSelector from "./components/DateSelector";
import LocationCard from "./components/LocationCard";
import TimeEntry from "./components/TimeEntry";
import TimesCard from "./components/TimesCard";
import { getLocation } from "./lib/location";
import { type Place, reverse } from "./lib/photon";
import { calculateTimes } from "./lib/sunwalk";
import { getTimezoneLocation } from "./lib/timezone";

function formatTime(date: Date): string {
    return date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}

let initialLocation = getTimezoneLocation();

export default function App() {
    let [place, setPlace] = useState(initialLocation.place);
    let [lat, setLat] = useState(initialLocation.lat);
    let [lng, setLng] = useState(initialLocation.lng);
    let [searchQuery, setSearchQuery] = useState("");
    let [date, setDate] = useState(new Date());
    let [isLocating, setIsLocating] = useState(false);

    let times = useMemo(() => calculateTimes(lat, lng, date), [lat, lng, date]);

    let getMyLocation = useCallback(async () => {
        setIsLocating(true);
        try {
            let location = await getLocation();
            setLat(location.latitude);
            setLng(location.longitude);
            setSearchQuery("");

            try {
                let places = await reverse(location.latitude, location.longitude, { limit: 1 });
                setPlace(places.length > 0 ? places[0].name : "Mein Standort");
            } catch (error) {
                console.error("Reverse geocoding error:", error);
                setPlace("Mein Standort");
            }
        } finally {
            setIsLocating(false);
        }
    }, []);

    let handlePlaceSelect = useCallback((selectedPlace: Place) => {
        setPlace(selectedPlace.name);
        setLat(selectedPlace.lat);
        setLng(selectedPlace.lon);
    }, []);

    let nextDay = useCallback(() => {
        setDate((prev) => {
            let d = new Date(prev);
            d.setDate(d.getDate() + 1);
            return d;
        });
    }, []);

    let previousDay = useCallback(() => {
        setDate((prev) => {
            let d = new Date(prev);
            d.setDate(d.getDate() - 1);
            return d;
        });
    }, []);

    let hasAttemptedGeolocation = useRef(false);
    useEffect(() => {
        if (hasAttemptedGeolocation.current) return;
        hasAttemptedGeolocation.current = true;

        getMyLocation().catch(() => {});
    }, [getMyLocation]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Header */}
            <header className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <Sun className="w-6 h-6 sm:w-8 sm:h-8" />
                        <h1 className="text-2xl sm:text-3xl font-bold">Sunwalk</h1>
                    </div>
                    <p className="text-orange-100 text-xs sm:text-sm">
                        Sonnenzeiten für Fotografen und Outdoor-Enthusiasten
                    </p>
                </div>
            </header>

            <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6">
                {/* Location */}
                <LocationCard
                    place={place}
                    lat={lat}
                    lng={lng}
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    onPlaceSelect={handlePlaceSelect}
                    onLocationClick={getMyLocation}
                    isLocating={isLocating}
                />

                {/* Date Selector */}
                <DateSelector date={date} onDateChange={setDate} onPreviousDay={previousDay} onNextDay={nextDay} />

                {/* Morning Times */}
                <TimesCard
                    title="Morgens"
                    icon={Sun}
                    iconGradient="bg-gradient-to-br from-amber-400 to-orange-500"
                    borderColor="border-orange-200"
                >
                    <TimeEntry
                        icon={Moon}
                        iconColor="text-indigo-500"
                        label="Astronomische Dämmerung"
                        time={formatTime(times.astronomicalDawn)}
                    />
                    <TimeEntry
                        icon={Moon}
                        iconColor="text-blue-500"
                        label="Nautische Dämmerung"
                        time={formatTime(times.nauticalDawn)}
                    />
                    <TimeEntry
                        icon={Eye}
                        iconColor="text-cyan-500"
                        label="Zivile Dämmerung"
                        time={formatTime(times.civilDawn)}
                    />
                    <TimeEntry
                        icon={Sun}
                        iconColor="text-orange-500"
                        label="Sonnenaufgang"
                        time={formatTime(times.sunriseStart)}
                        highlighted={true}
                        backgroundColor="bg-gradient-to-r from-orange-50 to-amber-50"
                    />
                    <TimeEntry
                        icon={Sun}
                        iconColor="text-yellow-500"
                        label="Goldene Stunde"
                        time={formatTime(times.sunriseEnd)}
                        backgroundColor="bg-gradient-to-r from-yellow-50 to-orange-50"
                    />
                    <TimeEntry
                        icon={Clock}
                        iconColor="text-gray-400"
                        label="Tag"
                        time={formatTime(times.goldenHourEnd)}
                    />
                </TimesCard>

                {/* Evening Times */}
                <TimesCard
                    title="Abends"
                    icon={Moon}
                    iconGradient="bg-gradient-to-br from-orange-500 to-pink-500"
                    borderColor="border-blue-200"
                >
                    <TimeEntry
                        icon={Sun}
                        iconColor="text-yellow-500"
                        label="Goldene Stunde"
                        time={formatTime(times.goldenHourStart)}
                        backgroundColor="bg-gradient-to-r from-yellow-50 to-orange-50"
                    />
                    <TimeEntry
                        icon={Sun}
                        iconColor="text-orange-500"
                        label="Sonnenuntergang"
                        time={formatTime(times.sunsetStart)}
                        highlighted={true}
                        backgroundColor="bg-gradient-to-r from-orange-50 to-pink-50"
                    />
                    <TimeEntry
                        icon={Eye}
                        iconColor="text-cyan-500"
                        label="Zivile Dämmerung"
                        time={formatTime(times.sunsetEnd)}
                    />
                    <TimeEntry
                        icon={Moon}
                        iconColor="text-blue-500"
                        label="Nautische Dämmerung"
                        time={formatTime(times.civilDusk)}
                    />
                    <TimeEntry
                        icon={Moon}
                        iconColor="text-indigo-500"
                        label="Astronomische Dämmerung"
                        time={formatTime(times.nauticalDusk)}
                    />
                    <TimeEntry
                        icon={Moon}
                        iconColor="text-indigo-600"
                        label="Nacht"
                        time={formatTime(times.astronomicalDusk)}
                        backgroundColor="bg-gradient-to-r from-indigo-50 to-blue-50"
                    />
                </TimesCard>

                {/* Footer */}
                <footer className="text-center py-8 text-sm text-gray-500">
                    <p>Berechnet mit SunCalc &bull; Geo-Daten von Photon API</p>
                </footer>
            </main>
        </div>
    );
}
