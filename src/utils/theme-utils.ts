import type { GlobalThemeOverrides } from "naive-ui";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/theme";

/**
 * Converts a hex color string to an RGB object.
 *
 * @param hex - Hex color string with or without leading '#'
 * @returns Object with r, g, b number properties, or null if parsing fails
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
};

/**
 * Applies an alpha channel to a hex color, returning an rgba() string.
 *
 * @param color - Hex color string (e.g., '#6366f1')
 * @param opacity - Opacity value between 0 and 1
 * @returns rgba() CSS color string, or the original value if parsing fails
 */
export const withOpacity = (color: string, opacity: number): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

/**
 * Adjusts the brightness of a hex color by adding a fixed amount to each RGB channel.
 * Positive values lighten the color; negative values darken it.
 * Channel values are clamped to the [0, 255] range.
 *
 * @param color - Hex color string (e.g., '#6366f1')
 * @param amount - Integer amount to add to each RGB channel (-255 to 255)
 * @returns Adjusted hex color string
 *
 * @example
 * adjustColor('#6366f1', 20)   // returns a lighter variant
 * adjustColor('#6366f1', -20)  // returns a darker variant
 */
export const adjustColor = (color: string, amount: number): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

/**
 * Creates Naive UI theme overrides based on the given primary color and mode.
 * Covers common components: Card, Layout, Menu, DataTable, Dialog, Dropdown, etc.
 * Surface colors are sourced from DARK_COLORS / LIGHT_COLORS in src/constants/theme.ts,
 * which mirror the CSS variables defined in src/styles/variables.css.
 *
 * @param primaryColor - Hex color string used as the brand accent color
 * @param isDark - Whether to generate dark mode overrides (default: false)
 * @returns Naive UI GlobalThemeOverrides object
 */
