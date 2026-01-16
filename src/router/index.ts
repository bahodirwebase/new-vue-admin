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
    path: '/pages/errors/not-found',
    name: 'NotFound',
    component: () => import('@/views/pages/errors/NotFound.vue'),
    meta: { title: '404 Not Found', icon: 'alert-circle-outline', group: 'Pages', subgroup: 'Errors' }
  },
  {
    path: '/pages/errors/forbidden',
    name: 'Forbidden',
    component: () => import('@/views/pages/errors/Forbidden.vue'),
    meta: { title: '403 Forbidden', icon: 'shield-checkmark-outline', group: 'Pages', subgroup: 'Errors' }
  },
  {
    path: '/pages/errors/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/views/pages/errors/Unauthorized.vue'),
    meta: { title: '401 Unauthorized', icon: 'lock-closed-outline', group: 'Pages', subgroup: 'Errors' }
  },
  {
    path: '/pages/errors/server-error',
    name: 'ServerError',
    component: () => import('@/views/pages/errors/ServerError.vue'),
    meta: { title: '500 Server Error', icon: 'warning-outline', group: 'Pages', subgroup: 'Errors' }
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
        path: 'apps/ecommerce',
        name: 'Ecommerce',
        component: () => import('@/views/apps/ecommerce/Ecommerce.vue'),
        meta: { title: 'E-commerce', icon: 'storefront-outline', group: 'Apps' }
      },
      {
        path: 'apps/ecommerce/cart',
        name: 'ShoppingCart',
        component: () => import('@/views/apps/ecommerce/ShoppingCart.vue'),
        meta: { title: 'Shopping Cart', icon: 'cart-outline', group: 'Apps' }
      },
      {
        path: 'apps/ecommerce/checkout',
        name: 'Checkout',
        component: () => import('@/views/apps/ecommerce/Checkout.vue'),
        meta: { title: 'Checkout', icon: 'checkmark-outline', group: 'Apps' }
      },
      {
        path: 'components/ui-elements/alert',
        name: 'Alert',
        component : () => import('@/views/components/ui-elements/Alert.vue'),
        meta: { title: 'Alert', icon: 'alert-circle-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/avatar',
        name: 'Avatar',
        component : () => import('@/views/components/ui-elements/Avatar.vue'),
        meta: { title: 'Avatar', icon: 'person-circle-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/badge',
        name: 'Badge',
        component: () => import('@/views/components/ui-elements/Badge.vue'),
        meta: { title: 'Badge', icon: 'ribbon-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/button',
        name: 'Button',
        component: () => import('@/views/components/ui-elements/Button.vue'),
        meta: { title: 'Button', icon: 'radio-button-on-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/modal',
        name: 'Modal',
        component: () => import('@/views/components/ui-elements/Modal.vue'),
        meta: { title: 'Modal', icon: 'browsers-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/list',
        name: 'List',
        component: () => import('@/views/components/ui-elements/List.vue'),
        meta: { title: 'List', icon: 'list-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/menu',
        name: 'Menu',
        component: () => import('@/views/components/ui-elements/Menu.vue'),
        meta: { title: 'Menu', icon: 'menu-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/pagination',
        name: 'Pagination',
        component: () => import('@/views/components/ui-elements/Pagination.vue'),
        meta: { title: 'Pagination', icon: 'ellipsis-horizontal-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/tabs',
        name: 'Tabs',
        component: () => import('@/views/components/ui-elements/Tabs.vue'),
        meta: { title: 'Tabs', icon: 'albums-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/timeline',
        name: 'Timeline',
        component: () => import('@/views/components/ui-elements/Timeline.vue'),
        meta: { title: 'Timeline', icon: 'time-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/tooltip',
        name: 'Tooltip',
        component: () => import('@/views/components/ui-elements/Tooltip.vue'),
        meta: { title: 'Tooltip', icon: 'information-circle-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/carousel',
        name: 'Carousel',
        component: () => import('@/views/components/ui-elements/Carousel.vue'),
        meta: { title: 'Carousel', icon: 'albums-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/collapse',
        name: 'Collapse',
        component: () => import('@/views/components/ui-elements/Collapse.vue'),
        meta: { title: 'Collapse', icon: 'remove-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/tag',
        name: 'Tag',
        component: () => import('@/views/components/ui-elements/Tag.vue'),
        meta: { title: 'Tag', icon: 'ribbon-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/ui-elements/float-button',
        name: 'FloatButton',
        component: () => import('@/views/components/ui-elements/FloatButton.vue'),
        meta: { title: 'Float Button', icon: 'add-circle-outline', group: 'Components', subgroup: 'UI Elements' }
      },
      {
        path: 'components/tables/basic-table',
        name: 'Basic-Table',
        component: () => import('@/views/components/tables/Basic-Table.vue'),
        meta: { title: 'Basic Table', icon: 'grid-outline', group: 'Components', subgroup: 'Tables' }
      },
      {
        path: 'components/tables/data-table',
        name: 'Data-Table',
        component: () => import('@/views/components/tables/Data-Table.vue'),
        meta: { title: 'Data Table', icon: 'list-outline', group: 'Components', subgroup: 'Tables' }
      },
      {
        path: 'components/charts/line-chart',
        name: 'Line-Chart',
        component: () => import('@/views/components/charts/Line-Chart.vue'),
        meta: { title: 'Line Chart', icon: 'analytics-outline', group: 'Components', subgroup: 'Charts' }
      },
      {
        path: 'components/charts/bar-chart',
        name: 'Bar-Chart',
        component: () => import('@/views/components/charts/Bar-Chart.vue'),
        meta: { title: 'Bar Chart', icon: 'bar-chart-outline', group: 'Components', subgroup: 'Charts' }
      },
      {
        path: 'components/charts/pie-chart',
        name: 'Pie-Chart',
        component: () => import('@/views/components/charts/Pie-Chart.vue'),
        meta: { title: 'Pie Chart', icon: 'pie-chart-outline', group: 'Components', subgroup: 'Charts' }
      },
      {
        path: 'components/charts/mixed-chart',
        name: 'Mixed-Chart',
        component: () => import('@/views/components/charts/Mixed-Chart.vue'),
        meta: { title: 'Mixed Chart', icon: 'layers-outline', group: 'Components', subgroup: 'Charts' }
      },
      {
        path: 'components/typography',
        name: 'Typography',
        component: () => import('@/views/components/Typography.vue'),
        meta: { title: 'Typography', icon: 'text-outline', group: 'Components' }
      },
      {
        path: 'components/icons',
        name: 'Icons',
        component: () => import('@/views/components/Icons.vue'),
        meta: { title: 'Icons', icon: 'apps-outline', group: 'Components' }
      },
      {
        path: 'components/ui-elements/extra/divider',
        name: 'Divider',
        component: () => import('@/views/components/extra/Divider.vue'),
        meta: { title: 'Divider', icon: 'remove-outline', group: 'Components', subgroup: 'Extra' }
      },
      {
        path: 'components/ui-elements/extra/ellipsis',
        name: 'Ellipsis',
        component: () => import('@/views/components/extra/Ellipsis.vue'),
        meta: { title: 'Ellipsis', icon: 'ellipsis-horizontal-outline', group: 'Components', subgroup: 'Extra' }
      },
      {
        path: 'components/ui-elements/extra/gradient-text',
        name: 'GradientText',
        component: () => import('@/views/components/extra/GradientText.vue'),
        meta: { title: 'Gradient Text', icon: 'color-palette-outline', group: 'Components', subgroup: 'Extra' }
      },
      {
        path: 'components/ui-elements/extra/page-header',
        name: 'PageHeader',
        component: () => import('@/views/components/extra/PageHeader.vue'),
        meta: { title: 'Page Header', icon: 'document-text-outline', group: 'Components', subgroup: 'Extra' }
      },
      {
        path: 'components/ui-elements/extra/watermark',
        name: 'Watermark',
        component: () => import('@/views/components/extra/Watermark.vue'),
        meta: { title: 'Watermark', icon: 'water-outline', group: 'Components', subgroup: 'Extra' }
      },
      {
        path: 'components/ui-elements/extra/countdown',
        name: 'CountDown',
        component: () => import('@/views/components/extra/CountDown.vue'),
        meta: { title: 'Countdown', icon: 'timer-outline', group: 'Components', subgroup: 'Extra' }
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
        path: 'forms/form-elements/slider',
        name: 'Slider',
        component: () => import('@/views/forms/form-elements/Slider.vue'),
        meta: { title: 'Slider', icon: 'remove-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'forms/form-elements/autocomplete',
        name: 'AutoComplete',
        component: () => import('@/views/forms/form-elements/AutoComplete.vue'),
        meta: { title: 'AutoComplete', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'forms/form-elements/checkbox',
        name: 'Checkbox',
        component: () => import('@/views/forms/form-elements/Checkbox.vue'),
        meta: { title: 'Checkbox', icon: 'checkbox-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'forms/form-elements/datepicker',
        name: 'DatePicker',
        component: () => import('@/views/forms/form-elements/DatePicker.vue'),
        meta: { title: 'DatePicker', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'forms/form-elements/upload',
        name: 'Upload',
        component: () => import('@/views/forms/form-elements/Upload.vue'),
        meta: { title: 'Upload', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Form Elements' }
      },
      {
        path: 'forms/extra/cascader',
        name: 'Cascader',
        component: () => import('@/views/forms/extra/Cascader.vue'),
        meta: { title: 'Cascader', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Extra Form Elements' }
      },
      {
        path: 'forms/extra/color-picker',
        name: 'ColorPicker',
        component: () => import('@/views/forms/extra/ColorPicker.vue'),
        meta: { title: 'Color Picker', icon: 'checkbox-outline', group: 'Components', subgroup: 'Extra Form Elements' }
      },
      {
        path: 'forms/extra/dynamic-input',
        name: 'DynamicInput',
        component: () => import('@/views/forms/extra/DynamicInput.vue'),
        meta: { title: 'Dynamic Input', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Extra Form Elements' }
      },
      {
        path: 'forms/extra/dynamic-tags',
        name: 'DynamicTags',
        component: () => import('@/views/forms/extra/DynamicTags.vue'),
        meta: { title: 'Dynamic Tags', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Extra Form Elements' }
      },
      {
        path: 'forms/extra/input-number',
        name: 'InputNumber',
        component: () => import('@/views/forms/extra/InputNumber.vue'),
        meta: { title: 'Input Number', icon: 'checkbox-outline', group: 'Components', subgroup: 'Extra Form Elements' }
      },
      {
        path: 'forms/extra/input-otp',
        name: 'InputOtp',
        component: () => import('@/views/forms/extra/InputOtp.vue'),
        meta: { title: 'Input OTP', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Extra Form Elements' }
      },
      {
        path: 'forms/extra/mention',
        name: 'Mention',
        component: () => import('@/views/forms/extra/Mention.vue'),
        meta: { title: 'Mention', icon: 'checkbox-outline', group: 'Components', subgroup: 'Extra Form Elements' }
      },
      {
        path: 'forms/extra/rate',
        name: 'Rate',
        component: () => import('@/views/forms/extra/Rate.vue'),
        meta: { title: 'Rate', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Extra Form Elements' }
      },
      {
        path: 'forms/extra/transfer',
        name: 'Transfer',
        component: () => import('@/views/forms/extra/Transfer.vue'),
        meta: { title: 'Transfer', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Extra Form Elements' }
      },
      {
        path: 'forms/extra/tree-select',
        name: 'TreeSelect',
        component: () => import('@/views/forms/extra/TreeSelect.vue'),
        meta: { title: 'Tree Select', icon: 'radio-button-off-outline', group: 'Components', subgroup: 'Extra Form Elements' }
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
      },
      {
        path: 'forms/form-editor',
        name: 'Form-Editor',
        component: () => import('@/views/forms/Form-Editor.vue'),
        meta: { title: 'Form Editor', icon: 'create-outline', group: 'Components' }
      },
      {
        path: 'pages/user/user-profile',
        name: 'UserProfile',
        component: () => import('@/views/pages/user/UserProfile.vue'),
        meta: { title: 'User Profile', icon: 'person-circle-outline', group: 'Pages', subgroup: 'User' }
      },
      {
        path: 'pages/user/account-settings',
        name: 'AccountSettings',
        component: () => import('@/views/pages/user/AccountSettings.vue'),
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
        component: () => import('@/views/pages/user/Faq.vue'),
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
