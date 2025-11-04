<script lang="ts">
    import "./app.css";
    import { calculateTimes } from "./lib/sunwalk";
    import { getLocation } from "./lib/location";
    import SearchBox from "./components/SearchBox.svelte";
    import { reverse, type Place } from "./lib/photon";
    import { Button, Card, Badge, Heading, Datepicker } from 'flowbite-svelte';
    import {
        MapPinAltSolid,
        CalendarMonthSolid,
        ChevronLeftOutline,
        ChevronRightOutline,
        EyeSolid,
        MoonSolid,
        SunSolid,
        ClockSolid
    } from 'flowbite-svelte-icons';

    function formatTime(date: Date): String {
        const locale = "de-DE";
        const options: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        };
        return date.toLocaleTimeString(locale, options);
    }

    function formatDateForInput(d: Date): string {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    let place = $state("Deutschland");
    let lat = $state(51.1657);
    let lng = $state(10.4515);
    let searchQuery = $state("");
    let hasAttemptedGeolocation = $state(false);

    async function getMyLocation() {
        let location = await getLocation();

        lat = location.latitude;
        lng = location.longitude;
        searchQuery = "";

        try {
            const places = await reverse(lat, lng, { limit: 1 });

            if (places.length > 0) {
                place = places[0].name;
            } else {
                place = "Mein Standort";
            }
        } catch(error) {
            console.error("Reverse geocoding error:", error);
            place = "Mein Standort";
        }
    }

    // Automatically attempt to get user's location on page load
    $effect(() => {
        if (!hasAttemptedGeolocation) {
            hasAttemptedGeolocation = true;

            getMyLocation().catch((error) => {
                console.log("Geolocation not available, using Germany as fallback:", error);
            }); // Keep the Germany default values
        }
    });

    function handlePlaceSelect(selectedPlace: Place) {
        place = selectedPlace.name;
        lat = selectedPlace.lat;
        lng = selectedPlace.lon;
    }

    let date = $state(new Date());
    let times = $derived(calculateTimes(lat, lng, date));

    let dateInputValue = $derived(formatDateForInput(date));

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

    function handleDateInput(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.value) {
            const [year, month, day] = target.value.split('-').map(Number);
            date = new Date(year, month - 1, day);
        }
    }
</script>

