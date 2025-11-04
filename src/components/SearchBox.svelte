<script lang="ts">
    import {search, type Place} from "../lib/photon";

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

<div class="search-container">
    <input
        type="text"
        placeholder="Ort suchen..."
        value={query}
        oninput={handleInput}
        onblur={handleBlur}
        onfocus={() => showResults = query.length >= 2}
    />

    {#if showResults && (results.length > 0 || isSearching)}
        <div class="results-dropdown">
            {#if isSearching}
                <div class="result-item loading">Suche...</div>
            {:else}
                {#each results as place, index (index)}
                    <button
                        class="result-item"
                        onclick={() => selectPlace(place)}
                    >
                        <div class="result-name">{place.displayName}</div>
                        <div class="result-context">{place.context}</div>
                    </button>
                {/each}
            {/if}
        </div>
    {/if}
</div>

<style>
    .search-container {
        position: relative;
        width: 100%;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: #4a90e2;
    }

    .results-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ccc;
        border-top: none;
        border-radius: 0 0 4px 4px;
        max-height: 300px;
        overflow-y: auto;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .result-item {
        width: 100%;
        padding: 0.75rem;
        text-align: left;
        border: none;
        background: white;
        cursor: pointer;
        border-bottom: 1px solid #f0f0f0;
        display: block;
    }

    .result-item:hover {
        background-color: #f5f5f5;
    }

    .result-item.loading {
        cursor: default;
        color: #999;
    }

    .result-name {
        font-weight: 500;
        margin-bottom: 0.25rem;
    }

    .result-context {
        font-size: 0.85rem;
        color: #666;
    }
</style>
