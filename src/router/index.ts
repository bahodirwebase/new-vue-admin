import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/pages/authentication/login-simple',
    name: 'LoginSimple',
    component: () => import('@/views/pages/auth/LoginSimple.vue'),
    meta: { title: 'Login (Simple)', icon: 'person-circle-outline', group: 'Pages', subgroup: 'Authentication' }
  },
  {
    path: '/pages/authentication/login-advanced',
    name: 'LoginAdvanced',
    component: () => import('@/views/pages/auth/LoginAdvanced.vue'),
    meta: { title: 'Login (Advanced)', icon: 'person-circle-outline', group: 'Pages', subgroup: 'Authentication' }
  },
  {
    path: '/pages/authentication/register-simple',
    name: 'RegisterSimple',
    component: () => import('@/views/pages/auth/RegisterSimple.vue'),
    meta: { title: 'Register (Simple)', icon: 'document-text-outline', group: 'Pages', subgroup: 'Authentication' }
  },
  {
    path: '/pages/authentication/register-advanced',
    name: 'RegisterAdvanced',
    component: () => import('@/views/pages/auth/RegisterAdvanced.vue'),
    meta: { title: 'Register (Advanced)', icon: 'document-text-outline', group: 'Pages', subgroup: 'Authentication' }
  },
  {
    path: '/pages/authentication/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/pages/auth/ForgotPassword.vue'),
    meta: { title: 'Forgot Password', icon: 'mail-outline', group: 'Pages', subgroup: 'Authentication' }
  },
  {
    path: '/pages/authentication/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/pages/auth/ResetPassword.vue'),
    meta: { title: 'Reset Password', icon: 'lock-closed-outline', group: 'Pages', subgroup: 'Authentication' }
  },
  {
    path: '/pages/authentication/two-step-verification',
    name: 'TwoStepVerification',
    component: () => import('@/views/pages/auth/TwoStepVerification.vue'),
    meta: { title: 'Two Step Verification', icon: 'shield-checkmark-outline', group: 'Pages', subgroup: 'Authentication' }
  },
  {
    path: '/pages/authentication/lockscreen',
    name: 'LockScreen',
    component: () => import('@/views/pages/auth/LockScreen.vue'),
    meta: { title: 'Lock Screen', icon: 'lock-closed-outline', group: 'Pages', subgroup: 'Authentication' }
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/dashboard/analytical',
    children: [
      {
        path: 'dashboard/analytical',
        name: 'Analytical',
        component: () => import('@/views/Analytical.vue'),
        meta: { title: 'Analytical', icon: 'analytics-outline', group: 'Dashboard' }
      },
      {
        path: 'dashboard/commerce',
        name: 'Commerce',
        component: () => import('@/views/Commerce.vue'),
        meta: { title: 'Commerce', icon: 'storefront-outline', group: 'Dashboard' }
      },
      {
        path: 'apps/calendar',
        name: 'Calendar',
        component: () => import('@/views/apps/Calendar.vue'),
        meta: { title: 'Calendar', icon: 'calendar-outline', group: 'Apps' }
      },
      {
        path: 'apps/chat',
        name: 'Chat',
        component: () => import('@/views/apps/Chat.vue'),
        meta: { title: 'Chat', icon: 'chatbubble-ellipses-outline', group: 'Apps' }
      },
      {
        path: 'apps/email',
        name: 'Email',
        component: () => import('@/views/apps/Email.vue'),
        meta: { title: 'Email', icon: 'mail-outline', group: 'Apps' }
      },
      {
        path: 'components/ui-elements/alert',
        name: 'Alert',
        component: () => import('@/views/ui-elements/components/Alert.vue'),
        meta: { title: 'Alert', icon: 'alert-circle-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/avatar',
        name: 'Avatar',
        component: () => import('@/views/ui-elements/components/Avatar.vue'),
        meta: { title: 'Avatar', icon: 'person-circle-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/badge',
        name: 'Badge',
        component: () => import('@/views/ui-elements/components/Badge.vue'),
        meta: { title: 'Badge', icon: 'ribbon-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/button',
        name: 'Button',
        component: () => import('@/views/ui-elements/components/Button.vue'),
        meta: { title: 'Button', icon: 'radio-button-on-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/modal',
        name: 'Modal',
        component: () => import('@/views/ui-elements/components/Modal.vue'),
        meta: { title: 'Modal', icon: 'browsers-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/list',
        name: 'List',
        component: () => import('@/views/ui-elements/components/List.vue'),
        meta: { title: 'List', icon: 'list-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/menu',
        name: 'Menu',
        component: () => import('@/views/ui-elements/components/Menu.vue'),
        meta: { title: 'Menu', icon: 'menu-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/pagination',
        name: 'Pagination',
        component: () => import('@/views/ui-elements/components/Pagination.vue'),
        meta: { title: 'Pagination', icon: 'ellipsis-horizontal-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/tabs',
        name: 'Tabs',
        component: () => import('@/views/ui-elements/components/Tabs.vue'),
        meta: { title: 'Tabs', icon: 'albums-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/timeline',
        name: 'Timeline',
        component: () => import('@/views/ui-elements/components/Timeline.vue'),
        meta: { title: 'Timeline', icon: 'time-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/tooltip',
        name: 'Tooltip',
        component: () => import('@/views/ui-elements/components/Tooltip.vue'),
        meta: { title: 'Tooltip', icon: 'information-circle-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/typography',
        name: 'Typography',
        component: () => import('@/views/ui-elements/Typography.vue'),
        meta: { title: 'Typography', icon: 'text-outline', group: 'Components' }
      },
      {
        path: 'components/icons',
        name: 'Icons',
        component: () => import('@/views/ui-elements/Icons.vue'),
        meta: { title: 'Icons', icon: 'apps-outline', group: 'Components' }
      },
      {
        path: 'forms/form-elements/select',
        name: 'Select',
        component: () => import('@/views/forms/form-elements/Select.vue'),
        meta: { title: 'Select', icon: 'checkbox-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'forms/form-elements/input',
        name: 'Input',
        component: () => import('@/views/forms/form-elements/Input.vue'),
        meta: { title: 'Input', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'forms/form-elements/radio',
        name: 'Radio',
        component: () => import('@/views/forms/form-elements/Radio.vue'),
        meta: { title: 'Radio', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'forms/form-elements/switch',
        name: 'Switch',
        component: () => import('@/views/forms/form-elements/Switch.vue'),
        meta: { title: 'Switch', icon: 'toggle-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'forms/form-validation',
        name: 'Form-Validation',
        component: () => import('@/views/forms/Form-Validation.vue'),
        meta: { title: 'Form Validation', icon: 'checkmark-outline', group: 'Components' }
      },
      {
        path: 'forms/form-wizard',
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