<div class="min-h-screen bg-gray-100">
    <!-- Hero Header -->
    <div class="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white">
        <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8">
            <div class="flex items-center gap-2 sm:gap-3 mb-2">
                <SunSolid class="w-6 h-6 sm:w-8 sm:h-8" />
                <h1 class="text-2xl sm:text-3xl font-bold">Sunwalk</h1>
            </div>
            <p class="text-orange-100 text-xs sm:text-sm">Sonnenzeiten für Fotografen und Outdoor-Enthusiasten</p>
        </div>
    </div>

    <main class="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6">
        <!-- Location Card -->
        <Card size="lg" class="shadow-lg border-2 border-gray-200 bg-white p-4 sm:p-6">
            <div class="flex items-center gap-3 mb-4 sm:mb-6">
                <div class="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg">
                    <MapPinAltSolid class="w-5 h-5 text-white" />
                </div>
                <div>
                    <Heading tag="h2" class="mb-0 text-2xl">{place}</Heading>
                    <div class="flex gap-2 mt-1">
                        <span class="text-sm text-gray-600">Lat: {lat.toFixed(4)}°</span>
                        <span class="text-sm text-gray-400">•</span>
                        <span class="text-sm text-gray-600">Lng: {lng.toFixed(4)}°</span>
                    </div>
                </div>
            </div>

            <div class="space-y-3">
                <SearchBox bind:query={searchQuery} onSelect={handlePlaceSelect} />
                <Button color="primary" class="w-full shadow-lg hover:shadow-xl transition-shadow" onclick={getMyLocation}>
                    <MapPinAltSolid class="w-4 h-4 mr-2" />
                    Standort bestimmen
                </Button>
            </div>
        </Card>

        <!-- Date Selector Card -->
        <Card size="lg" class="shadow-lg border-2 border-gray-200 bg-white p-4 sm:p-6">
            <div class="flex items-center gap-3 mb-4 sm:mb-6">
                <div class="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                    <CalendarMonthSolid class="w-5 h-5 text-white" />
                </div>
                <Heading tag="h3" class="mb-0 text-xl">Datum</Heading>
            </div>

            <div class="flex gap-2 sm:gap-3 items-center">
                <Button color="light" size="sm" class="shadow hover:shadow-md transition-shadow flex-shrink-0" onclick={previousDay}>
                    <ChevronLeftOutline class="w-4 h-4 sm:mr-2" />
                    <span class="hidden sm:inline">Gestern</span>
                </Button>

                <div class="flex-1 min-w-0">
                    <input
                        type="date"
                        value={dateInputValue}
                        oninput={handleDateInput}
                        class="flex-1 min-w-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 shadow-sm"
                    />
                </div>

                <Button color="light" size="sm" class="shadow hover:shadow-md transition-shadow flex-shrink-0" onclick={nextDay}>
                    <span class="hidden sm:inline">Morgen</span>
                    <ChevronRightOutline class="w-4 h-4 sm:ml-2" />
                </Button>
            </div>
        </Card>

        <!-- Morning Times Card -->
        <Card size="lg" class="shadow-lg border-2 border-orange-200 bg-white p-4 sm:p-6">
            <div class="flex items-center gap-3 mb-4 sm:mb-6">
                <div class="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg">
                    <SunSolid class="w-5 h-5 text-white" />
                </div>
                <Heading tag="h3" class="mb-0 text-xl">Morgens</Heading>
            </div>

            <div class="space-y-2 sm:space-y-3">
                <div class="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <MoonSolid class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 flex-shrink-0" />
                        <span class="font-medium text-sm sm:text-base text-gray-900">Astronomische Dämmerung</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-primary-600 flex-shrink-0 ml-2">{formatTime(times.astronomicalDawn)}</span>
                </div>

                <div class="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <MoonSolid class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                        <span class="font-medium text-sm sm:text-base text-gray-900">Nautische Dämmerung</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-primary-600 flex-shrink-0 ml-2">{formatTime(times.nauticalDawn)}</span>
                </div>

                <div class="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <EyeSolid class="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 flex-shrink-0" />
                        <span class="font-medium text-sm sm:text-base text-gray-900">Zivile Dämmerung</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-primary-600 flex-shrink-0 ml-2">{formatTime(times.civilDawn)}</span>
                </div>

                <div class="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-orange-200">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <SunSolid class="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
                        <span class="font-semibold text-sm sm:text-base text-gray-900">Sonnenaufgang</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-orange-600 flex-shrink-0 ml-2">{formatTime(times.sunriseStart)}</span>
                </div>

                <div class="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <SunSolid class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                        <span class="font-medium text-sm sm:text-base text-gray-900">Goldene Stunde</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-yellow-600 flex-shrink-0 ml-2">{formatTime(times.sunriseEnd)}</span>
                </div>

                <div class="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <ClockSolid class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        <span class="font-medium text-sm sm:text-base text-gray-900">Tag</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-gray-600 flex-shrink-0 ml-2">{formatTime(times.goldenHourEnd)}</span>
                </div>
            </div>
        </Card>

        <!-- Evening Times Card -->
        <Card size="lg" class="shadow-lg border-2 border-blue-200 bg-white p-4 sm:p-6">
            <div class="flex items-center gap-3 mb-4 sm:mb-6">
                <div class="p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg">
                    <MoonSolid class="w-5 h-5 text-white" />
                </div>
                <Heading tag="h3" class="mb-0 text-xl">Abends</Heading>
            </div>

            <div class="space-y-2 sm:space-y-3">
                <div class="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <SunSolid class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                        <span class="font-medium text-sm sm:text-base text-gray-900">Goldene Stunde</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-yellow-600 flex-shrink-0 ml-2">{formatTime(times.goldenHourStart)}</span>
                </div>

                <div class="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-orange-200">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <SunSolid class="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
                        <span class="font-semibold text-sm sm:text-base text-gray-900">Sonnenuntergang</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-orange-600 flex-shrink-0 ml-2">{formatTime(times.sunsetStart)}</span>
                </div>

                <div class="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <EyeSolid class="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 flex-shrink-0" />
                        <span class="font-medium text-sm sm:text-base text-gray-900">Zivile Dämmerung</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-primary-600 flex-shrink-0 ml-2">{formatTime(times.sunsetEnd)}</span>
                </div>

                <div class="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <MoonSolid class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                        <span class="font-medium text-sm sm:text-base text-gray-900">Nautische Dämmerung</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-primary-600 flex-shrink-0 ml-2">{formatTime(times.civilDusk)}</span>
                </div>

                <div class="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <MoonSolid class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 flex-shrink-0" />
                        <span class="font-medium text-sm sm:text-base text-gray-900">Astronomische Dämmerung</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-primary-600 flex-shrink-0 ml-2">{formatTime(times.nauticalDusk)}</span>
                </div>

                <div class="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <MoonSolid class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
                        <span class="font-medium text-sm sm:text-base text-gray-900">Nacht</span>
                    </div>
                    <span class="text-base sm:text-lg font-bold text-indigo-600 flex-shrink-0 ml-2">{formatTime(times.astronomicalDusk)}</span>
                </div>
            </div>
        </Card>

        <!-- Footer -->
        <div class="text-center py-8 text-sm text-gray-500">
            <p>Berechnet mit SunCalc • Geo-Daten von Photon API</p>
        </div>
    </main>
</div>

