interface TimezoneLocation {
    place: string;
    lat: number;
    lng: number;
}

const TIMEZONE_MAP: Record<string, TimezoneLocation> = {
    "Europe/Berlin": { place: "Berlin", lat: 52.52, lng: 13.405 },
    "Europe/Vienna": { place: "Wien", lat: 48.2082, lng: 16.3738 },
    "Europe/Zurich": { place: "Zürich", lat: 47.3769, lng: 8.5417 },
    "Europe/Paris": { place: "Paris", lat: 48.8566, lng: 2.3522 },
    "Europe/London": { place: "London", lat: 51.5074, lng: -0.1278 },
    "Europe/Madrid": { place: "Madrid", lat: 40.4168, lng: -3.7038 },
    "Europe/Rome": { place: "Rom", lat: 41.9028, lng: 12.4964 },
    "Europe/Amsterdam": { place: "Amsterdam", lat: 52.3676, lng: 4.9041 },
    "Europe/Brussels": { place: "Brüssel", lat: 50.8503, lng: 4.3517 },
    "Europe/Copenhagen": { place: "Kopenhagen", lat: 55.6761, lng: 12.5683 },
    "Europe/Stockholm": { place: "Stockholm", lat: 59.3293, lng: 18.0686 },
    "Europe/Oslo": { place: "Oslo", lat: 59.9139, lng: 10.7522 },
    "Europe/Helsinki": { place: "Helsinki", lat: 60.1699, lng: 24.9384 },
    "Europe/Warsaw": { place: "Warschau", lat: 52.2297, lng: 21.0122 },
    "Europe/Prague": { place: "Prag", lat: 50.0755, lng: 14.4378 },
    "Europe/Budapest": { place: "Budapest", lat: 47.4979, lng: 19.0402 },
    "Europe/Lisbon": { place: "Lissabon", lat: 38.7223, lng: -9.1393 },
    "Europe/Athens": { place: "Athen", lat: 37.9838, lng: 23.7275 },
    "Europe/Istanbul": { place: "Istanbul", lat: 41.0082, lng: 28.9784 },
    "Europe/Moscow": { place: "Moskau", lat: 55.7558, lng: 37.6173 },
    "America/New_York": { place: "New York", lat: 40.7128, lng: -74.006 },
    "America/Chicago": { place: "Chicago", lat: 41.8781, lng: -87.6298 },
    "America/Denver": { place: "Denver", lat: 39.7392, lng: -104.9903 },
    "America/Los_Angeles": { place: "Los Angeles", lat: 34.0522, lng: -118.2437 },
    "America/Toronto": { place: "Toronto", lat: 43.6532, lng: -79.3832 },
    "America/Sao_Paulo": { place: "São Paulo", lat: -23.5505, lng: -46.6333 },
    "America/Mexico_City": { place: "Mexiko-Stadt", lat: 19.4326, lng: -99.1332 },
    "Asia/Tokyo": { place: "Tokio", lat: 35.6762, lng: 139.6503 },
    "Asia/Shanghai": { place: "Shanghai", lat: 31.2304, lng: 121.4737 },
    "Asia/Kolkata": { place: "Mumbai", lat: 19.076, lng: 72.8777 },
    "Asia/Dubai": { place: "Dubai", lat: 25.2048, lng: 55.2708 },
    "Asia/Singapore": { place: "Singapur", lat: 1.3521, lng: 103.8198 },
    "Asia/Seoul": { place: "Seoul", lat: 37.5665, lng: 126.978 },
    "Australia/Sydney": { place: "Sydney", lat: -33.8688, lng: 151.2093 },
    "Pacific/Auckland": { place: "Auckland", lat: -36.8485, lng: 174.7633 }
};

const FALLBACK: TimezoneLocation = { place: "Berlin", lat: 52.52, lng: 13.405 };

export function getTimezoneLocation(): TimezoneLocation {
    try {
        let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return TIMEZONE_MAP[tz] ?? FALLBACK;
    } catch {
        return FALLBACK;
    }
}
