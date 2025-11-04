/**
 * Color and styling constants for the Sunwalk application
 */

// Icon colors for different time periods
export const ICON_COLORS = {
    astronomicalTwilight: "text-indigo-500",
    nauticalTwilight: "text-blue-500",
    civilTwilight: "text-cyan-500",
    sunrise: "text-orange-500",
    sunset: "text-orange-500",
    goldenHour: "text-yellow-500",
    day: "text-gray-400",
    night: "text-indigo-600",
} as const;

// Background colors for time entry cards
export const BACKGROUND_COLORS = {
    white: "bg-white",
    sunrise: "bg-gradient-to-r from-orange-50 to-amber-50",
    sunset: "bg-gradient-to-r from-orange-50 to-pink-50",
    goldenHour: "bg-gradient-to-r from-yellow-50 to-orange-50",
    night: "bg-gradient-to-r from-indigo-50 to-blue-50",
} as const;

// Default location (center of Germany)
export const DEFAULT_LOCATION = {
    name: "Deutschland",
    lat: 51.1657,
    lng: 10.4515,
} as const;
