/**
 * Theme Engine Utility — Smart Contrast + Derived Semantic Token System
 * 
 * Generates a full Material Design 3 CSS variable map from the 10 CMS base colors.
 * Uses WCAG luminance calculations to guarantee readable text, safe hover states,
 * and visually stable UI regardless of admin color choices.
 */

// ===== Color Utility Functions =====

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const c = (hex || '#000000').replace('#', '');
  return {
    r: parseInt(c.substring(0, 2), 16) || 0,
    g: parseInt(c.substring(2, 4), 16) || 0,
    b: parseInt(c.substring(4, 6), 16) || 0,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('');
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastText(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  return getLuminance(r, g, b) > 0.4 ? '#1a1b21' : '#ffffff';
}

function lighten(hex: string, pct: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    Math.min(255, r + (255 - r) * pct / 100),
    Math.min(255, g + (255 - g) * pct / 100),
    Math.min(255, b + (255 - b) * pct / 100)
  );
}

function darken(hex: string, pct: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    Math.max(0, r * (1 - pct / 100)),
    Math.max(0, g * (1 - pct / 100)),
    Math.max(0, b * (1 - pct / 100))
  );
}

function isDark(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  return getLuminance(r, g, b) <= 0.35;
}

// ===== Main Token Generator =====

export function generateThemeTokens(profile: any) {
  // 10 Human Color Controls from DB
  const primary = profile.themeColorPrimary || '#00288e';
  const background = profile.themeColorBackground || '#f8fafc';
  const surface = profile.themeColorSurface || '#ffffff';
  const text = profile.themeColorText || '#334155';
  const heading = profile.themeColorHeading || '#0f172a';
  const link = profile.themeColorLink || '#00288e';
  const linkHover = profile.themeColorLinkHover || '#001a5c';
  const border = profile.themeColorBorder || '#e2e8f0';
  const accent = profile.themeColorAccent || '#3b82f6';
  const badge = profile.themeColorBadge || '#eff6ff';

  // ---- Smart Contrast Derivations ----
  const onPrimary = getContrastText(primary);
  const onAccent = getContrastText(accent);
  const onBadge = getContrastText(badge);
  const bgIsDark = isDark(background);

  // ---- PRIMARY family ----
  const primaryContainer = darken(primary, 15);
  const onPrimaryContainer = lighten(primary, 60);
  const primarySoft = lighten(primary, 85);
  const primaryHover = isDark(primary) ? lighten(primary, 15) : darken(primary, 15);

  // ---- SECONDARY family (accent-driven) ----
  const secondaryContainer = accent;
  const onSecondaryContainer = onAccent;
  const secondaryFixed = lighten(accent, 70);
  const secondaryFixedDim = lighten(accent, 50);
  const onSecondaryFixed = getContrastText(secondaryFixed);
  const onSecondaryFixedVariant = darken(accent, 30);

  // ---- TERTIARY family (hue-shifted from primary) ----
  const { r, g, b } = hexToRgb(primary);
  const tertiary = rgbToHex(Math.min(255, r + 60), Math.max(0, g - 20), Math.min(255, b + 30));
  const onTertiary = getContrastText(tertiary);
  const tertiaryContainer = darken(tertiary, 15);
  const onTertiaryContainer = lighten(tertiary, 60);
  const tertiaryFixed = lighten(tertiary, 70);
  const tertiaryFixedDim = lighten(tertiary, 50);
  const onTertiaryFixed = getContrastText(tertiaryFixed);
  const onTertiaryFixedVariant = darken(tertiary, 30);

  // ---- SURFACE CONTAINERS (5-level system) ----
  const surfaceLowest = bgIsDark ? lighten(background, 4) : '#ffffff';
  const surfaceLow = bgIsDark ? lighten(background, 6) : darken(background, 2);
  const surfaceContainer = bgIsDark ? lighten(background, 9) : darken(background, 4);
  const surfaceHigh = bgIsDark ? lighten(background, 12) : darken(background, 6);
  const surfaceHighest = bgIsDark ? lighten(background, 16) : darken(background, 9);
  const surfaceVariant = bgIsDark ? lighten(background, 14) : darken(background, 8);
  const inverseSurface = bgIsDark ? lighten(background, 80) : darken(background, 80);
  const inverseOnSurface = getContrastText(inverseSurface);

  // ---- OUTLINE family ----
  const outline = bgIsDark ? lighten(border, 30) : darken(border, 20);
  const outlineVariant = border;

  return {
    // ===== PRIMARY =====
    '--theme-primary': primary,
    '--theme-on-primary': onPrimary,
    '--theme-primary-container': primaryContainer,
    '--theme-on-primary-container': onPrimaryContainer,
    '--theme-primary-soft': primarySoft,
    '--theme-primary-hover': primaryHover,
    '--theme-on-primary-fixed': getContrastText(primarySoft),
    '--theme-on-primary-fixed-variant': darken(primary, 20),
    '--theme-inverse-primary': lighten(primary, 70),

    // ===== SECONDARY (Accent) =====
    '--theme-secondary': accent,
    '--theme-on-secondary': onAccent,
    '--theme-secondary-container': secondaryContainer,
    '--theme-on-secondary-container': onSecondaryContainer,
    '--theme-secondary-fixed': secondaryFixed,
    '--theme-secondary-fixed-dim': secondaryFixedDim,
    '--theme-on-secondary-fixed': onSecondaryFixed,
    '--theme-on-secondary-fixed-variant': onSecondaryFixedVariant,

    // ===== TERTIARY =====
    '--theme-tertiary': tertiary,
    '--theme-on-tertiary': onTertiary,
    '--theme-tertiary-container': tertiaryContainer,
    '--theme-on-tertiary-container': onTertiaryContainer,
    '--theme-tertiary-fixed': tertiaryFixed,
    '--theme-tertiary-fixed-dim': tertiaryFixedDim,
    '--theme-on-tertiary-fixed': onTertiaryFixed,
    '--theme-on-tertiary-fixed-variant': onTertiaryFixedVariant,

    // ===== ERROR =====
    '--theme-error': '#ba1a1a',
    '--theme-on-error': '#ffffff',
    '--theme-error-container': '#ffdad6',
    '--theme-on-error-container': '#93000a',

    // ===== SURFACES =====
    '--theme-background': background,
    '--theme-on-background': heading,
    '--theme-surface': background,
    '--theme-on-surface': heading,
    '--theme-surface-variant': surfaceVariant,
    '--theme-on-surface-variant': text,
    '--theme-inverse-surface': inverseSurface,
    '--theme-inverse-on-surface': inverseOnSurface,

    // ===== SURFACE CONTAINERS =====
    '--theme-surface-container-lowest': surfaceLowest,
    '--theme-surface-container-low': surfaceLow,
    '--theme-surface-container': surfaceContainer,
    '--theme-surface-container-high': surfaceHigh,
    '--theme-surface-container-highest': surfaceHighest,

    // ===== OUTLINES =====
    '--theme-outline': outline,
    '--theme-outline-variant': outlineVariant,

    // ===== TYPOGRAPHY =====
    '--theme-font-base': `"${profile.themeFontFamily || 'Plus Jakarta Sans'}", sans-serif`,

    // ===== RADIUS =====
    '--theme-radius-none': '0',
    '--theme-radius-sm': profile.themeRadius === 'none' ? '0' : '0.125rem',
    '--theme-radius-DEFAULT': profile.themeRadius === 'none' ? '0' : profile.themeRadius === 'sm' ? '0.25rem' : profile.themeRadius === 'lg' ? '0.75rem' : profile.themeRadius === 'xl' ? '1rem' : '0.375rem',
    '--theme-radius-md': profile.themeRadius === 'none' ? '0' : profile.themeRadius === 'sm' ? '0.375rem' : profile.themeRadius === 'lg' ? '1rem' : profile.themeRadius === 'xl' ? '1.5rem' : '0.5rem',
    '--theme-radius-lg': profile.themeRadius === 'none' ? '0' : profile.themeRadius === 'sm' ? '0.5rem' : profile.themeRadius === 'lg' ? '1.5rem' : profile.themeRadius === 'xl' ? '2rem' : '0.75rem',
    '--theme-radius-xl': profile.themeRadius === 'none' ? '0' : profile.themeRadius === 'sm' ? '0.75rem' : profile.themeRadius === 'lg' ? '2rem' : profile.themeRadius === 'xl' ? '3rem' : '1rem',
    '--theme-radius-full': profile.themeRadius === 'none' ? '0' : '9999px',

    // ===== SHADOWS =====
    '--theme-shadow-sm': profile.themeShadowLevel === 'none' ? 'none' : '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '--theme-shadow-DEFAULT': profile.themeShadowLevel === 'none' ? 'none' : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '--theme-shadow-md': profile.themeShadowLevel === 'none' ? 'none' : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '--theme-shadow-lg': profile.themeShadowLevel === 'none' ? 'none' : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

    // ===== EXTENDED SAFE TOKENS =====
    '--theme-color-link': link,
    '--theme-color-link-hover': linkHover,
    '--theme-color-badge': badge,
    '--theme-muted-text': bgIsDark ? lighten(text, 40) : text,
    '--theme-soft-accent-bg': bgIsDark ? darken(accent, 70) : lighten(accent, 85),
    '--theme-soft-primary-bg': bgIsDark ? darken(primary, 70) : lighten(primary, 85),
    '--theme-hover-heading-safe': bgIsDark ? lighten(heading, 20) : darken(heading, 20),
    '--theme-hover-link-safe': bgIsDark ? lighten(link, 20) : darken(link, 20),
    '--theme-hover-primary-safe': primaryHover,
  };
}
