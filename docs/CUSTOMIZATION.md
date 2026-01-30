# Customization Guide

This comprehensive guide will help you customize Manga Admin Dashboard to match your brand and requirements.

## 🎨 Theme Customization

### Color System

The theme uses CSS variables for easy color customization. You can override these variables in your styles.

#### Primary Colors

```css
:root {
  --primary-color: #6366f1;
  --primary-color-hover: #4f46e5;
  --primary-color-pressed: #4338ca;
  --primary-color-disabled: #a5b4fc;
}
```

#### Semantic Colors

```css
:root {
  /* Success */
  --success-color: #22c55e;
  --success-color-hover: #16a34a;
  --success-color-pressed: #15803d;

  /* Warning */
  --warning-color: #f59e0b;
  --warning-color-hover: #d97706;
  --warning-color-pressed: #b45309;

  /* Error */
  --error-color: #ef4444;
  --error-color-hover: #dc2626;
  --error-color-pressed: #b91c1c;

  /* Info */
  --info-color: #3b82f6;
  --info-color-hover: #2563eb;
  --info-color-pressed: #1d4ed8;
}
```

#### Neutral Colors

```css
:root {
  /* Text Colors */
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;
  --text-disabled: #d1d5db;

  /* Background Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;
  --bg-disabled: #f9fafb;

  /* Border Colors */
  --border-color: #e5e7eb;
  --border-color-hover: #d1d5db;
  --border-color-focus: #6366f1;
}
```

### Dark Mode Colors

```css
[data-theme="dark"] {
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;
  --text-disabled: #6b7280;

  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --bg-tertiary: #374151;
  --bg-disabled: #1f2937;

  --border-color: #374151;
  --border-color-hover: #4b5563;
  --border-color-focus: #6366f1;
}
```

---

## 🎯 Dynamic Theme Configuration

### Using the Theme Store

```typescript
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// Toggle dark mode
themeStore.setDark(true)

// Change primary color
themeStore.setPrimaryColor('#ff6b6b')

// Enable boxed layout
themeStore.setBoxed(true)

// Toggle mini sidebar
themeStore.setMiniSidebar(true)

// Enable bordered theme
themeStore.setBordered(true)
```

### Theme Presets

Create predefined theme presets:

```typescript
// src/constants/themePresets.ts
export const THEME_PRESETS = {
  blue: {
    primary: '#3b82f6',
    name: 'Ocean Blue'
  },
  green: {
    primary: '#10b981',
    name: 'Forest Green'
  },
  purple: {
    primary: '#8b5cf6',
    name: 'Royal Purple'
  },
  red: {
    primary: '#ef4444',
    name: 'Ruby Red'
  },
  orange: {
    primary: '#f97316',
    name: 'Sunset Orange'
  }
}

// Usage
themeStore.setPrimaryColor(THEME_PRESETS.green.primary)
```

---

## 📱 Layout Customization

### Layout Options

#### Boxed Layout

```typescript
// Enable boxed layout with custom max-width
themeStore.setBoxed(true)

// Custom CSS for boxed layout
.boxed-layout {
  max-width: 1400px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
```

#### Sidebar Configuration

```typescript
// Mini sidebar
themeStore.setMiniSidebar(true)

// Custom sidebar width
:root {
  --sidebar-width: 280px;
  --sidebar-collapsed-width: 80px;
}
```

#### Header Customization

```css
.app-header {
  height: 64px;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
}

/* Custom header height */
.app-header.compact {
  height: 48px;
}

.app-header.expanded {
  height: 80px;
}
```

---

## 🎪 Component Customization

### Button Variants

```vue
<template>
  <!-- Custom button styles -->
  <n-button 
    class="custom-btn"
    type="primary"
    size="large"
  >
    Custom Button
  </n-button>
</template>

<style scoped>
.custom-btn {
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
}
</style>
```

### Card Customization

```css
.n-card {
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
}

.n-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Custom card header */
.n-card .n-card-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-color-hover));
  color: white;
  border-radius: 16px 16px 0 0;
}
```

### Table Customization

```css
/* Custom table styles */
.n-data-table {
  border-radius: 12px;
  overflow: hidden;
}

.n-data-table .n-data-table-th {
  background: var(--bg-secondary);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.n-data-table .n-data-table-td {
  padding: 16px;
}

/* Striped rows */
.n-data-table .n-data-table-tr:nth-child(even) {
  background: var(--bg-tertiary);
}
```

---

## 📊 Chart Customization

### Chart Color Schemes

