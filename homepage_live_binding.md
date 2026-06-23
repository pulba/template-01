# Homepage Live Data Binding Documentation

The homepage is now fully dynamic and powered by a Turso (LibSQL) database.

## 1. Runtime Data Flow

1.  **Request**: User visits `/`.
2.  **Server Fetch**: Astro's server-side logic calls `HomepageService.getFullHomepageData()`.
3.  **Parallel Query**: The service executes multiple parallel SQL queries via Drizzle ORM against the Turso/local SQLite database.
4.  **Mapping**: Raw results are transformed into UI-Ready TypeScript interfaces by the mapper layer.
5.  **Hydration**: The data is passed as props to the modular Astro components.
6.  **Rendering**: The final HTML is generated and served to the user.

## 2. Table Dependency Map

| Section | Dependency Table | Status |
| :--- | :--- | :--- |
| **Hero Slider** | `banners` | **LIVE** |
| **Quick Stats** | `school_stats` | **LIVE** |
| **Welcome** | `school_profile` | **LIVE** |
| **Vision & Mission** | `school_profile` | **LIVE** |
| **Latest News** | `posts` | **LIVE** |
| **Upcoming Agenda** | `agendas` | **LIVE** |
| **Gallery** | `galleries`, `gallery_albums` | **LIVE** |
| **PPDB CTA** | `school_profile` | **LIVE** |

## 3. Resilience Features

- **Conditionals**: Sections only render if data exists (e.g., `{data.latestNews.length > 0 && ...}`).
- **Environment Fallback**: The client automatically falls back to `file:local.db` if no `TURSO_DATABASE_URL` is detected, allowing for seamless local development.
- **Type Guards**: Strict TypeScript interfaces ensure that data coming from the database matches component expectations.

## 4. Development Workflow

- **Schema Update**: Modify `src/lib/db/schema.ts`.
- **Sync**: Run `npx drizzle-kit push`.
- **Seed**: Run `npx tsx scratch/run_seed.ts` to refresh development data.
