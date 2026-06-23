# News Module Documentation

The News module handles the institutional blog and announcements ecosystem.

## 1. Routes

| Route | Page | Responsibility |
| :--- | :--- | :--- |
| `/berita` | `index.astro` | Displays a grid of all published news posts. |
| `/berita/[slug]` | `[slug].astro` | Displays full article content, metadata, and related posts. |

## 2. Components

- **`NewsGrid`**: A layout component for the listing page.
- **`ArticleMeta`**: Displays category, date, and author info.
- **`NewsSidebar`**: Includes search and category navigation (placeholders).
- **`RelatedPosts`**: Automatically suggests latest articles excluding the current one.
- **`NewsCard`**: Reused from the homepage for visual consistency.

## 3. Data Flow

1.  **Service Layer (`PostService`)**:
    - `getAllPosts()`: Fetches published posts sorted by date.
    - `getPostBySlug(slug)`: Fetches specific article for the detail page.
    - `getRelatedPosts(slug)`: Fetches 3 latest posts excluding the active slug.
2.  **Mapping**: Uses the existing `mappers.mapNews` to ensure data structure consistency with the homepage.
3.  **Routing**: Uses `getStaticPaths` for optimized pre-rendering of all published news articles.

## 4. Visual Design

- **Grid**: 3-column layout on desktop, 1-column on mobile.
- **Detail Page**: 8:4 column split (Content : Sidebar).
- **Typography**: Uses `font-display-lg` for titles and `font-body-lg` for reading comfort.
- **Color Palette**: Fully synchronized with the primary institutional blue and white surfaces.
