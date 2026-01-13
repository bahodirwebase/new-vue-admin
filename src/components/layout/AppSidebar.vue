<template>
  <!-- Mobile overlay -->
  <div 
    v-if="props.isMobile && !isCollapsed" 
    class="sidebar-overlay"
    @click="toggleSidebar"
  ></div>
  
  <n-layout-sider
    :collapsed="isCollapsed"
    :collapsed-width="collapsedWidth"
    :width="sidebarWidth"
    :native-scrollbar="false"
    collapse-mode="width"
    :collapsed-icon-size="22"
    class="app-sidebar"
    :inverted="themeStore.isDark"
    :class="{ 'mobile-sidebar': props.isMobile }"
  >
    <div class="sidebar-header">
      <div class="logo-container">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <transition name="fade">
          <span v-if="!isCollapsed" class="logo-text">Manga</span>
        </transition>
      </div>
    </div>

    <n-menu
      :collapsed="isCollapsed"
      :collapsed-width="collapsedWidth"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :value="activeKey"
      @update:value="handleMenuSelect"
      :inverted="themeStore.isDark"
    />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { computed, h, ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import {
  AnalyticsOutline,
  StorefrontOutline,
  GridOutline,
  RadioButtonOnOutline,
  AlertCircleOutline,
  PersonCircleOutline,
  RibbonOutline,
  BrowsersOutline,
  ListOutline,
  MenuOutline,
  EllipsisHorizontalOutline,
  AlbumsOutline,
  TimeOutline,
  InformationCircleOutline,
  TextOutline,
  AppsOutline,
  DocumentTextOutline,
  CheckboxOutline,
  RadioButtonOffOutline,
  ToggleOutline,
  CheckmarkOutline,
  ChevronForwardOutline,
  CalendarOutline,
  ChatbubbleEllipsesOutline,
  MailOutline,
  LockClosedOutline,
  ShieldCheckmarkOutline,
  WarningOutline,
  SettingsOutline,
  CardOutline,
  HelpCircleOutline
} from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/theme'
import { NIcon } from 'naive-ui'

const props = defineProps<{
  collapsed?: boolean
  isMobile?: boolean
}>()

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
  toggleSidebar: []
}>()

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()

const windowWidth = ref(window.innerWidth)
const isCollapsed = ref(props.collapsed || false)

const isMobileComputed = computed(() => windowWidth.value < 768)

watch(() => props.collapsed, (val) => {
  if (val !== undefined) {
    isCollapsed.value = val
  }
})

watch(() => themeStore.isMiniSidebar, (val) => {
  if (!props.isMobile) {
    isCollapsed.value = val
  }
}, { immediate: true })

watch(isMobileComputed, (val) => {
  if (val) {
    isCollapsed.value = true
    emit('update:collapsed', true)
  }
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  emit('update:collapsed', isCollapsed.value)
  emit('toggleSidebar')
}

onMounted(() => {
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {})
})

const collapsedWidth = computed(() => 64)
const sidebarWidth = computed(() => {
  if (props.isMobile) {
    return isCollapsed.value ? 0 : 240
  }
  return themeStore.isMiniSidebar ? 64 : 240
})

const activeKey = computed(() => route.name as string)

