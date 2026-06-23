# Contact & Inbox Module Documentation

The Contact module provides a bidirectional communication channel between the public and the school administration.

## 1. Routes & Endpoints

| Path | Type | Responsibility |
| :--- | :--- | :--- |
| `/kontak` | Page | Main contact interface with info panels, form, and map. |
| `/api/contact` | API | Serverless endpoint (SSR) for processing form submissions. |

## 2. Components

- **`ContactHero`**: High-fidelity thematic header.
- **`ContactInfoPanel`**: Displays official school contact details (Address, Phone, Email).
- **`ContactForm`**: A secure, validated form with real-time status feedback.
- **`MapSection`**: Integrated Google Maps iframe with customized institutional styling.

## 3. Communication Flow (POST)

1.  **Frontend Submission**: The `ContactForm` gathers user data and sends an asynchronous `POST` request to `/api/contact` using `fetch`.
2.  **API Validation**:
    - Checks for required fields (Name, Email, Subject, Message).
    - Validates email format using regex.
3.  **Database Storage**: Validated messages are passed to `InboxService` which inserts a new row into the `inbox` table in Turso.
4.  **Response Handling**:
    - **200 OK**: Form is reset, and a success message is displayed to the user.
    - **400/500 Error**: An appropriate error message is displayed without clearing the form.

## 4. Data Schema (`inbox` table)

| Column | Type | Purpose |
| :--- | :--- | :--- |
| `name` | Text | Sender's full name. |
| `email` | Text | Sender's contact email. |
| `phone` | Text | Sender's phone number (optional). |
| `subject` | Text | Categorized subject (PPDB, Kerjasama, etc.). |
| `message` | Text | The actual inquiry/message content. |
| `created_at` | Text | Timestamp of submission. |
| `is_read` | Boolean | Read/unread status (for future admin panel). |

## 5. Visual Consistency

- **Interaction**: Buttons feature hover scaling and active state feedback.
- **Design Tokens**: Uses `surface-container-low` for secondary backgrounds and `primary` for high-priority info blocks.
- **Typography**: Matches the site-wide hierarchy (`font-display-lg` for headers, `font-bold uppercase tracking-widest` for labels).
