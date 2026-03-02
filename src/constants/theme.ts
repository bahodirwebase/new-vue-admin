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

/**
 * Semantic color palette — matches the CSS variables defined in src/styles/variables.css.
 * Used as the JS source of truth for Naive UI theme overrides (see theme-utils.ts).
 * When changing a color here, update the corresponding CSS variable too.
 */
export const SEMANTIC_COLORS = {
  success: '#10b981',
  warning: '#f59e0b',
  error:   '#ef4444',
  info:    '#3b82f6'
} as const

/**
 * Dark-mode surface colors used in Naive UI component overrides (theme-utils.ts).
 * These match the [data-theme="dark"] values in src/styles/variables.css.
 */
export const DARK_COLORS = {
  /** Page / layout background */
  bgBody:    '#0f172a',
  /** Card / panel background */
  bgCard:    '#1e293b',
  /** Elevated surface (header, popover, etc.) */
  bgSurface: '#1e293b',
  /** Table header background */
  bgTableHeader: '#1a2234',

  textPrimary:   '#f8fafc',
  textSecondary: '#e2e8f0',
  textMuted:     '#cbd5e1',

  border: '#334155',

  /** Hover overlay on dark surfaces */
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
