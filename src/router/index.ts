import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

import dashboard from './dashboard'
import apps from './apps'
import pages from './pages'
import components from './components'
import forms from './forms'

const routes: RouteRecordRaw[] = [
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
        component: () => import('@/views/pages/user/UserProfile.vue'),
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
        component: () => import('@/views/pages/user/Pricing.vue'),
        meta: { title: 'Pricing', icon: 'card-outline', group: 'Pages', subgroup: 'User' }
      },
      {
        path: 'pages/user/faq',
        name: 'Faq',
        component: () => import('@/views/pages/user/faq/index.vue'),
        meta: { title: 'FAQ', icon: 'help-circle-outline', group: 'Pages', subgroup: 'User' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
