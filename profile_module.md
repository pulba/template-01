# Institutional Profile Module Documentation

The Profile module provides a comprehensive overview of the school's identity, history, and leadership.

## 1. Routes

| Route | Page | Responsibility |
| :--- | :--- | :--- |
| `/profil` | `index.astro` | Main institutional page showing history, leadership, vision, and legal identity. |

## 2. Components

- **`ProfileHero`**: A high-impact hero section with localized background images and titles.
- **`PrincipalMessageFull`**: Detailed leadership section with portrait, bio-signature, and pull-quotes.
- **`VisionMissionFull`**: A deep-dive into fundamental values using card-based masonry styling.
- **`ProfileContentSection`**: A versatile, responsive section for general text/image content (History, Identity, etc.).

## 3. Data Mapping

| Data Source | Database Table | Handling |
| :--- | :--- | :--- |
| School Name | `school_profile.school_name` | Direct display. |
| Principal Info | `school_profile` | Maps `name`, `signature`, `message` (JSON), `image`, `quote`. |
| Vision | `school_profile.vision_text` | Direct display in Vision card. |
| Mission | `school_profile.mission_items` | JSON string parsed into list items. |

## 4. Technical Features

- **Service Layer (`SchoolService`)**: Encapsulates the Drizzle query to fetch site-wide settings in a single transaction.
- **SEO Ready**: Uses semantic HTML5 (`article`, `section`, `h1-h6`) and meta titles tailored to the institutional brand.
- **Responsive Design**: All sections automatically adjust from 2-column desktop layouts to 1-column mobile layouts with optimized spacing.
