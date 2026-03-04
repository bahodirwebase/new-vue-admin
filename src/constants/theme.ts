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
