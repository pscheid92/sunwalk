<script lang="ts">
    import { Card, Button, Heading, Datepicker } from 'flowbite-svelte';
    import { CalendarMonthSolid, ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';

    interface Props {
        date: Date;
        onPreviousDay: () => void;
        onNextDay: () => void;
    }

    let { date = $bindable(), onPreviousDay, onNextDay }: Props = $props();
</script>

<Card size="lg" class="shadow-lg border-2 border-gray-200 bg-white p-4 sm:p-6">
    <div class="flex items-center gap-3 mb-4 sm:mb-6">
        <div class="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <CalendarMonthSolid class="w-5 h-5 text-white" />
        </div>
        <Heading tag="h3" class="mb-0 text-xl">Datum</Heading>
    </div>

    <div class="flex gap-2 sm:gap-3 items-center">
        <Button
            color="light"
            size="sm"
            class="shadow hover:shadow-md transition-shadow flex-shrink-0"
            onclick={onPreviousDay}
        >
            <ChevronLeftOutline class="w-4 h-4 sm:mr-2" />
            <span class="hidden sm:inline">Gestern</span>
        </Button>

        <div class="flex-1 min-w-0">
            <Datepicker
                bind:value={date}
                inline={false}
                locale="de-DE"
            />
        </div>

        <Button
            color="light"
            size="sm"
            class="shadow hover:shadow-md transition-shadow flex-shrink-0"
            onclick={onNextDay}
        >
            <span class="hidden sm:inline">Morgen</span>
            <ChevronRightOutline class="w-4 h-4 sm:ml-2" />
        </Button>
    </div>
</Card>
