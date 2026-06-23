# Gallery & Media Module Documentation

The Gallery module serves as the visual archive for school activities and facilities.

## 1. Routes

| Route | Page | Responsibility |
| :--- | :--- | :--- |
| `/galeri` | `index.astro` | Main visual archive with category filtering and masonry layout. |

## 2. Components

- **`GalleryHero`**: A primary hero section with a thematic background pattern.
- **`GalleryCategoryFilter`**: Interactive filter buttons to sort media by category.
- **`GalleryMasonry`**: A responsive CSS grid layout that supports spanning tiles (`large` vs `small`).
- **`GalleryItem`**: Reused from the homepage, featuring hover zoom and institutional overlays.

## 3. Data Mapping

| UI Field | Database Field | Handling |
| :--- | :--- | :--- |
| Image URL | `galleries.image_url` | Rendered as background-image or `img` tag. |
| Alt Text | `galleries.alt_text` | SEO and Accessibility labeling. |
| Span | `galleries.span` | Determines if the image takes `large` (2x2) or `small` (1x1) grid space. |
| Category | `galleries.category` | Used for UI filtering. |
| Sort Order | `galleries.sort_order` | Determines visual priority. |

## 4. Technical Features

- **Service Layer (`GalleryService`)**:
    - `getAllImages()`: Fetches the entire visual archive.
    - `getFeaturedImages()`: Specifically for the homepage preview section.
    - `getImagesByCategory(category)`: For future AJAX-based or dynamic filtering.
- **Responsive Grid**: Automatically shifts from 4 columns (Desktop) to 2 columns (Tablet) and 1 column (Mobile).
- **Masonry logic**: Uses `auto-rows` and `col-span`/`row-span` for a high-end masonry effect without heavy JS libraries.
