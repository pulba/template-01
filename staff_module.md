# Teacher & Staff Directory Module Documentation

The Staff module provides a structured directory of the school's leadership, educators, and administrative personnel.

## 1. Routes

| Route | Page | Responsibility |
| :--- | :--- | :--- |
| `/guru-staff` | `index.astro` | Main directory listing grouped by organizational categories (Pimpinan, Guru, Staff). |

## 2. Components

- **`StaffHero`**: A specialized header section with a clean, professional aesthetic.
- **`StaffGrid`**: A responsive 4-column grid layout for profile cards.
- **`StaffProfileCard`**: Individual profile tiles featuring:
    - Grayscale-to-color transition on hover.
    - Glassmorphism bio overlay.
    - Automatic badge generation for subjects.
    - Institutional shadow depth and border-radius consistency.

## 3. Data Mapping

| UI Field | Database Field | Handling |
| :--- | :--- | :--- |
| Name | `staff.name` | Direct display. |
| Title | `staff.title` | Functional role (e.g., "Kepala Sekolah"). |
| Subject | `staff.subject` | Academic specialty (optional). |
| Image | `staff.image_url` | High-quality portrait. |
| Bio | `staff.bio` | Short personal/professional quote. |
| Category | `staff.category` | Used for grouping (Pimpinan, Guru, Staff). |

## 4. Technical Features

- **Service Layer (`StaffService`)**: 
    - `getAllStaff()`: Fetches the entire directory sorted by the `sortOrder` priority.
- **Categorization Logic**: The listing page automatically segments personnel based on their `category` field, maintaining organizational hierarchy.
- **Visual Branding**: Uses the `grayscale` filter on images with smooth CSS transitions to create a "premium portrait" effect.
- **Responsiveness**: Grid automatically collapses from 4 columns to 1 column on mobile devices.
