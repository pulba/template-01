---
name: Institutional Modern
colors:
  surface: '#faf8ff'
  surface-dim: '#dad9e1'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3fa'
  surface-container: '#eeedf4'
  surface-container-high: '#e9e7ef'
  surface-container-highest: '#e3e1e9'
  on-surface: '#1a1b21'
  on-surface-variant: '#444651'
  inverse-surface: '#2f3036'
  inverse-on-surface: '#f1f0f7'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#4b1c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e2c00'
  on-tertiary-container: '#f39461'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#773205'
  background: '#faf8ff'
  on-background: '#1a1b21'
  surface-variant: '#e3e1e9'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 3.75rem
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.5rem
  h2:
    fontFamily: Inter
    fontSize: 1.875rem
    fontWeight: '600'
    lineHeight: 2.25rem
  h3:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
  body-lg:
    fontFamily: Public Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Public Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  label-sm:
    fontFamily: Public Sans
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  gutter: 1.5rem
  margin: 2rem
  max-width: 1280px
---

## Brand & Style

The brand personality for this design system is defined by academic prestige, reliability, and modern accessibility. It aims to evoke a sense of tradition and institutional strength while remaining approachable and lightweight for a diverse user base of students, faculty, and parents. 

The design style follows a **Corporate / Modern** aesthetic with strong **Minimalist** influences. It prioritizes clarity through generous whitespace and a structured information hierarchy. The visual language balances the "formal" nature of a school through structured grids and deep blue tones with "lightweight" accessibility through soft shadows and vibrant accents. This ensures the interface feels established yet technologically forward-thinking.

## Colors

The color palette is rooted in a "Deep School Blue" that provides an immediate sense of authority and calm. This is complemented by a "Vibrant Yellow-Orange" reserved exclusively for high-priority calls to action and interactive highlights, ensuring they stand out against the more conservative base.

The neutral palette utilizes cool-toned grays and clean whites to maintain a crisp, institutional feel. Backgrounds should primarily use a very soft gray (#f8fafc) to reduce eye strain and differentiate from the pure white (#ffffff) used for elevated card surfaces. Text contrast is strictly maintained for WCAG accessibility standards, using a near-black slate for primary content and a medium gray for metadata and secondary labels.

## Typography

This design system employs a dual-font strategy to balance impact with legibility. **Inter** is utilized for all headings and display elements; its geometric precision and bold weights provide the necessary modern-academic punch. To maintain high readability across dense campus information, **Public Sans** is used for all body text, lists, and UI labels. Public Sans is chosen for its institutional heritage and exceptional clarity in digital interfaces.

Headings should use tighter tracking to feel cohesive, while body text uses standard spacing to ensure ease of reading for long-form educational content. Paragraphs should be limited to comfortable line lengths to maximize comprehension.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for desktop, centered within a maximum width of 1280px to prevent excessive line lengths. The underlying rhythm is built on an 8px base unit, ensuring consistent vertical and horizontal cadence.

A 12-column system is used for page construction, allowing for versatile card arrangements (e.g., three-column feature grids or two-column "Content & Sidebar" layouts). Spacing between cards (gutters) is set to 24px (1.5rem) to provide "plenty of whitespace," reinforcing the lightweight and airy feel of the system. Inner card padding should match the gutter size to create visual harmony.

## Elevation & Depth

Visual hierarchy is established using **Tonal Layers** and **Ambient Shadows**. The design system avoids heavy borders in favor of depth through soft shadows that use a slight blue tint (#1e3a8a at 8% opacity) to connect the elevation to the brand color.

Surface levels are defined as follows:
- **Base (Level 0):** Background (#f8fafc), no shadow.
- **Card (Level 1):** White surface with a subtle 4px blur, 2px Y-offset shadow. Used for standard content modules.
- **Interactive/Hover (Level 2):** White surface with an 8px blur, 4px Y-offset shadow. Used when a user interacts with a card.
- **Overlay/Modal (Level 3):** White surface with a 24px blur, 12px Y-offset shadow.

This tiered approach ensures that information is layered logically, making the interface intuitive for academic navigation.

## Shapes

The shape language is defined by **Rounded** corners (Level 2). This specific radius of 0.5rem (8px) for standard components and up to 1.5rem (24px) for large containers ensures the design feels professional and modern without being overly playful or sharp.

Corners are applied consistently across all cards, buttons, and input fields. This softened geometry reduces the "hardness" of the formal institutional blue, making the school's digital presence feel welcoming and accessible to the student body.

## Components

### Buttons
Primary buttons utilize the Deep School Blue with white text. CTA buttons utilize the Vibrant Yellow-Orange with a dark slate text to ensure high visibility and contrast. Buttons should have a height of 44px or 48px to remain touch-friendly and accessible.

### Cards
Cards are the primary container in this design system. They must feature a pure white background, the Level 1 shadow, and 1.5rem internal padding. For academic content, cards may include a subtle 1px border (#e2e8f0) to provide extra definition on high-brightness displays.

### Form Inputs
Input fields use a subtle light gray background and a 1px border. Upon focus, the border transitions to the Deep School Blue with a soft 2px glow. Labels are always positioned above the input in `label-sm` typography for maximum clarity.

### Chips & Badges
Small, rounded chips are used for course categories, status indicators (e.g., "Enrollment Open"), or tags. These use low-opacity tints of the primary blue or secondary orange to keep the UI lightweight.

### Navigation
The main navigation should use a clean, white background with a subtle bottom border or Level 1 shadow. Active links are indicated by a 3px bottom bar in the Deep School Blue, ensuring a clear "you are here" signal.