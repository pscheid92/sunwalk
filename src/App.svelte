<script lang="ts">
    import "./app.css";
    import { calculateTimes } from "./lib/sunwalk";
    import { getLocation } from "./lib/location";
    import SearchBox from "./components/SearchBox.svelte";
    import { reverse, type Place } from "./lib/photon";
    
    function formatTime(date: Date): String {
        const locale = "de-DE";
    
        const options: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        };
    
        return date.toLocaleTimeString(locale, options);
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
    
    function nextDay() {
        date = new Date(date.getTime() + 86400000);
    }
    
    function previousDay() {
        date = new Date(date.getTime() - 86400000);
    }
    
    function pickDay(event: { currentTarget: HTMLInputElement }) {
        const target = event.currentTarget;
    
        if (target.value === "") {
            target.value = date.toISOString().slice(0, 10);
            return;
        }
    
        date = new Date(target.value);
    }
</script>

<main>
    <strong>{place}</strong>
    <p>({lat}°, {lng}°)</p>

    <SearchBox bind:query={searchQuery} onSelect={handlePlaceSelect} />
    <button onclick={getMyLocation}>Standort bestimmen</button>
    <hr/>

    <div>
        <input type="date" value={date.toISOString().slice(0, 10)} onchange={pickDay} required/>
        <div>
            <button onclick={previousDay}>Gestern</button>
            <button onclick={nextDay}>Morgen</button>
        </div>
    </div>

    <hr/>

    <div>
        <h3>Morgens</h3>

        <table>
            <tbody>
                <tr>
                    <td>Astronomische Dämmerung</td>
                    <td>{formatTime(times.astronomicalDawn)}</td>
                </tr>
                <tr>
                    <td>Nautische Dämmerung</td>
                    <td>{formatTime(times.nauticalDawn)}</td>
                </tr>
                <tr>
                    <td>Zivile Dämmerung</td>
                    <td>{formatTime(times.civilDawn)}</td>
                </tr>
                <tr>
                    <td>Sonnenaufgang</td>
                    <td>{formatTime(times.sunriseStart)}</td>
                </tr>
                <tr>
                    <td>Goldene Stunde</td>
                    <td>{formatTime(times.sunriseEnd)}</td>
                </tr>
                <tr>
                    <td>Tag</td>
                    <td>{formatTime(times.goldenHourEnd)}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div>
        <h3>Abends</h3>

        <table>
            <tbody>
                <tr>
                    <td>Goldene Stunde</td>
                    <td>{formatTime(times.goldenHourStart)}</td>
                </tr>
                <tr>
                    <td>Sonnenuntergang</td>
                    <td>{formatTime(times.sunsetStart)}</td>
                </tr>
                <tr>
                    <td>Zivile Dämmerung</td>
                    <td>{formatTime(times.sunsetEnd)}</td>
                </tr>
                <tr>
                    <td>Nautische Dämmerung</td>
                    <td>{formatTime(times.civilDusk)}</td>
                </tr>
                <tr>
                    <td>Astronomische Dämmerung</td>
                    <td>{formatTime(times.nauticalDusk)}</td>
                </tr>
                <tr>
                    <td>Nacht</td>
                    <td>{formatTime(times.astronomicalDusk)}</td>
                </tr>
            </tbody>
        </table>
    </div>
</main>

<style>
    main {
        font-size: 1.3rem;
        font-family: "system-ui", sans-serif;
    }

    table tr td:first-child {
        text-align: right;
        padding-right: 1rem;
    }
</style>
