# Byxora - Vue 3 Admin Dashboard

A premium, feature-rich Vue 3 + TypeScript admin dashboard template built with modern technologies and best practices. Perfect for building sophisticated web applications and admin panels.

## 🌟 Features

### 🎯 Modern Technology Stack
- ✨ **Vue 3** with Composition API
- 📘 **TypeScript** for type safety
- 🎨 **Naive UI** component library
- 📦 **Pinia** for state management
- 🚀 **Vite** for lightning-fast development
- 🛣️ **Vue Router** for navigation

### 🎨 Design & Customization
- 🌙 **Dark/Light Mode** with smooth transitions
- 📱 **Fully Responsive** design for all devices
- 🎭 **Multiple Layout Options**: Boxed, Fluid, Mini Sidebar
- 🌈 **Customizable Theme Colors** with CSS variables
- � **Modern UI Components** with consistent design
- 📐 **Clean Architecture** with modular structure

### 📊 Rich Components
- � **Advanced Charts**: Line, Bar, Pie, Mixed charts
- 📋 **Data Tables** with sorting and filtering
- 📝 **Form Elements** with validation
- 🎯 **UI Components**: Alerts, Modals, Tabs, Tooltips
- 📅 **Calendar** integration
- 💬 **Chat Interface** components
- 🛒 **E-commerce** pages and components

### ⚡ Performance & Optimization
- 🚀 **Lazy Loading** for optimal performance
- 📦 **Code Splitting** for smaller bundles
- 🗜️ **Minified Production Build**
- 🔄 **Caching Strategies** for faster loads
- 📊 **Optimized Assets** and images

### 🛡️ Developer Experience
- � **Modular Architecture** for maintainability
- 🔧 **Reusable Composables** for common logic
- 📚 **Type Safety** throughout the application
- 🎯 **Best Practices** and clean code
- 📖 **Comprehensive Documentation**
- 🔍 **SEO Friendly** structure

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/manga-admin.git
cd manga-admin

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build optimized production version
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── charts/        # Chart components
│   ├── layout/        # Layout components
│   └── ui/           # UI elements
├── composables/       # Vue composables
├── constants/         # Application constants
├── layouts/           # Page layouts
├── router/           # Vue Router configuration
├── stores/           # Pinia stores
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── views/            # Page components
│   ├── apps/         # Application pages
│   ├── components/   # Component showcases
│   ├── forms/        # Form examples
│   └── pages/        # Static pages
└── styles/           # Global styles
```

## 🎨 Customization

### Theme Configuration

The theme system allows extensive customization:

```typescript
// src/stores/theme.ts
const themeStore = useThemeStore()

// Toggle dark mode
themeStore.setDark(true)

// Change primary color
themeStore.setPrimaryColor('#ff6b6b')

// Enable boxed layout
themeStore.setBoxed(true)

// Toggle mini sidebar
themeStore.setMiniSidebar(true)
```

### CSS Variables

Customize colors using CSS variables:

```css
:root {
  --primary-color: #6366f1;
  --primary-color-hover: #4f46e5;
  --primary-color-pressed: #4338ca;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --border-color: #e5e7eb;
}
```

## 📱 Responsive Breakpoints

```typescript
// Built-in breakpoint system
const { isMobile, isTablet, isDesktop } = useBreakpoints()

// Available breakpoints:
// xs: <576px
// sm: 576px - 768px  
// md: 768px - 992px
// lg: 992px - 1200px
// xl: 1200px - 1400px
// xxl: ≥1400px
```

## 🛠️ Available Composables

```typescript
// Breakpoint management
useBreakpoints()

// Theme management  
useThemeStore()

// Notifications
useNotification()

// Fullscreen API
useFullscreen()

// Local storage
useLocalStorage()

// Sidebar control
useSidebar()
```

## 📊 Chart Integration

Built-in support for multiple chart libraries:

```vue
<template>
  <LineChart :data="chartData" />
  <BarChart :data="chartData" />
  <PieChart :data="chartData" />
</template>
```

## 📝 Forms & Validation

Comprehensive form components with validation:

```vue
<template>
  <n-form :model="form" :rules="rules">
    <n-form-item label="Email" path="email">
      <n-input v-model:value="form.email" />
    </n-form-item>
  </n-form>
</template>
```

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 🌐 Browser Support

- Chrome ≥ 88
- Firefox ≥ 85  
- Safari ≥ 14
- Edge ≥ 88

## 📄 License

This template requires a regular or extended license for use in personal or commercial projects.

## 🤝 Support

For support and questions:
- 📧 Email: support@example.com
- 📖 Documentation: [Link to docs]
- 🐛 Issues: [GitHub Issues]

## 🎯 Why Choose Byxora?

- **Production Ready**: Built with enterprise-grade standards
- **Modern Stack**: Latest Vue 3 with Composition API
- **Type Safe**: Full TypeScript support
- **Performance Optimized**: Lazy loading and code splitting
- **Developer Friendly**: Clean, maintainable code
- **Feature Rich**: 50+ components and pages
- **Responsive**: Works perfectly on all devices
- **Customizable**: Easy to theme and extend
- **Well Documented**: Comprehensive guides and examples

Perfect for:
- 🏢 Admin Dashboards
- 📊 Analytics Platforms  
- 🛒 E-commerce Backends
- 📱 SaaS Applications
- 🎯 Project Management Tools
- 📈 Business Intelligence
- 🏪 CRM Systems

---

**Built with ❤️ for modern web development**
