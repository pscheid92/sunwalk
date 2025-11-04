<script lang="ts">
    import {calculateTimes} from "./lib/sunwalk";
    import {getLocation} from "./lib/location";

    function formatTime(date: Date): String {
        const locale = "de-DE";
        const options: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        return date.toLocaleTimeString(locale, options);
    }

    let place = $state("Riemerling");
    let lat = $state(48.06191466693093);
    let lng = $state(11.687986444166285);

    async function getMyLocation() {
        let location = await getLocation();
        lat = location.latitude;
        lng = location.longitude;
        place = "Mein Standort";
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
