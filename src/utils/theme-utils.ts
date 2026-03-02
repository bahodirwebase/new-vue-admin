import type { GlobalThemeOverrides } from "naive-ui";

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
 *
 * @param primaryColor - Hex color string used as the brand accent color
 * @param isDark - Whether to generate dark mode overrides (default: false)
 * @returns Naive UI GlobalThemeOverrides object
 */
export const createThemeOverrides = (
  primaryColor: string,
  isDark: boolean = false,
): GlobalThemeOverrides => {
  const base = isDark
    ? {
      common: {
        primaryColor,
        primaryColorHover: adjustColor(primaryColor, 20),
        primaryColorPressed: adjustColor(primaryColor, -20),
        primaryColorSuppl: primaryColor,
        borderRadius: "8px",
        fontSize: "14px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        popoverColor: '#1a1a1a'
      },
      Card: {
        borderRadius: "12px",
        paddingMedium: "20px",
        color: "#1e293b",
        textColor: "#f8fafc",
      },
      Layout: {
        color: "#0f172a",
        headerColor: "#1e293b",
        siderColor: "#1e293b",
        footerColor: "#1e293b",
      },
      Menu: {
        borderRadius: "8px",
        itemColorActive: primaryColor,
        itemColorActiveHover: adjustColor(primaryColor, 20),
        itemColorHover: "rgba(99, 102, 241, 0.1)",
        itemHeight: "40px",
        itemTextColorActive: "#fff",
        itemIconColorActive: "#fff",
        itemIconColorActiveHover: "#fff",
        itemTextColorActiveHover: "#fff",
        // Collapsed (mini) sidebar active item
        itemColorActiveCollapsed: primaryColor
      },
      Descriptions: {
        thColor: "var(--bg-primary)",
        thColorModal: "#262626",
        tdColor: "var(--bg-secondary)",
        tdColorModal: "#1a1a1a",
        tdColorStriped: "var(--bg-secondary)",
        borderColor: "#333333",
      },
      InternalSelectMenu: {
        color: "#1e293b",
        optionTextColor: "#e2e8f0",
        optionTextColorActive: "#ffffff",
        optionColorPending: "rgba(255, 255, 255, 0.08)",
        borderRadius: "8px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)"
      },
      Dropdown: {
        color: "#1e293b",
        optionTextColor: "#e2e8f0",
        optionTextColorHover: "#ffffff",
        optionColorHover: "rgba(255, 255, 255, 0.08)",
        borderRadius: "8px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)"
      },
      Popover: {
        color: "#1e293b",
        textColor: "#e2e8f0",
        borderRadius: "8px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)"
      },
      DatePicker: {
        panelColor: "#1e293b",
        panelTextColor: "#e2e8f0",
        calendarDaysTextColor: "#e2e8f0",
        itemTextColor: "#e2e8f0",
        itemColorHover: "rgba(255, 255, 255, 0.08)",
        borderRadius: "8px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)"
      },
      TreeSelect: {
        menuColor: "#1e293b",
        menuBoxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)",
        menuBorderRadius: "8px",
        itemTextColor: "#e2e8f0",
        itemColorHover: "rgba(255, 255, 255, 0.08)"
      },
      Tree: {
        nodeTextColor: "#e2e8f0",
        nodeColorHover: "rgba(255, 255, 255, 0.08)",
        nodeColorPressed: "rgba(255, 255, 255, 0.12)",
        nodeColorActive: "rgba(255, 255, 255, 0.12)"
      },
      Cascader: {
        menuColor: "#1e293b",
        menuBoxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)",
        menuBorderRadius: "8px",
        optionTextColor: "#e2e8f0",
        optionColorHover: "rgba(255, 255, 255, 0.08)"
      },
      Tooltip: {
        color: "#1e293b",
        textColor: "#e2e8f0",
        borderRadius: "4px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)"
      },
      Slider: {
        indicatorColor: "#1e293b",
        indicatorTextColor: "#e2e8f0",
        indicatorBoxShadow: "0 2px 8px 0px rgba(0, 0, 0, 0.12)",
        indicatorBorderRadius: "4px"
      },
      Avatar: {
        color: "#1e293b",
        textColor: "#e2e8f0"
      },
      Dialog: {
        color: "#1e293b",
        textColor: "#e2e8f0",
        titleTextColor: "#f8fafc",
        borderRadius: "16px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15)"
      },
      DataTable: {
        thColor: "var(--bg-secondary)",
        tdColor: "var(--bg-primary)",
        tdColorHover: "var(--bg-secondary)",
        tdColorStriped: "var(--bg-secondary)",
        thTextColor: "#e5e7eb",
        tdTextColor: "#d1d5db",
        borderColor: "var(--bg-secondary)",
        thColorHover: "#2a2a2a",
        paginationBorderColor: "#333333",
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
        primaryColorHover: adjustColor(primaryColor, 20),
        primaryColorPressed: adjustColor(primaryColor, -20),
        primaryColorSuppl: primaryColor,
        borderRadius: "8px",
        fontSize: "14px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      },
      Card: {
        borderRadius: "12px",
        paddingMedium: "20px",
        color: "#ffffff",
        textColor: "#0f172a",
      },
      Layout: {
        color: "#f8fafc",
        headerColor: "#ffffff",
        siderColor: "#ffffff",
        footerColor: "#ffffff",
      },
      Menu: {
        borderRadius: "8px",
        itemColorActive: primaryColor,
        itemColorActiveHover: adjustColor(primaryColor, 20),
        itemColorHover: "rgba(99, 102, 241, 0.1)",
        itemHeight: "40px",
        itemTextColorActive: "#fff",
        itemIconColorActive: "#fff",
        itemIconColorActiveHover: "#fff",
        itemTextColorActiveHover: "#fff",
        // Collapsed (mini) sidebar active item
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
