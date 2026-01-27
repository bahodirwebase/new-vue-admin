<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useThemeStore } from "@/stores/theme";

import menuOptions from "./menu-options";
import SidebarHeader from "./components/SidebarHeader.vue";

const props = defineProps<{
  collapsed?: boolean;
  isMobile?: boolean;
}>();

const emit = defineEmits<{
  "update:collapsed": [value: boolean];
  toggleSidebar: [];
}>();

const route = useRoute();
const router = useRouter();
const themeStore = useThemeStore();

const windowWidth = ref(window.innerWidth);
const isCollapsed = ref(props.collapsed || false);

const isMobileComputed = computed(() => windowWidth.value < 768);

watch(
  () => props.collapsed,
  (val) => {
    if (val !== undefined) {
      isCollapsed.value = val;
    }
  },
);

watch(
  () => themeStore.isMiniSidebar,
  (val) => {
    if (!props.isMobile) {
      isCollapsed.value = val;
    }
  },
  { immediate: true },
);

watch(isMobileComputed, (val) => {
  if (val) {
    isCollapsed.value = true;
    emit("update:collapsed", true);
  }
});

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit("update:collapsed", isCollapsed.value);
  emit("toggleSidebar");
};

onMounted(() => {
  const handleResize = () => {
    windowWidth.value = window.innerWidth;
  };
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", () => {});
});

const collapsedWidth = computed(() => 80);
const sidebarWidth = computed(() => {
  if (props.isMobile) {
    return isCollapsed.value ? 0 : 240;
  }
  return themeStore.isMiniSidebar ? 80 : 240;
});

const activeKey = computed(() => route.name as string);

const handleMenuSelect = (key: string) => {
  // Ignore group keys, only navigate to actual routes
  if (!key.includes("-group")) {
    router.push({ name: key });
  }
};
</script>
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
    <SidebarHeader :collapsed="isCollapsed" />

    <n-menu
      :collapsed="isCollapsed"
      :collapsed-width="collapsedWidth"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :value="activeKey"
      @update:value="handleMenuSelect"
      :inverted="themeStore.isDark"
      accordion
      :indent="24"
    />
  </n-layout-sider>
</template>

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
}

.n-layout-sider {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

:deep(.n-layout-sider-content) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

:deep(.n-menu) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
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

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* Keep menu scrollable under the fixed header */
:deep(.n-menu) {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

:deep(.n-menu-item) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

:deep(.n-menu-item-content) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Custom scrollbar that doesn't take up width */
:deep(.n-menu)::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

:deep(.n-menu)::-webkit-scrollbar-track {
  background: transparent;
}

:deep(.n-menu)::-webkit-scrollbar-thumb {
  background: transparent;
  width: 0px;
}

/* Hide scrollbar for Firefox */
:deep(.n-menu) {
  scrollbar-width: none;
  -ms-overflow-style: none;
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

  :deep(.n-menu) {
    max-height: calc(100vh - 64px);
  }
}

</style>
