import type { GlobalThemeOverrides } from "naive-ui";

/** Reads a CSS custom property from :root at call time. */
function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

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
 * Surface colors are read at runtime from CSS custom properties via getCssVar(),
 * so they automatically reflect the active theme without any JS duplication.
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
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI'",
        popoverColor: getCssVar('--bg-secondary')
      },
      Card: {
        borderRadius: "12px",
        paddingMedium: "20px",
        color: getCssVar('--bg-secondary'),
        textColor: getCssVar('--text-primary'),
      },
      Layout: {
        color: getCssVar('--bg-primary'),
        headerColor: getCssVar('--bg-secondary'),
        siderColor: getCssVar('--bg-secondary'),
        footerColor: getCssVar('--bg-secondary'),
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
        thColor: getCssVar('--bg-primary'),
        thColorModal: getCssVar('--bg-table-header'),
        tdColor: getCssVar('--bg-secondary'),
        tdColorModal: getCssVar('--bg-secondary'),
        tdColorStriped: getCssVar('--bg-secondary'),
        borderColor: getCssVar('--border-color'),
      },
      InternalSelectMenu: {
        color: getCssVar('--bg-secondary'),
        optionTextColor: getCssVar('--text-secondary'),
        optionTextColorActive: "#ffffff",
        optionColorPending: getCssVar('--bg-hover'),
        borderRadius: "8px",
        boxShadow: getCssVar('--shadow-md')
      },
      Dropdown: {
        color: getCssVar('--bg-secondary'),
        optionTextColor: getCssVar('--text-secondary'),
        optionTextColorHover: "#ffffff",
        optionColorHover: getCssVar('--bg-hover'),
        borderRadius: "8px",
        boxShadow: getCssVar('--shadow-md')
      },
      Popover: {
        color: getCssVar('--bg-secondary'),
        textColor: getCssVar('--text-secondary'),
        borderRadius: "8px",
        boxShadow: getCssVar('--shadow-md')
      },
      DatePicker: {
        panelColor: getCssVar('--bg-secondary'),
        panelTextColor: getCssVar('--text-secondary'),
        calendarDaysTextColor: getCssVar('--text-secondary'),
        itemTextColor: getCssVar('--text-secondary'),
        itemColorHover: getCssVar('--bg-hover'),
        borderRadius: "8px",
        boxShadow: getCssVar('--shadow-md')
      },
      TreeSelect: {
        menuColor: getCssVar('--bg-secondary'),
        menuBoxShadow: getCssVar('--shadow-md'),
        menuBorderRadius: "8px",
        itemTextColor: getCssVar('--text-secondary'),
        itemColorHover: getCssVar('--bg-hover')
      },
      Tree: {
        nodeTextColor: getCssVar('--text-secondary'),
        nodeColorHover: getCssVar('--bg-hover'),
        nodeColorPressed: getCssVar('--bg-pressed'),
        nodeColorActive: getCssVar('--bg-pressed')
      },
      Cascader: {
        menuColor: getCssVar('--bg-secondary'),
        menuBoxShadow: getCssVar('--shadow-md'),
        menuBorderRadius: "8px",
        optionTextColor: getCssVar('--text-secondary'),
        optionColorHover: getCssVar('--bg-hover')
      },
      Tooltip: {
        color: getCssVar('--bg-secondary'),
        textColor: getCssVar('--text-secondary'),
        borderRadius: "4px",
        boxShadow: getCssVar('--shadow-md')
      },
      Slider: {
        indicatorColor: getCssVar('--bg-secondary'),
        indicatorTextColor: getCssVar('--text-secondary'),
        indicatorBoxShadow: "0 2px 8px 0px rgba(0, 0, 0, 0.12)",
        indicatorBorderRadius: "4px"
      },
      Avatar: {
        color: getCssVar('--bg-secondary'),
        textColor: getCssVar('--text-secondary')
      },
      Dialog: {
        color: getCssVar('--bg-secondary'),
        textColor: getCssVar('--text-secondary'),
        titleTextColor: getCssVar('--text-primary'),
        borderRadius: "16px",
        boxShadow: getCssVar('--shadow-xl')
      },
      DataTable: {
        thColor: getCssVar('--bg-secondary'),
        tdColor: getCssVar('--bg-primary'),
        tdColorHover: getCssVar('--bg-secondary'),
        tdColorStriped: getCssVar('--bg-secondary'),
        thTextColor: getCssVar('--text-tertiary'),
        tdTextColor: getCssVar('--text-secondary'),
        borderColor: getCssVar('--bg-secondary'),
        thColorHover: getCssVar('--bg-table-header'),
        paginationBorderColor: getCssVar('--border-color'),
        loadingColor: "#60a5fa",
      },
      Checkbox: {
        color: getCssVar('--bg-primary'),
        colorTableHeader: getCssVar('--bg-primary'),
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
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      },
      Card: {
        borderRadius: "12px",
        paddingMedium: "20px",
        color: getCssVar('--bg-primary'),
        textColor: getCssVar('--text-primary'),
      },
      Layout: {
        color: getCssVar('--bg-secondary'),
        headerColor: getCssVar('--bg-primary'),
        siderColor: getCssVar('--bg-primary'),
        footerColor: getCssVar('--bg-primary'),
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
