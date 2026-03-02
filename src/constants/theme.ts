export const THEME_CONSTANTS = {
  DEFAULT_PRIMARY_COLOR: '#6366f1' as const,
  BREAKPOINTS: {
    xxs: 375,
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
    xxl: 1600
  },
  SIDEBAR: {
    COLLAPSED_WIDTH: 80,
    EXPANDED_WIDTH: 240,
    MOBILE_WIDTH: 240
  },
  HEADER: {
    HEIGHT: 64
  },
  ANIMATION: {
    DURATION: {
      FAST: 150,
      NORMAL: 300,
      SLOW: 500
    },
    EASING: {
      EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
      EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)'
    }
  }
} as const

// ─────────────────────────────────────────────────────────────────────────────
// COLOR TOKENS
//
// These are the JS source of truth for all colors.
// The theme store (stores/theme.ts) reads them and applies them to CSS custom
// properties at runtime, keeping theme.ts and variables.css in sync.
//
// To change a color: edit here → CSS updates automatically via the store.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Full color palette with shade steps (50–900).
 * Used in JS/TS contexts: charts, email labels, badge colors, etc.
 * Primary = Indigo (matches DEFAULT_PRIMARY_COLOR).
 * Success/Warning/Error base shades match SEMANTIC_COLORS[500].
 */
export const COLOR_PALETTE = {
  PRIMARY: {
    50:  '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81'
  },
  SUCCESS: {
    50:  '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b'
  },
  WARNING: {
    50:  '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },
  ERROR: {
    50:  '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d'
  }
} as const

/**
 * Semantic colors for UI state feedback (success/warning/error/info).
 * These map 1-to-1 to CSS variables: --color-success, --color-warning, etc.
 * Applied to CSS by the theme store on startup via syncCssTokens().
 */
export const SEMANTIC_COLORS = {
  success: '#10b981',
  warning: '#f59e0b',
  error:   '#ef4444',
  info:    '#3b82f6'
} as const

/**
 * Status indicator colors for connected/active badges (e.g., online dot, label pill).
 * Brighter than SEMANTIC_COLORS; adapt for dark mode.
 * Maps to: --status-success, --status-error, --status-warning.
 * Applied by the theme store on startup and on dark mode toggle.
 */
export const STATUS_COLORS = {
  light: {
    success: '#22c55e',
    error:   '#ef4444',
    warning: '#f59e0b'
  },
  dark: {
    success: '#4ade80',
    error:   '#f87171',
    warning: '#fbbf24'
  }
} as const

/**
 * Dark-mode surface colors used in Naive UI component overrides (theme-utils.ts).
 * These match the [data-theme="dark"] values in src/styles/variables.css.
 */
export const DARK_COLORS = {
  bgBody:        '#0f172a',
  bgCard:        '#1e293b',
  bgSurface:     '#1e293b',
  bgTableHeader: '#1a2234',

  textPrimary:   '#f8fafc',
  textSecondary: '#e2e8f0',
  textMuted:     '#cbd5e1',

  border: '#334155',

  hoverOverlay:   'rgba(255, 255, 255, 0.08)',
  pressedOverlay: 'rgba(255, 255, 255, 0.12)',

  shadowMd: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
  shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15)'
} as const

/**
 * Light-mode surface colors used in Naive UI component overrides (theme-utils.ts).
 * These match the :root values in src/styles/variables.css.
 */
export const LIGHT_COLORS = {
  bgBody:    '#f8fafc',
  bgCard:    '#ffffff',
  bgSurface: '#ffffff',

  textPrimary:   '#0f172a',
  textSecondary: '#475569',

  shadowMd: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
} as const
