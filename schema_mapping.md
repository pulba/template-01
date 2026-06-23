# Drizzle Schema Mapping Documentation

This document traces the data flow from SQL tables to the Drizzle ORM schemas and finally to the UI interfaces.

## 1. Schema-to-Interface Map

| CMS Table | Drizzle Schema Object | Target Interface | Mapping Strategy |
| :--- | :--- | :--- | :--- |
| `school_profile` | `schoolProfile` | `PrincipalWelcomeData`, `VisionMissionData`, `PpdbConfig` | Singleton mapping in `HomepageService`. |
| `banners` | `banners` | `BannerItem[]` | Direct row-to-item mapping via `mapBanner`. |
| `school_stats` | `schoolStats` | `StatItem[]` | Direct row-to-item mapping via `mapStat`. |
| `posts` | `posts` | `NewsPost[]` | Filtered by `isPublished`, mapped via `mapNews`. |
| `agendas` | `agendas` | `AgendaItemData[]` | Filtered by `eventDate >= NOW()`, mapped via `mapAgenda`. |

## 2. Technical Field Alignment

### Banners Table
- **Drizzle Field**: `imageUrl` (text) -> **UI Field**: `image` (string)
- **Drizzle Field**: `primaryCtaText` (text) -> **UI Field**: `primaryCTA.text` (string)
- **Drizzle Field**: `isActive` (boolean) -> Filter criteria.

### Posts Table
- **Drizzle Field**: `publishedAt` (ISO Date) -> **UI Field**: `date` (Formatted "DD MMM YYYY")
- **Drizzle Field**: `slug` (Unique) -> **UI Field**: `href` (`/berita/${slug}`)

### Agendas Table
- **Drizzle Field**: `eventDate` (ISO Date) -> **UI Field**: `day` (DD) and `month` (MMM)

## 3. Singleton Handling (`school_profile`)

The `school_profile` table is a single-row configuration table. 
- `principalMessage` and `missionItems` are stored as **JSON strings** in SQLite/LibSQL to support dynamic lists.
- The `HomepageService` parses these JSON strings back into string arrays for the UI.

## 4. Query Architecture

- **Client**: `src/lib/db/client.ts` initializes the `libsql` client and wraps it with `drizzle()`.
- **Schema**: `src/lib/db/schema.ts` defines the types and relationships.
- **Service**: Uses `db.select().from(schema.X)` for type-safe data access.