const menuOptions: MenuOption[] = [
  {
    type: 'group',
    label: 'Dashboard',
    key: 'dashboard-group'
  },
  {
    label: 'Analytical',
    key: 'Analytical',
    icon: () => h(NIcon, { component: AnalyticsOutline })
  },
  {
    label: 'Commerce',
    key: 'Commerce',
    icon: () => h(NIcon, { component: StorefrontOutline })
  },
  {
    type: 'group',
    label: 'Apps',
    key: 'apps-group'
  },
  {
    label: 'Calendar',
    key: 'Calendar',
    icon: () => h(NIcon, { component: CalendarOutline })
  },
  {
    label: 'Chat',
    key: 'Chat',
    icon: () => h(NIcon, { component: ChatbubbleEllipsesOutline })
  },
  {
    label: 'Email',
    key: 'Email',
    icon: () => h(NIcon, { component: MailOutline })
  },
  {
    type: 'group',
    label: 'Pages',
    key: 'pages-group'
  },
  {
    label: 'Authentication',
    key: 'authentication-group',
    icon: () => h(NIcon, { component: LockClosedOutline }),
    children: [
      {
        label: 'Login (Simple)',
        key: 'LoginSimple',
        icon: () => h(NIcon, { component: PersonCircleOutline })
      },
      {
        label: 'Login (Advanced)',
        key: 'LoginAdvanced',
        icon: () => h(NIcon, { component: PersonCircleOutline })
      },
      {
        label: 'Register (Simple)',
        key: 'RegisterSimple',
        icon: () => h(NIcon, { component: DocumentTextOutline })
      },
      {
        label: 'Register (Advanced)',
        key: 'RegisterAdvanced',
        icon: () => h(NIcon, { component: DocumentTextOutline })
      },
      {
        label: 'Forgot Password',
        key: 'ForgotPassword',
        icon: () => h(NIcon, { component: MailOutline })
      },
      {
        label: 'Reset Password',
        key: 'ResetPassword',
        icon: () => h(NIcon, { component: LockClosedOutline })
      },
      {
        label: 'Two Step Verification',
        key: 'TwoStepVerification',
        icon: () => h(NIcon, { component: ShieldCheckmarkOutline })
      },
      {
        label: 'Lock Screen',
        key: 'LockScreen',
        icon: () => h(NIcon, { component: LockClosedOutline })
      }
    ]
  },
  {
    label: 'Errors',
    key: 'errors-group',
    icon: () => h(NIcon, { component: WarningOutline }),
    children: [
      {
        label: '404 Not Found',
        key: 'NotFound',
        icon: () => h(NIcon, { component: AlertCircleOutline })
      },
      {
        label: '403 Forbidden',
        key: 'Forbidden',
        icon: () => h(NIcon, { component: ShieldCheckmarkOutline })
      },
      {
        label: '401 Unauthorized',
        key: 'Unauthorized',
        icon: () => h(NIcon, { component: LockClosedOutline })
      },
      {
        label: '500 Server Error',
        key: 'ServerError',
        icon: () => h(NIcon, { component: WarningOutline })
      }
    ]
  },
  {
    label: 'User',
    key: 'user-group',
    icon: () => h(NIcon, { component: PersonCircleOutline }),
    children: [
      {
        label: 'User Profile',
        key: 'UserProfile',
        icon: () => h(NIcon, { component: PersonCircleOutline })
      },
      {
        label: 'Account Settings',
        key: 'AccountSettings',
        icon: () => h(NIcon, { component: SettingsOutline })
      },
      {
        label: 'Pricing',
        key: 'Pricing',
        icon: () => h(NIcon, { component: CardOutline })
      },
      {
        label: 'FAQ',
        key: 'Faq',
        icon: () => h(NIcon, { component: HelpCircleOutline })
      }
    ]
  },
  {
    type: 'group',
    label: 'Components',
    key: 'components-group'
  },
  {
    label: 'UI Elements',
    key: 'ui-elements-group',
    icon: () => h(NIcon, { component: GridOutline }),
    children: [
      {
        label: 'Alert',
        key: 'Alert',
        icon: () => h(NIcon, { component: AlertCircleOutline })
      },
      {
        label: 'Avatar',
        key: 'Avatar',
        icon: () => h(NIcon, { component: PersonCircleOutline })
      },
      {
        label: 'Badge',
        key: 'Badge',
        icon: () => h(NIcon, { component: RibbonOutline })
      },
      {
        label: 'Button',
        key: 'Button',
        icon: () => h(NIcon, { component: RadioButtonOnOutline })
      },
      {
        label: 'Modal',
        key: 'Modal',
        icon: () => h(NIcon, { component: BrowsersOutline })
      },
      {
        label: 'List',
        key: 'List',
        icon: () => h(NIcon, { component: ListOutline })
      },
      {
        label: 'Menu',
        key: 'Menu',
        icon: () => h(NIcon, { component: MenuOutline })
      },
      {
        label: 'Pagination',
        key: 'Pagination',
        icon: () => h(NIcon, { component: EllipsisHorizontalOutline })
      },
      {
        label: 'Tabs',
        key: 'Tabs',
        icon: () => h(NIcon, { component: AlbumsOutline })
      },
      {
        label: 'Timeline',
        key: 'Timeline',
        icon: () => h(NIcon, { component: TimeOutline })
      },
      {
        label: 'Tooltip',
        key: 'Tooltip',
        icon: () => h(NIcon, { component: InformationCircleOutline })
      }
    ]
  },
  {
    label: 'Typography',
    key: 'Typography',
    icon: () => h(NIcon, { component: TextOutline })
  },
  {
    label: 'Icons',
    key: 'Icons',
    icon: () => h(NIcon, { component: AppsOutline })
  },
  {
    type: 'divider'
  },
  {
    type: 'group',
    label: 'Forms',
    key: 'forms-group'
  },
  {
    label: 'Form Elements',
    key: 'form-elements-group',
    icon: () => h(NIcon, { component: DocumentTextOutline }),
    children: [
      {
        label: 'Select',
        key: 'Select',
        icon: () => h(NIcon, { component: CheckboxOutline })
      },
      {
        label: 'Input',
        key: 'Input',
        icon: () => h(NIcon, { component: RadioButtonOffOutline })
      },
      {
        label: 'Radio',
        key: 'Radio',
        icon: () => h(NIcon, { component: RadioButtonOffOutline })
      },
      {
        label: 'Switch',
        key: 'Switch',
        icon: () => h(NIcon, { component: ToggleOutline })
      }
    ]
  },
  {
    label: 'Form Validation',
    key: 'Form-Validation',
    icon: () => h(NIcon, { component: CheckmarkOutline })
  },
  {
    label: 'Form Wizard',
    key: 'Form-Wizard',
    icon: () => h(NIcon, { component: ChevronForwardOutline })
  }
]

