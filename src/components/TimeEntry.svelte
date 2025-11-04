<script lang="ts">
    import type { Component } from 'svelte';

    interface Props {
        icon: Component;
        iconColor: string;
        label: string;
        time: string;
        highlighted?: boolean;
        backgroundColor?: string;
    }

    let { icon: Icon, iconColor, label, time, highlighted = false, backgroundColor = "bg-white" }: Props = $props();

    const baseClasses = "flex items-center justify-between p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow";
    const highlightClasses = highlighted ? "border-2 border-orange-200" : "";
    const bgClasses = backgroundColor;
</script>

<div class="{baseClasses} {bgClasses} {highlightClasses}">
    <div class="flex items-center gap-2 sm:gap-3">
        <Icon class="w-4 h-4 sm:w-5 sm:h-5 {iconColor} flex-shrink-0" />
        <span class="font-medium text-sm sm:text-base text-gray-900" class:font-semibold={highlighted}>
            {label}
        </span>
    </div>
    <span class="text-base sm:text-lg font-bold flex-shrink-0 ml-2 {highlighted ? 'text-orange-600' : 'text-primary-600'}">
        {time}
    </span>
</div>
