import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/analytical',
    children: [
      {
        path: 'analytical',
        name: 'Analytical',
        component: () => import('@/views/Analytical.vue'),
        meta: { title: 'Analytical', icon: 'analytics-outline', group: 'Dashboard' }
      },
      {
        path: 'commerce',
        name: 'Commerce',
        component: () => import('@/views/Commerce.vue'),
        meta: { title: 'Commerce', icon: 'storefront-outline', group: 'Dashboard' }
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: () => import('@/views/apps/Calendar.vue'),
        meta: { title: 'Calendar', icon: 'calendar-outline', group: 'Apps' }
      },
      {
        path: 'alert',
        name: 'Alert',
        component: () => import('@/views/ui-elements/components/Alert.vue'),
        meta: { title: 'Alert', icon: 'alert-circle-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'avatar',
        name: 'Avatar',
        component: () => import('@/views/ui-elements/components/Avatar.vue'),
        meta: { title: 'Avatar', icon: 'person-circle-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'badge',
        name: 'Badge',
        component: () => import('@/views/ui-elements/components/Badge.vue'),
        meta: { title: 'Badge', icon: 'ribbon-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'button',
        name: 'Button',
        component: () => import('@/views/ui-elements/components/Button.vue'),
        meta: { title: 'Button', icon: 'radio-button-on-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'modal',
        name: 'Modal',
        component: () => import('@/views/ui-elements/components/Modal.vue'),
        meta: { title: 'Modal', icon: 'browsers-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/ui-elements/components/List.vue'),
        meta: { title: 'List', icon: 'list-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/ui-elements/components/Menu.vue'),
        meta: { title: 'Menu', icon: 'menu-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'pagination',
        name: 'Pagination',
        component: () => import('@/views/ui-elements/components/Pagination.vue'),
        meta: { title: 'Pagination', icon: 'ellipsis-horizontal-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'tabs',
        name: 'Tabs',
        component: () => import('@/views/ui-elements/components/Tabs.vue'),
        meta: { title: 'Tabs', icon: 'albums-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'timeline',
        name: 'Timeline',
        component: () => import('@/views/ui-elements/components/Timeline.vue'),
        meta: { title: 'Timeline', icon: 'time-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'tooltip',
        name: 'Tooltip',
        component: () => import('@/views/ui-elements/components/Tooltip.vue'),
        meta: { title: 'Tooltip', icon: 'information-circle-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'typography',
        name: 'Typography',
        component: () => import('@/views/ui-elements/Typography.vue'),
        meta: { title: 'Typography', icon: 'text-outline', group: 'Components' }
      },
      {
        path: 'icons',
        name: 'Icons',
        component: () => import('@/views/ui-elements/Icons.vue'),
        meta: { title: 'Icons', icon: 'apps-outline', group: 'Components' }
      },
      {
        path: 'select',
        name: 'Select',
        component: () => import('@/views/forms/form-elements/Select.vue'),
        meta: { title: 'Select', icon: 'checkbox-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'input',
        name: 'Input',
        component: () => import('@/views/forms/form-elements/Input.vue'),
        meta: { title: 'Input', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'radio',
        name: 'Radio',
        component: () => import('@/views/forms/form-elements/Radio.vue'),
        meta: { title: 'Radio', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'switch',
        name: 'Switch',
        component: () => import('@/views/forms/form-elements/Switch.vue'),
        meta: { title: 'Switch', icon: 'toggle-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'form-validation',
        name: 'Form-Validation',
        component: () => import('@/views/forms/Form-Validation.vue'),
        meta: { title: 'Form Validation', icon: 'checkmark-outline', group: 'Components' }
      },
      {
        path: 'form-wizard',
        name: 'Form-Wizard',
        component: () => import('@/views/forms/Form-Wizard.vue'),
        meta: { title: 'Form Wizard', icon: 'chevron-forward-outline', group: 'Components' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
