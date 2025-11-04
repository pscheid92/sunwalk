const TIMEOUT = 5000;

export interface Location {
    latitude: number;
    longitude: number;
}

export function getLocation(): Promise<Location> {
    const options = {
        enableHighAccuracy: false,
        timeout: TIMEOUT,
        maximumAge: 2 * TIMEOUT,
    };

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(positionToLocation(position)),
            (error) => reject(error),
            options
        );
    });
}

function positionToLocation(position: GeolocationPosition): Location {
    return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };
}
