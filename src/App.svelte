<script lang="ts">
    import * as SunCalc from 'suncalc';

    interface Times {
        astronomicalDawn: Date;
        nauticalDawn: Date;
        civilDawn: Date;
        sunriseStart: Date;
        sunriseEnd: Date;
        goldenHourEnd: Date;

        solarNoon: Date;

        goldenHourStart: Date;
        sunsetStart: Date;
        sunsetEnd: Date;
        civilDusk: Date;
        nauticalDusk: Date;
        astronomicalDusk: Date;

        nadir: Date;
    }

    function calculateTimes(latitude: number, longitude: number, date: Date): Times {
        const times = SunCalc.getTimes(date, latitude, longitude);

        return {
            astronomicalDawn: times.nightEnd,
            nauticalDawn: times.nauticalDawn,
            civilDawn: times.dawn,
            sunriseStart: times.sunrise,
            sunriseEnd: times.sunriseEnd,
            goldenHourEnd: times.goldenHourEnd,

            solarNoon: times.solarNoon,

            goldenHourStart: times.goldenHour,
            sunsetStart: times.sunsetStart,
            sunsetEnd: times.sunset,
            civilDusk: times.dusk,
            nauticalDusk: times.nauticalDusk,
            astronomicalDusk: times.night,

            nadir: times.nadir,
        };
    }

    function formatDate(date: Date): String {
        const locale = "de-DE";
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "numeric",
            year: "numeric",
        };
        return date.toLocaleDateString(locale, options);
    }

    function formatTime(date: Date): String {
        const locale = "de-DE";
        const options: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        return date.toLocaleTimeString(locale, options);
    }

    const today = new Date();
    const times = calculateTimes(48.06191466693093, 11.687986444166285, today);
</script>

<main>
    <h2>Riemerling</h2>
    <h2>{formatDate(today)}</h2>

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