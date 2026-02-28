import type { Times } from "./sunwalk";

export interface Phase {
    name: string;
    fromKey: keyof Times;
    toKey: keyof Times;
    tw: string;
    hex: string;
}

export const PHASES: Phase[] = [
    { name: "Nacht", fromKey: "nadir", toKey: "astronomicalDawn", tw: "bg-indigo-950", hex: "#1e1b4b" },
    {
        name: "Astro. Dämmerung",
        fromKey: "astronomicalDawn",
        toKey: "nauticalDawn",
        tw: "bg-indigo-400",
        hex: "#818cf8"
    },
    { name: "Naut. Dämmerung", fromKey: "nauticalDawn", toKey: "civilDawn", tw: "bg-blue-400", hex: "#60a5fa" },
    { name: "Zivile Dämmerung", fromKey: "civilDawn", toKey: "sunriseStart", tw: "bg-sky-400", hex: "#38bdf8" },
    { name: "Sonnenaufgang", fromKey: "sunriseStart", toKey: "sunriseEnd", tw: "bg-amber-400", hex: "#fbbf24" },
    { name: "Goldene Stunde", fromKey: "sunriseEnd", toKey: "goldenHourEnd", tw: "bg-yellow-300", hex: "#fde047" },
    { name: "Tag", fromKey: "goldenHourEnd", toKey: "goldenHourStart", tw: "bg-slate-400", hex: "#94a3b8" },
    { name: "Goldene Stunde", fromKey: "goldenHourStart", toKey: "sunsetStart", tw: "bg-yellow-300", hex: "#fde047" },
    { name: "Sonnenuntergang", fromKey: "sunsetStart", toKey: "sunsetEnd", tw: "bg-amber-400", hex: "#fbbf24" },
    { name: "Zivile Dämmerung", fromKey: "sunsetEnd", toKey: "civilDusk", tw: "bg-sky-400", hex: "#38bdf8" },
    { name: "Naut. Dämmerung", fromKey: "civilDusk", toKey: "nauticalDusk", tw: "bg-blue-400", hex: "#60a5fa" },
    {
        name: "Astro. Dämmerung",
        fromKey: "nauticalDusk",
        toKey: "astronomicalDusk",
        tw: "bg-indigo-400",
        hex: "#818cf8"
    }
];

export function isValidTime(date: Date): boolean {
    return date instanceof Date && !Number.isNaN(date.getTime());
}
