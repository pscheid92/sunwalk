<script lang="ts">
    import "./app.css";
    import { calculateTimes } from "./lib/sunwalk";
    import { getLocation } from "./lib/location";
    import { reverse, type Place } from "./lib/photon";
    import { SunSolid, MoonSolid, EyeSolid, ClockSolid } from 'flowbite-svelte-icons';

    import LocationCard from "./components/LocationCard.svelte";
    import DateSelector from "./components/DateSelector.svelte";
    import TimesCard from "./components/TimesCard.svelte";
    import TimeEntry from "./components/TimeEntry.svelte";

    // Utility functions
    function formatTime(date: Date): string {
        return date.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });
    }

    // Location state
    let place = $state("Deutschland");
    let lat = $state(51.1657);
    let lng = $state(10.4515);
    let searchQuery = $state("");
    let hasAttemptedGeolocation = $state(false);

    // Date state
    let date = $state(new Date());
    let times = $derived(calculateTimes(lat, lng, date));

    // Location handlers
    async function getMyLocation() {
        const location = await getLocation();
        lat = location.latitude;
        lng = location.longitude;
        searchQuery = "";

        try {
            const places = await reverse(lat, lng, { limit: 1 });
            place = places.length > 0 ? places[0].name : "Mein Standort";
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            place = "Mein Standort";
        }
    }

    function handlePlaceSelect(selectedPlace: Place) {
        place = selectedPlace.name;
        lat = selectedPlace.lat;
        lng = selectedPlace.lon;
    }

    // Auto-geolocate on page load
    $effect(() => {
        if (!hasAttemptedGeolocation) {
            hasAttemptedGeolocation = true;
            getMyLocation().catch((error) => {
                console.log("Geolocation not available, using Germany as fallback:", error);
            });
        }
    });

    // Date handlers
    function nextDay() {
        const d = new Date(date);
        d.setDate(d.getDate() + 1);
        date = d;
    }

    function previousDay() {
        const d = new Date(date);
        d.setDate(d.getDate() - 1);
        date = d;
    }
</script>

<div class="min-h-screen bg-gray-100">
    <!-- Hero Header -->
    <header class="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white">
        <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8">
            <div class="flex items-center gap-2 sm:gap-3 mb-2">
                <SunSolid class="w-6 h-6 sm:w-8 sm:h-8" />
                <h1 class="text-2xl sm:text-3xl font-bold">Sunwalk</h1>
            </div>
            <p class="text-orange-100 text-xs sm:text-sm">
                Sonnenzeiten für Fotografen und Outdoor-Enthusiasten
            </p>
        </div>
    </header>

    <main class="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6">
        <!-- Location -->
        <LocationCard
            {place}
            {lat}
            {lng}
            bind:searchQuery
            onPlaceSelect={handlePlaceSelect}
            onLocationClick={getMyLocation}
        />

        <!-- Date Selector -->
        <DateSelector
            bind:date
            onPreviousDay={previousDay}
            onNextDay={nextDay}
        />

        <!-- Morning Times -->
        <TimesCard
            title="Morgens"
            icon={SunSolid}
            iconGradient="bg-gradient-to-br from-amber-400 to-orange-500"
            borderColor="border-orange-200"
        >
            <TimeEntry
                icon={MoonSolid}
                iconColor="text-indigo-500"
                label="Astronomische Dämmerung"
                time={formatTime(times.astronomicalDawn)}
            />
            <TimeEntry
                icon={MoonSolid}
                iconColor="text-blue-500"
                label="Nautische Dämmerung"
                time={formatTime(times.nauticalDawn)}
            />
            <TimeEntry
                icon={EyeSolid}
                iconColor="text-cyan-500"
                label="Zivile Dämmerung"
                time={formatTime(times.civilDawn)}
            />
            <TimeEntry
                icon={SunSolid}
                iconColor="text-orange-500"
                label="Sonnenaufgang"
                time={formatTime(times.sunriseStart)}
                highlighted={true}
                backgroundColor="bg-gradient-to-r from-orange-50 to-amber-50"
            />
            <TimeEntry
                icon={SunSolid}
                iconColor="text-yellow-500"
                label="Goldene Stunde"
                time={formatTime(times.sunriseEnd)}
                backgroundColor="bg-gradient-to-r from-yellow-50 to-orange-50"
            />
            <TimeEntry
                icon={ClockSolid}
                iconColor="text-gray-400"
                label="Tag"
                time={formatTime(times.goldenHourEnd)}
            />
        </TimesCard>

        <!-- Evening Times -->
        <TimesCard
            title="Abends"
            icon={MoonSolid}
            iconGradient="bg-gradient-to-br from-orange-500 to-pink-500"
            borderColor="border-blue-200"
        >
            <TimeEntry
                icon={SunSolid}
                iconColor="text-yellow-500"
                label="Goldene Stunde"
                time={formatTime(times.goldenHourStart)}
                backgroundColor="bg-gradient-to-r from-yellow-50 to-orange-50"
            />
            <TimeEntry
                icon={SunSolid}
                iconColor="text-orange-500"
                label="Sonnenuntergang"
                time={formatTime(times.sunsetStart)}
                highlighted={true}
                backgroundColor="bg-gradient-to-r from-orange-50 to-pink-50"
            />
            <TimeEntry
                icon={EyeSolid}
                iconColor="text-cyan-500"
                label="Zivile Dämmerung"
                time={formatTime(times.sunsetEnd)}
            />
            <TimeEntry
                icon={MoonSolid}
                iconColor="text-blue-500"
                label="Nautische Dämmerung"
                time={formatTime(times.civilDusk)}
            />
            <TimeEntry
                icon={MoonSolid}
                iconColor="text-indigo-500"
                label="Astronomische Dämmerung"
                time={formatTime(times.nauticalDusk)}
            />
            <TimeEntry
                icon={MoonSolid}
                iconColor="text-indigo-600"
                label="Nacht"
                time={formatTime(times.astronomicalDusk)}
                backgroundColor="bg-gradient-to-r from-indigo-50 to-blue-50"
            />
        </TimesCard>

        <!-- Footer -->
        <footer class="text-center py-8 text-sm text-gray-500">
            <p>Berechnet mit SunCalc • Geo-Daten von Photon API</p>
        </footer>
    </main>
</div>