export const createThemeOverrides = (
  primaryColor: string,
  isDark: boolean = false,
): GlobalThemeOverrides => {
  const hoverColor = adjustColor(primaryColor, 20);
  const pressedColor = adjustColor(primaryColor, -20);
  const menuHover = withOpacity(primaryColor, 0.1);

  const base = isDark
    ? {
      common: {
        primaryColor,
        primaryColorHover: hoverColor,
        primaryColorPressed: pressedColor,
        primaryColorSuppl: primaryColor,
        borderRadius: "8px",
        fontSize: "14px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        popoverColor: DARK_COLORS.bgCard
      },
      Card: {
        borderRadius: "12px",
        paddingMedium: "20px",
        color: DARK_COLORS.bgCard,
        textColor: DARK_COLORS.textPrimary,
      },
      Layout: {
        color: DARK_COLORS.bgBody,
        headerColor: DARK_COLORS.bgSurface,
        siderColor: DARK_COLORS.bgSurface,
        footerColor: DARK_COLORS.bgSurface,
      },
      Menu: {
        borderRadius: "8px",
        itemColorActive: primaryColor,
        itemColorActiveHover: hoverColor,
        itemColorHover: menuHover,
        itemHeight: "40px",
        itemTextColorActive: "#fff",
        itemIconColorActive: "#fff",
        itemIconColorActiveHover: "#fff",
        itemTextColorActiveHover: "#fff",
        itemColorActiveCollapsed: primaryColor
      },
      Descriptions: {
        thColor: "var(--bg-primary)",
        thColorModal: DARK_COLORS.bgTableHeader,
        tdColor: "var(--bg-secondary)",
        tdColorModal: DARK_COLORS.bgCard,
        tdColorStriped: "var(--bg-secondary)",
        borderColor: DARK_COLORS.border,
      },
      InternalSelectMenu: {
        color: DARK_COLORS.bgCard,
        optionTextColor: DARK_COLORS.textSecondary,
        optionTextColorActive: "#ffffff",
        optionColorPending: DARK_COLORS.hoverOverlay,
        borderRadius: "8px",
        boxShadow: DARK_COLORS.shadowMd
      },
      Dropdown: {
        color: DARK_COLORS.bgCard,
        optionTextColor: DARK_COLORS.textSecondary,
        optionTextColorHover: "#ffffff",
        optionColorHover: DARK_COLORS.hoverOverlay,
        borderRadius: "8px",
        boxShadow: DARK_COLORS.shadowMd
      },
      Popover: {
        color: DARK_COLORS.bgCard,
        textColor: DARK_COLORS.textSecondary,
        borderRadius: "8px",
        boxShadow: DARK_COLORS.shadowMd
      },
      DatePicker: {
        panelColor: DARK_COLORS.bgCard,
        panelTextColor: DARK_COLORS.textSecondary,
        calendarDaysTextColor: DARK_COLORS.textSecondary,
        itemTextColor: DARK_COLORS.textSecondary,
        itemColorHover: DARK_COLORS.hoverOverlay,
        borderRadius: "8px",
        boxShadow: DARK_COLORS.shadowMd
      },
      TreeSelect: {
        menuColor: DARK_COLORS.bgCard,
        menuBoxShadow: DARK_COLORS.shadowMd,
        menuBorderRadius: "8px",
        itemTextColor: DARK_COLORS.textSecondary,
        itemColorHover: DARK_COLORS.hoverOverlay
      },
      Tree: {
        nodeTextColor: DARK_COLORS.textSecondary,
        nodeColorHover: DARK_COLORS.hoverOverlay,
        nodeColorPressed: DARK_COLORS.pressedOverlay,
        nodeColorActive: DARK_COLORS.pressedOverlay
      },
      Cascader: {
        menuColor: DARK_COLORS.bgCard,
        menuBoxShadow: DARK_COLORS.shadowMd,
        menuBorderRadius: "8px",
        optionTextColor: DARK_COLORS.textSecondary,
        optionColorHover: DARK_COLORS.hoverOverlay
      },
      Tooltip: {
        color: DARK_COLORS.bgCard,
        textColor: DARK_COLORS.textSecondary,
        borderRadius: "4px",
        boxShadow: DARK_COLORS.shadowMd
      },
      Slider: {
        indicatorColor: DARK_COLORS.bgCard,
        indicatorTextColor: DARK_COLORS.textSecondary,
        indicatorBoxShadow: "0 2px 8px 0px rgba(0, 0, 0, 0.12)",
        indicatorBorderRadius: "4px"
      },
      Avatar: {
        color: DARK_COLORS.bgCard,
        textColor: DARK_COLORS.textSecondary
      },
      Dialog: {
        color: DARK_COLORS.bgCard,
        textColor: DARK_COLORS.textSecondary,
        titleTextColor: DARK_COLORS.textPrimary,
        borderRadius: "16px",
        boxShadow: DARK_COLORS.shadowXl
      },
      DataTable: {
        thColor: "var(--bg-secondary)",
        tdColor: "var(--bg-primary)",
        tdColorHover: "var(--bg-secondary)",
        tdColorStriped: "var(--bg-secondary)",
        thTextColor: DARK_COLORS.textMuted,
        tdTextColor: DARK_COLORS.textSecondary,
        borderColor: "var(--bg-secondary)",
        thColorHover: DARK_COLORS.bgTableHeader,
        paginationBorderColor: DARK_COLORS.border,
        loadingColor: "#60a5fa",
      },
      Checkbox: {
        color: 'var(--bg-primary)',
        colorTableHeader: 'var(--bg-primary)',
      }
    }
    : {
      common: {
        primaryColor,
        primaryColorHover: hoverColor,
        primaryColorPressed: pressedColor,
        primaryColorSuppl: primaryColor,
        borderRadius: "8px",
        fontSize: "14px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      },
      Card: {
        borderRadius: "12px",
        paddingMedium: "20px",
        color: LIGHT_COLORS.bgCard,
        textColor: LIGHT_COLORS.textPrimary,
      },
      Layout: {
        color: LIGHT_COLORS.bgBody,
        headerColor: LIGHT_COLORS.bgSurface,
        siderColor: LIGHT_COLORS.bgSurface,
        footerColor: LIGHT_COLORS.bgSurface,
      },
      Menu: {
        borderRadius: "8px",
        itemColorActive: primaryColor,
        itemColorActiveHover: hoverColor,
        itemColorHover: menuHover,
        itemHeight: "40px",
        itemTextColorActive: "#fff",
        itemIconColorActive: "#fff",
        itemIconColorActiveHover: "#fff",
        itemTextColorActiveHover: "#fff",
        itemColorActiveCollapsed: primaryColor,
      },
    };

  return base;
};

/**
 * Creates a comprehensive Naive UI theme with additional component overrides
 * beyond the base set. Extends createThemeOverrides with Button, Input, Select,
 * Tabs, Tag, Modal, Message, and Notification customizations.
 *
 * @param primaryColor - Hex color string used as the brand accent color
 * @param isDark - Whether to generate dark mode overrides (default: false)
 * @returns Extended Naive UI GlobalThemeOverrides object
 */
export const createDynamicTheme = (
  primaryColor: string,
  isDark: boolean = false,
): GlobalThemeOverrides => {
  const baseTheme = createThemeOverrides(primaryColor, isDark);

  return {
    ...baseTheme,
    Button: {
      borderRadius: "8px",
      heightMedium: "40px",
      heightLarge: "48px",
      fontSizeMedium: "14px",
      fontSizeLarge: "16px",
    },
    Input: {
      borderRadius: "8px",
      heightMedium: "40px",
      heightLarge: "48px",
      fontSizeMedium: "14px",
      fontSizeLarge: "16px",
    },
    Select: {
      borderRadius: "8px",
      heightMedium: "40px",
      heightLarge: "48px",
      fontSizeMedium: "14px",
      fontSizeLarge: "16px",
    },
    Tabs: {
      tabGapLarge: "24px",
      tabGapMedium: "20px",
      tabPaddingLarge: "0 24px",
      tabPaddingMedium: "0 20px",
      tabFontSizeLarge: "16px",
      tabFontSizeMedium: "14px",
      tabColorSegment: `${primaryColor}1a`,
    },
    Tag: {
      borderRadius: "20px",
      heightMedium: "32px",
      heightLarge: "36px",
      fontSizeMedium: "12px",
      fontSizeLarge: "14px",
    },
    Modal: {
      borderRadius: "16px",
      titleFontSize: "18px",
      headerPadding: "20px 24px 16px",
      bodyPadding: "24px",
    },
    Message: {
      borderRadius: "8px",
      fontSize: "14px",
      padding: "12px 16px",
    },
    Notification: {
      borderRadius: "8px",
      fontSize: "14px",
      padding: "16px",
    },
  };
};

/**
 * Deep-merges a set of partial overrides into an existing theme object.
 * Handles nested merging for common component override keys.
 *
 * @param baseTheme - The base theme overrides to extend
 * @param overrides - Partial overrides to merge on top of the base
 * @returns Merged GlobalThemeOverrides object
 */
export const applyThemeOverrides = (
  baseTheme: GlobalThemeOverrides,
  overrides: Partial<GlobalThemeOverrides>,
): GlobalThemeOverrides => {
  return {
    ...baseTheme,
    ...overrides,
    common: { ...baseTheme.common, ...overrides.common },
    Card: { ...baseTheme.Card, ...overrides.Card },
    Layout: { ...baseTheme.Layout, ...overrides.Layout },
    Menu: { ...baseTheme.Menu, ...overrides.Menu },
    Button: { ...baseTheme.Button, ...overrides.Button },
    Input: { ...baseTheme.Input, ...overrides.Input },
    Select: { ...baseTheme.Select, ...overrides.Select },
    Tabs: { ...baseTheme.Tabs, ...overrides.Tabs },
    Tag: { ...baseTheme.Tag, ...overrides.Tag },
    Modal: { ...baseTheme.Modal, ...overrides.Modal },
    Message: { ...baseTheme.Message, ...overrides.Message },
    Notification: { ...baseTheme.Notification, ...overrides.Notification },
  };
};

/**
 * Generates both light and dark theme variants for a given primary color.
 * Useful for pre-computing theme objects when the mode may switch at runtime.
 *
 * @param primaryColor - Hex color string used as the brand accent color
 * @returns Object with `light` and `dark` GlobalThemeOverrides
 */
export const generateThemeVariants = (primaryColor: string) => {
  return {
    light: createDynamicTheme(primaryColor, false),
    dark: createDynamicTheme(primaryColor, true),
  };
};

/**
 * Lightens a hex color by a given percentage.
 *
 * @param color - Hex color string (e.g., '#6366f1')
 * @param percent - Percentage to lighten (0–100)
 * @returns Lightened hex color string
 */
export const lightenColor = (color: string, percent: number): string => {
  return adjustColor(color, Math.round((255 * percent) / 100));
};

/**
 * Darkens a hex color by a given percentage.
 *
 * @param color - Hex color string (e.g., '#6366f1')
 * @param percent - Percentage to darken (0–100)
 * @returns Darkened hex color string
 */
export const darkenColor = (color: string, percent: number): string => {
  return adjustColor(color, -Math.round((255 * percent) / 100));
};
