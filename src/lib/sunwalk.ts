import * as SunCalc from 'suncalc';

export interface Times {
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

export function calculateTimes(latitude: number, longitude: number, date: Date): Times {
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
