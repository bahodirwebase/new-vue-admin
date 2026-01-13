// Naive UI theme overrides
export const themeOverrides = {
  common: {
    // Menu item height
    itemHeight: '36px',
    // Sidebar width when expanded
    siderWidth: '240px',
    // Sidebar width when collapsed
    siderCollapsedWidth: '80px',
    // Border radius
    borderRadius: '6px',
    // Font sizes
    fontSize: '14px',
    fontSizeSmall: '12px',
    fontSizeMedium: '14px',
    fontSizeLarge: '16px',
    // Spacing
    paddingSmall: '4px 8px',
    paddingMedium: '8px 12px',
    paddingLarge: '12px 16px',
    // Colors
    primaryColor: '#6366f1',
    primaryColorHover: '#4f5cc7',
    primaryColorPressed: '#4248a6',
    successColor: '#18a058',
    warningColor: '#f0a020',
    errorColor: '#d03050',
    infoColor: '#2080f0',
    // Text colors
    textColorBase: '#000000',
    textColor1: '#ffffff',
    textColor2: '#000000',
    textColor3: '#000000',
    // Background colors
    backgroundColor1: '#ffffff',
    backgroundColor2: '#fafafa',
    backgroundColor3: '#ffffff',
    // Border colors
    borderColor: '#e0e0e0',
    dividerColor: '#f0f0f0'
  },
  light: {
    // Light theme specific overrides
    itemColorHover: '#f6f6f6',
    itemColorActive: '#6366f1',
    siderColor: '#ffffff',
    siderBorderColor: '#e0e0e0',
    menuColor: '#ffffff',
    menuGroupTextColor: '#666666',
    // Override item height specifically
    itemHeight: '36px'
  },
  dark: {
    // Dark theme specific overrides
    itemColorHover: '#2a2a2a',
    itemColorActive: '#6366f1',
    siderColor: '#18181c',
    siderBorderColor: '#2a2a2a',
    menuColor: '#18181c',
    menuGroupTextColor: '#999999',
    // Override item height specifically
    itemHeight: '36px'
  },
  // Component specific overrides
  Menu: {
    itemHeight: '36px',
    itemColor: '#000000',
    itemIconColor: '#666666',
    itemTextColor: '#000000',
    itemColorHover: '#f6f6f6',
    itemColorActive: '#6366f1',
    itemIconColorHover: '#6366f1',
    itemTextColorHover: '#000000',
    itemIconColorActive: '#6366f1',
    itemTextColorActive: '#ffffff',
    arrowColor: '#666666',
    arrowColorHover: '#6366f1',
    arrowColorActive: '#6366f1',
    groupTextColor: '#666666',
    horizBorderColor: '#e0e0e0'
  },
  Layout: {
    siderColor: '#ffffff',
    siderBorderColor: '#e0e0e0',
    siderTextColor: '#000000'
  }
}

export default themeOverrides
