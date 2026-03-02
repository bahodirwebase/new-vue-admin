import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
/**
 * Naive UI is imported globally for simplicity and ease of use in an admin template context.
 * This registers all Naive UI components globally, which is the recommended approach for
 * full-featured admin dashboards where most components are used across many pages.
 *
 * For projects requiring minimal bundle size, switch to on-demand auto-importing:
 * @see https://www.naiveui.com/en-US/os-theme/docs/import-on-demand
 */
import naive from 'naive-ui'
import './styles/main.css'
import './styles/accessibility.css'
import './styles/common.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(naive)

app.mount('#app')
