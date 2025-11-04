<script lang="ts">
    import { Card, Button, Heading } from 'flowbite-svelte';
    import { MapPinAltSolid } from 'flowbite-svelte-icons';
    import SearchBox from './SearchBox.svelte';
    import type { Place } from '../lib/photon';

    interface Props {
        place: string;
        lat: number;
        lng: number;
        searchQuery: string;
        onPlaceSelect: (place: Place) => void;
        onLocationClick: () => void;
    }

    let { place, lat, lng, searchQuery = $bindable(), onPlaceSelect, onLocationClick }: Props = $props();
</script>

<Card size="lg" class="shadow-lg border-2 border-gray-200 bg-white p-4 sm:p-6">
    <div class="flex items-center gap-3 mb-6">
        <div class="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg">
            <MapPinAltSolid class="w-5 h-5 text-white" />
        </div>
        <div>
            <Heading tag="h2" class="mb-0 text-2xl">{place}</Heading>
            <div class="flex gap-2 mt-1">
                <span class="text-sm text-gray-600">Lat: {lat.toFixed(4)}°</span>
                <span class="text-sm text-gray-400">•</span>
                <span class="text-sm text-gray-600">Lng: {lng.toFixed(4)}°</span>
            </div>
        </div>
    </div>

    <div class="space-y-3">
        <SearchBox bind:query={searchQuery} onSelect={onPlaceSelect} />
        <Button
            color="primary"
            class="w-full shadow-lg hover:shadow-xl transition-shadow"
            onclick={onLocationClick}
        >
            <MapPinAltSolid class="w-4 h-4 mr-2" />
            Standort bestimmen
        </Button>
    </div>
</Card>
