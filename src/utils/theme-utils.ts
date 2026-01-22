import type { GlobalThemeOverrides } from "naive-ui";

// Helper function to adjust color brightness
export const adjustColor = (color: string, amount: number): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

// Create theme overrides based on primary color and dark mode
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

          // Minimized state
          itemColorActiveCollapsed: primaryColor,
        },

        Descriptions: {
          thColor: "var(--bg-primary)",
          thColorModal: "#262626",
          tdColor: "var(--bg-secondary)",
          tdColorModal: "#1a1a1a",
          tdColorStriped: "var(--bg-secondary)",
          borderColor: "#333333",
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

          // Minimized state
          itemColorActiveCollapsed: primaryColor,
        },
      };

  return base;
};

// Create dynamic theme with additional components
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

// Apply additional overrides to existing theme
export const applyThemeOverrides = (
  baseTheme: GlobalThemeOverrides,
  overrides: Partial<GlobalThemeOverrides>,
): GlobalThemeOverrides => {
  return {
    ...baseTheme,
    ...overrides,
    common: {
      ...baseTheme.common,
      ...overrides.common,
    },
    Card: {
      ...baseTheme.Card,
      ...overrides.Card,
    },
    Layout: {
      ...baseTheme.Layout,
      ...overrides.Layout,
    },
    Menu: {
      ...baseTheme.Menu,
      ...overrides.Menu,
    },
    Button: {
      ...baseTheme.Button,
      ...overrides.Button,
    },
    Input: {
      ...baseTheme.Input,
      ...overrides.Input,
    },
    Select: {
      ...baseTheme.Select,
      ...overrides.Select,
    },
    Tabs: {
      ...baseTheme.Tabs,
      ...overrides.Tabs,
    },
    Tag: {
      ...baseTheme.Tag,
      ...overrides.Tag,
    },
    Modal: {
      ...baseTheme.Modal,
      ...overrides.Modal,
    },
    Message: {
      ...baseTheme.Message,
      ...overrides.Message,
    },
    Notification: {
      ...baseTheme.Notification,
      ...overrides.Notification,
    },
  };
};

// Generate theme variants for both light and dark modes
export const generateThemeVariants = (primaryColor: string) => {
  return {
    light: createDynamicTheme(primaryColor, false),
    dark: createDynamicTheme(primaryColor, true),
  };
};

// Utility functions for color manipulation
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const withOpacity = (color: string, opacity: number): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

export const lightenColor = (color: string, percent: number): string => {
  return adjustColor(color, Math.round((255 * percent) / 100));
};

export const darkenColor = (color: string, percent: number): string => {
  return adjustColor(color, -Math.round((255 * percent) / 100));
};