const handleMenuSelect = (key: string) => {
  // Ignore group keys, only navigate to actual routes
  if (!key.includes('-group')) {
    router.push({ name: key })
  }
}
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  backdrop-filter: blur(2px);
}

.app-sidebar {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  z-index: 100;
  position: sticky;
  top: 0;
  height: 100vh;
  flex-shrink: 0;
  overflow: hidden;
  transition: width 0.3s ease, transform 0.3s ease;
}

.app-sidebar.mobile-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15);
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.app-sidebar.mobile-sidebar:deep(.n-layout-sider--collapsed) {
  transform: translateX(-100%);
}

.sidebar-header {
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  background: var(--bg-primary);
  z-index: 101;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  justify-content: center;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: #6366f1;
  flex-shrink: 0;
}

.logo-text {
  font-family: var(--font-secondary);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
}

.n-layout-sider {
  transition: width 0.3s ease;
}

/* Keep menu scrollable under the fixed header */
:deep(.n-menu) {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}

/* Active menu item text color */
::deep(.n-menu-item--selected),
::deep(.n-menu-item--selected .n-menu-item-content),
::deep(.n-menu-item--selected .n-menu-item-content__icon),
::deep(.n-menu-item--selected .n-menu-item-content__label) {
  color: #ffffff !important;
}

/* Group labels: distinct style, no hover */
:deep(.n-menu-item-group) {
  margin-top: 6px;
}

/* Try all Naive UI classnames for group title/header */
:deep(.n-menu-item-group-title),
:deep(.n-menu-item-group-header),
:deep(.n-menu-item-group-label),
:deep(.n-menu-item-group-title__content) {
  cursor: default !important;
  pointer-events: none !important;
  user-select: none;
  font-weight: 700;
  color: var(--text-secondary) !important;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 8px 12px 6px;
  background: transparent !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sidebar-overlay {
    display: block;
  }
  
  .app-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15);
  }
  
  .sidebar-header {
    padding: 0 12px;
  }
  
  .logo-text {
    font-size: 20px;
  }
  
  :deep(.n-menu) {
    max-height: calc(100vh - 64px);
  }
}

@media (max-width: 480px) {
  .sidebar-header {
    padding: 0 8px;
  }
  
  .logo-icon {
    width: 28px;
    height: 28px;
  }
  
  .logo-text {
    font-size: 18px;
  }
}
</style>
