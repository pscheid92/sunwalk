import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TimesPanel from "./components/TimesPanel";
import TopBar from "./components/TopBar";
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
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <div className="mx-auto w-full max-w-3xl px-3 pb-[max(6rem,25dvh)] sm:px-4 sm:pb-0">
                <TopBar
                    place={place}
                    date={date}
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    onPlaceSelect={handlePlaceSelect}
                    onLocationClick={getMyLocation}
                    isLocating={isLocating}
                    onDateChange={setDate}
                    onPreviousDay={previousDay}
                    onNextDay={nextDay}
                />

                <main className="pb-3">
                    <TimesPanel times={times} date={date} formatTime={formatTime} />
                </main>

                <footer className="pt-1 pb-[calc(1rem+env(safe-area-inset-bottom))] text-center text-xs text-slate-600">
                    SunCalc &bull; Photon API
                </footer>
            </div>
        </div>
    );
}
