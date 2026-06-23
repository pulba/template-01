# Agenda & Events Module Documentation

The Agenda module manages the school's calendar of events and activities.

## 1. Routes

| Route | Page | Responsibility |
| :--- | :--- | :--- |
| `/agenda` | `index.astro` | Displays a timeline of upcoming events and activities. |
| `/agenda/[slug]` | `[slug].astro` | Displays full event details, time, location, and related agendas. |

## 2. Components

- **`AgendaCalendarHero`**: Thematic header for the calendar listing.
- **`AgendaTimeline`**: A clean, vertical arrangement of event cards.
- **`AgendaDetailMeta`**: High-visibility metadata block (Date, Time, Location).
- **`RelatedAgenda`**: Displays other upcoming events to encourage participation.
- **`AgendaItem`**: Reused from the homepage to maintain consistency.

## 3. Data Mapping

| UI Field | Database Field | Handling |
| :--- | :--- | :--- |
| Title | `agendas.title` | Direct display. |
| Date | `agendas.event_date` | Parsed into `DD`, `MMM`, and long formats for detail pages. |
| Time | `agendas.event_time` | Direct display. |
| Location | `agendas.location` | Direct display. |
| Description | `agendas.description` | Optional field with fallback placeholder. |

## 4. Technical Features

- **Service Layer (`AgendaService`)**: Handles date-based filtering (`eventDate >= NOW()`) to ensure only relevant events are shown.
- **Dynamic Routing**: Uses `getStaticPaths` to pre-render individual event pages.
- **Visual Branding**: Uses the `bg-primary` and `secondary-container` accents to distinguish the calendar section.
- **Responsive Layout**: Tailored for readability with centered 4-column containers on detail pages.
