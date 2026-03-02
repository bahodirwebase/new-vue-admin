import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { useAuthStore } from '@/stores/auth'

import dashboard from './dashboard'
import apps from './apps'
import pages from './pages'
import components from './components'
import forms from './forms'

/** Application name used as the browser tab title suffix */
const APP_TITLE = 'Byxora Admin'

/**
 * Routes that do not require authentication.
 * All other routes are protected and redirect to /login.
 */
const PUBLIC_PATHS = ['/login', '/pages/authentication', '/pages/errors']

const routes: RouteRecordRaw[] = [
  // Main login route
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/auth/LoginSimple.vue'),
    meta: { title: 'Sign In' }
  },
  ...pages,
  {
    path: '/',
    component: MainLayout,
    redirect: '/dashboard/analytical',
    children: [
      ...dashboard,
      ...apps,
      ...components,
      ...forms,
      {
        path: 'pages/user/user-profile',
        name: 'UserProfile',
        component: () => import('@/views/pages/user/user-profile/index.vue'),
        meta: { title: 'User Profile', icon: 'person-circle-outline', group: 'Pages', subgroup: 'User' }
      },
      {
        path: 'pages/user/account-settings',
        name: 'AccountSettings',
        component: () => import('@/views/pages/user/account-settings/index.vue'),
        meta: { title: 'Account Settings', icon: 'settings-outline', group: 'Pages', subgroup: 'User' }
      },
      {
        path: 'pages/user/pricing',
        name: 'Pricing',
        component: () => import('@/views/pages/user/pricing/index.vue'),
        meta: { title: 'Pricing', icon: 'card-outline', group: 'Pages', subgroup: 'User' }
      },
      {
        path: 'pages/user/faq',
        name: 'Faq',
        component: () => import('@/views/pages/user/faq/index.vue'),
        meta: { title: 'FAQ', icon: 'help-circle-outline', group: 'Pages', subgroup: 'User' }
      }
    ]
  },
  // Catch-all: redirect unknown paths to the 404 error page
  {
    path: '/:pathMatch(.*)*',
    redirect: '/pages/errors/not-found'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

/**
 * Global navigation guard.
 * - Updates the browser tab title based on route meta.title.
 * - Redirects unauthenticated users to /login.
 * - Redirects authenticated users away from /login to the dashboard.
 */
router.beforeEach((to) => {
  // Update page title
  const title = to.meta?.title as string | undefined
  document.title = title ? `${title} | ${APP_TITLE}` : APP_TITLE

  const authStore = useAuthStore()

  const isPublic = PUBLIC_PATHS.some(p => to.path.startsWith(p))

  // Redirect unauthenticated users to login
  if (!isPublic && !authStore.isAuthenticated) {
    return { path: '/login' }
  }

  // Redirect authenticated users away from login page
  if (to.path === '/login' && authStore.isAuthenticated) {
    return { path: '/dashboard/analytical' }
  }
})

export default router