```typescript
// src/constants/chartColors.ts
export const CHART_COLORS = {
  primary: ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'],
  success: ['#10b981', '#22c55e', '#86efac', '#bbf7d0'],
  warning: ['#f59e0b', '#f97316', '#fb923c', '#fdba74'],
  info: ['#3b82f6', '#06b6d4', '#0ea5e9', '#38bdf8'],
  neutral: ['#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6']
}

// Usage in chart components
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [{
    label: 'Revenue',
    data: [12000, 19000, 15000, 25000, 22000],
    backgroundColor: CHART_COLORS.primary,
    borderColor: CHART_COLORS.primary[0],
    borderWidth: 2
  }]
}
```

### Chart Themes

```typescript
// Dark mode chart theme
export const getChartTheme = (isDark: boolean) => ({
  backgroundColor: 'transparent',
  textColor: isDark ? '#f9fafb' : '#1f2937',
  gridColor: isDark ? '#374151' : '#e5e7eb',
  tooltipBackgroundColor: isDark ? '#1f2937' : '#ffffff',
  tooltipTextColor: isDark ? '#f9fafb' : '#1f2937'
})
```

---

## 🎨 Typography Customization

### Font System

```css
/* Import custom fonts */
@use url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  /* Font Families */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-secondary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Fira Code', 'Monaco', 'Consolas', monospace;

  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;    /* 16px */
  --text-lg: 1.125rem;  /* 18px */
  --text-xl: 1.25rem;   /* 20px */
  --text-2xl: 1.5rem;   /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem;  /* 36px */

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Typography Classes

```css
/* Custom typography utilities */
.text-gradient {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-color-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.text-uppercase {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## 🎯 Animation Customization

### Transition System

```css
:root {
  /* Transition Durations */
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;

  /* Transition Easing */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
}

/* Custom animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Animation utilities */
.animate-fade-in {
  animation: fadeIn var(--transition-normal) var(--ease-in-out);
}

.animate-slide-in-up {
  animation: slideInUp var(--transition-normal) var(--ease-out);
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## 📱 Responsive Customization

### Custom Breakpoints

```typescript
// src/constants/breakpoints.ts
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
  xxxl: 1600
}

// Usage in components
const { isMobile, isTablet, isDesktop } = useBreakpoints()
```

### Responsive Utilities

```css
/* Responsive spacing */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

@media (min-width: 1200px) {
  .container {
    padding: 3rem;
  }
}

/* Responsive grid */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 🎨 Brand Customization

### Logo Customization

```vue
<!-- src/components/BrandLogo.vue -->
<template>
  <div class="brand-logo">
    <svg viewBox="0 0 24 24" class="logo-icon">
      <!-- Your custom logo SVG -->
    </svg>
    <span class="logo-text">{{ brandName }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const brandName = computed(() => {
  return themeStore.isDark ? 'Your Brand Dark' : 'Your Brand'
})
</script>

<style scoped>
.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: var(--primary-color);
}

.logo-text {
  font-family: var(--font-secondary);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}
</style>
```

### Favicon and Meta Tags

```html
<!-- index.html -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<meta name="theme-color" content="#6366f1">
<meta name="description" content="Your custom description">
```

---

## 🔧 Advanced Customization

### Custom SCSS Variables

```scss
// src/styles/variables.scss
$primary-color: #6366f1;
$success-color: #22c55e;
$warning-color: #f59e0b;
$error-color: #ef4444;

$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;
$border-radius-xl: 16px;

$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

### Plugin System

```typescript
// src/plugins/customPlugin.ts
import type { App } from 'vue'

export default {
  install(app: App) {
    // Custom global properties
    app.config.globalProperties.$brandName = 'Your Brand'
    
    // Custom directives
    app.directive('focus', {
      mounted(el) {
        el.focus()
      }
    })
    
    // Custom components
    app.component('CustomButton', CustomButton)
  }
}
```

---

## 📚 Best Practices

### Organization Tips

1. **Group related styles** in separate files
2. **Use CSS variables** for consistent theming
3. **Follow naming conventions** (BEM methodology)
4. **Keep styles modular** and reusable
5. **Document custom styles** with comments

### Performance Tips

1. **Minimize CSS bundle size**
2. **Use CSS containment** for better performance
3. **Optimize animations** with transform and opacity
4. **Avoid expensive selectors**
5. **Use CSS-in-JS sparingly**

---

## 🎯 Next Steps

After customizing your theme:

1. **Test across devices** and browsers
2. **Validate accessibility** compliance
3. **Optimize performance** metrics
4. **Document your changes** for team members
5. **Create brand guidelines** for consistency

---

**Need help with customization? Check our [support documentation](./SUPPORT.md) or contact our team!**
