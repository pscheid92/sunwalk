<script lang="ts">
    import {search, type Place} from "../lib/photon";
    import { Input, Spinner } from 'flowbite-svelte';
    import { SearchSolid, MapPinAltSolid } from 'flowbite-svelte-icons';

    interface Props {
        onSelect: (place: Place) => void;
        query?: string;
    }

    let {onSelect, query = $bindable("")}: Props = $props();
    let results = $state<Place[]>([]);
    let isSearching = $state(false);
    let showResults = $state(false);
    let debounceTimer: number | undefined = $state(undefined);

    async function performSearch(searchQuery: string) {
        if (searchQuery.trim().length < 2) {
            results = [];
            return;
        }

        isSearching = true;
        try {
            results = await search(searchQuery);
        } catch (error) {
            console.error("Search error:", error);
            results = [];
        } finally {
            isSearching = false;
        }
    }

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        query = target.value;
        showResults = true;

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
            performSearch(query);
        }, 300);
    }

    function selectPlace(place: Place) {
        query = place.name;
        showResults = false;
        results = [];
        onSelect(place);
    }

    function handleBlur() {
        setTimeout(() => {
            showResults = false;
        }, 200);
    }
</script>

<div class="relative w-full">
    <Input
        type="search"
        placeholder="Ort suchen..."
        value={query}
        oninput={handleInput}
        onblur={handleBlur}
        onfocus={() => showResults = query.length >= 2}
        size="lg"
    >
        <SearchSolid slot="left" class="w-5 h-5 text-gray-500" />
    </Input>

    {#if showResults && (results.length > 0 || isSearching)}
        <div class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
            {#if isSearching}
                <div class="flex items-center gap-3 px-4 py-4 text-gray-500">
                    <Spinner size="4" color="orange" />
                    <span class="text-sm">Suche läuft...</span>
                </div>
            {:else}
                {#each results as place, index (index)}
                    <button
                        class="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 border-b border-gray-100 last:border-b-0 transition-all focus:outline-none focus:bg-gradient-to-r focus:from-orange-50 focus:to-amber-50 group"
                        onclick={() => selectPlace(place)}
                    >
                        <div class="flex items-start gap-3">
                            <MapPinAltSolid class="w-4 h-4 text-orange-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <div class="flex-1 min-w-0">
                                <div class="font-medium text-gray-900 group-hover:text-orange-700 transition-colors">{place.displayName}</div>
                                <div class="text-sm text-gray-600 mt-0.5 truncate">{place.context}</div>
                            </div>
                        </div>
                    </button>
                {/each}
            {/if}
        </div>
    {/if}
</div>
