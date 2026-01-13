import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import themeOverrides from './themes/themeOverrides'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(naive)

// Apply theme overrides
const naiveThemeOverrides = {
  ...themeOverrides,
  // Override CSS variables directly
  common: {
    ...themeOverrides.common,
    // Custom CSS variables
    '--n-item-height': '36px',
    '--n-menu-item-height': '36px',
    '--n-menu-item-padding': '0 12px',
    '--n-menu-font-size': '14px',
    '--n-menu-group-title-font-size': '11px',
    '--n-menu-group-title-text-transform': 'uppercase',
    '--n-menu-group-title-font-weight': '700'
  }
}

// Apply theme to Naive UI
app.provide('naiveThemeOverrides', naiveThemeOverrides)

app.mount('#app')
