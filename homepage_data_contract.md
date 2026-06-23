# Homepage Data Contract Documentation

This document maps the Frontend UI components to the future Database schema (Turso/Drizzle).

## 1. Data Model Mapping

| UI Component | Data Interface | Database Table | Handling |
| :--- | :--- | :--- | :--- |
| **HeroSlider** | `BannerItem[]` | `banners` | Multiple rows, ordered by `order`. |
| **QuickStats** | `StatItem[]` | `stats` | Multiple rows, ordered by `order`. Max 4 for optimal UI. |
| **PrincipalWelcome**| `PrincipalWelcomeData` | `school_settings` | Singleton JSON or specific columns. |
| **VisionMission** | `VisionMissionData` | `school_settings` | Singleton JSON or specific columns. |
| **LatestNews** | `NewsPost[]` | `posts` | Filter by `category='news'` and `published=true`. |
| **UpcomingAgenda** | `AgendaItemData[]` | `agendas` | Filter by `date >= current_date`, sort by `date ASC`. |
| **GalleryPreview** | `GalleryImage[]` | `gallery` | Filter by `is_featured=true`, ordered by `order`. |
| **PpdbCTA** | `PpdbConfig` | `school_settings` | Singleton, controlled by `isActive` flag. |

## 2. Field Requirements & Fallbacks

### HeroSlider
- **Required**: `title`, `image`.
- **Optional**: `description` (empty fallback), `primaryCTA` (hidden if null).
- **Fallback**: If no banners exist, show a static fallback brand image.

### QuickStats
- **Required**: `value`, `label`, `icon`.
- **Fallback**: Empty array hides the section entirely via Astro `{stats.length > 0 && ...}`.

### PrincipalWelcome
- **Required**: `principalName`, `message`, `image`.
- **Optional**: `quote` (hidden if empty).
- **Fallback**: Placeholder image if `image` is missing.

### News & Agenda
- **Required**: `title`, `date`, `image` (for news).
- **Fallback**: "Coming Soon" placeholder if arrays are empty.

## 3. Implementation Notes

- **Date Formatting**: Database will store `ISO strings` or `Timestamps`. Frontend will convert to localized formats (e.g., "24 Okt 2023" for news and split "28" / "Okt" for agenda).
- **Icons**: Store as string identifiers (e.g., `"school"`) matching Material Symbols names.
- **Images**: Store as Cloudinary/Media URLs. Use fallback local placeholder if URL is broken.
- **Singletons**: `school_settings` table will handle site-wide configurations like PPDB status and Principal details.

## 4. UI-to-DB Field Map Example: News Card

```json
{
  "ui_field": "category",
  "db_field": "category_id -> categories.name",
  "transformation": "toUpperCase()"
}
```
