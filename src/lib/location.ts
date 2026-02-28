const TIMEOUT = 10000;

export interface Location {
    latitude: number;
    longitude: number;
}

export function getLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(positionToLocation(position)),
            (error) => reject(error),
            { enableHighAccuracy: true, timeout: TIMEOUT, maximumAge: 2 * TIMEOUT }
        );
    });
}

function positionToLocation(position: GeolocationPosition): Location {
    return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
}
