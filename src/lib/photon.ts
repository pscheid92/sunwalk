import type {Feature, FeatureCollection, Point} from "geojson";

const BASE_URL = "https://photon.komoot.io";
const LANG = "de";
const DEFAULT_LIMIT = 10;


export type OsmType = "N" | "W" | "R";
export type PlaceKind = "city" | "town" | "village" | "suburb" | "street" | "place";

export interface PhotonProperties {
    osm_id?: number;
    osm_type?: OsmType;
    osm_key?: string;
    osm_value?: string;
    name?: string;
    country?: string;
    countrycode?: string;
    state?: string;
    county?: string;
    city?: string;
    town?: string;
    village?: string;
    district?: string;
    suburb?: string;
    street?: string;
    housenumber?: string;
    postcode?: string;
}

export type PhotonFeature = Feature<Point, PhotonProperties>;
export type PhotonResponse = FeatureCollection<Point, PhotonProperties>;

export interface Place {
    lat: number;
    lon: number;
    name: string;
    kind: PlaceKind | string;
    context: string;
    displayName: string;
    raw: PhotonFeature;
}

export interface SearchOptions {
    limit?: number;
    signal?: AbortSignal;
}

export interface ReverseOptions {
    limit?: number;
    signal?: AbortSignal;
}

export async function search(query: string, lat?: number, lon?: number, options: SearchOptions = {}): Promise<Place[]> {
    const {limit = DEFAULT_LIMIT, signal} = options;

    const url = new URL("/api", BASE_URL);
    url.searchParams.set("q", query);
    url.searchParams.set("lang", LANG);
    url.searchParams.set("limit", String(limit));

    if (lat !== undefined) url.searchParams.set("lat", String(lat));
    if (lon !== undefined) url.searchParams.set("lon", String(lon));

    const places = await fetchPlaces(url, signal);

    // Filter to only keep actual places (not administrative boundaries, buildings, etc.)
    return places.filter(place => place.raw.properties?.osm_key === "place");
}

export async function reverse(lat: number, lon: number, options: ReverseOptions = {}): Promise<Place[]> {
    const {limit = DEFAULT_LIMIT, signal} = options;

    const url = new URL("/reverse", BASE_URL);
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lon", String(lon));
    url.searchParams.set("lang", LANG);
    url.searchParams.set("limit", String(limit));

    return fetchPlaces(url, signal);
}

async function fetchPlaces(url: URL, signal?: AbortSignal): Promise<Place[]> {
    const response = await fetch(url, {signal, headers: {Accept: "application/json"}});
    if (!response.ok) {
        throw new Error(`Photon API error: HTTP ${response.status}`);
    }

    const data = await response.json() as PhotonResponse;
    return data.features.map(toPlace);
}

function toPlace(feature: PhotonFeature): Place {
    const props = feature.properties ?? {};
    const [lon, lat] = feature.geometry.coordinates;

    const name = determineName(props);
    const kind = determineKind(props);
    const context = buildContext(props);
    const displayName = buildDisplayName(name, props);

    return {lat, lon, name, kind, context, displayName, raw: feature};
}

function determineName(props: PhotonProperties): string {
    return props.name
        || props.city
        || props.town
        || props.village
        || props.suburb
        || props.district
        || props.street
        || "Unbenannt";
}

function determineKind(props: PhotonProperties): PlaceKind | string {
    if (props.city) return "city";
    if (props.town) return "town";
    if (props.village) return "village";
    if (props.suburb) return "suburb";
    if (props.street) return "street";
    return props.osm_value || "place";
}

function buildContext(props: PhotonProperties): string {
    const parts = [];

    // Add street/housenumber if available
    if (props.street) {
        const streetPart = props.housenumber ? `${props.street} ${props.housenumber}` : props.street;
        parts.push(streetPart);
    }

    // Add district/suburb if different from main name
    if (props.district && props.district !== props.name) parts.push(props.district);
    if (props.suburb && props.suburb !== props.name) parts.push(props.suburb);

    // Add city if available and different from name
    if (props.city && props.city !== props.name) parts.push(props.city);

    // Add county if available
    if (props.county) parts.push(props.county);

    // Add state and country
    if (props.state) parts.push(props.state);
    if (props.country) parts.push(props.country);

    return parts.join(", ");
}

function buildDisplayName(name: string, props: PhotonProperties): string {
    return [name, props.postcode, props.state, props.country]
        .filter(Boolean)
        .join(", ");
}
