<script lang="ts">
    import { Card, Heading } from 'flowbite-svelte';
    import type { Component, Snippet } from 'svelte';

    interface Props {
        title: string;
        icon: Component;
        iconGradient: string;
        borderColor: string;
        children: Snippet;
    }

    let { title, icon: Icon, iconGradient, borderColor, children }: Props = $props();
</script>

<Card size="lg" class="shadow-lg border-2 {borderColor} bg-white p-4 sm:p-6">
    <div class="flex items-center gap-3 mb-4 sm:mb-6">
        <div class="p-2 {iconGradient} rounded-lg">
            <Icon class="w-5 h-5 text-white" />
        </div>
        <Heading tag="h3" class="mb-0 text-xl">{title}</Heading>
    </div>

    <div class="space-y-2 sm:space-y-3">
        {@render children()}
    </div>
</Card>
