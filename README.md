# Sunwalk

A sun and daylight phase dashboard that shows sunrise, sunset, twilight, and golden hour times for any location on Earth.

## Features

- **12 distinct sun/sky phases** — from astronomical dawn through solar noon to night
- **Location search** — find any place via Photon (OpenStreetMap) geocoding
- **Browser geolocation** — use your device GPS for instant local results
- **Timezone-based defaults** — auto-detects a sensible starting location from your browser timezone
- **Date navigation** — pick any date or step through days
- **Active phase highlight** — shows which phase is currently active with remaining time
- **Dark theme** — compact single-screen layout with color-coded phase indicators

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS v4
- Vite (Rolldown)
- [SunCalc](https://github.com/mourner/suncalc) for astronomical calculations
- [Photon API](https://photon.komoot.io) for geocoding
- Biome for linting and formatting

## Getting Started

```sh
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm check` | TypeScript type checking |
| `pnpm lint` | Lint with Biome |
| `pnpm format` | Format with Biome |
