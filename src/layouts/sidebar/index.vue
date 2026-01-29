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

const emit = defineEmits(["update:collapsed", "toggleSidebar"]);

const route = useRoute();
const router = useRouter();
const themeStore = useThemeStore();

const windowWidth = ref(window.innerWidth);
const isCollapsed = ref(props.collapsed || false);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => window.addEventListener("resize", handleResize));
onUnmounted(() => window.removeEventListener("resize", handleResize));

// Prop o'zgarganda ichki holatni yangilash
watch(
  () => props.collapsed,
  (val) => {
    if (val !== undefined) isCollapsed.value = val;
  },
);

// Mini sidebar holati (Desktop uchun)
watch(
  () => themeStore.isMiniSidebar,
  (val) => {
    if (!props.isMobile) isCollapsed.value = val;
  },
  { immediate: true },
);

// Mobile-da sidebar ochilganda z-index va transformatsiyani boshqarish uchun kenglik
const sidebarWidth = computed(() => {
  if (props.isMobile) return 240; // Mobileda doim to'liq kenglik, transform bilan boshqariladi
  return isCollapsed.value ? 80 : 240;
});

const activeKey = computed(() => route.name as string);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit("update:collapsed", isCollapsed.value);
  emit("toggleSidebar");
};

const handleMenuSelect = (key: string) => {
  if (!key.includes("-group")) {
    router.push({ name: key });

    if (props.isMobile) {
      // Shunchaki o'zgaruvchini o'zgartirmasdan, toggleSidebar funksiyasini chaqiramiz
      // Bu emit orqali ota-onani ham, ichki holatni ham sinxronlaydi
      if (!isCollapsed.value) {
        toggleSidebar();
      }
    }
  }
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="props.isMobile && !isCollapsed"
      class="sidebar-overlay"
      @click="toggleSidebar"
    />
  </transition>

  <n-layout-sider
    :collapsed="isCollapsed"
    :collapsed-width="props.isMobile ? 0 : 80"
    :width="sidebarWidth"
    collapse-mode="width"
    class="app-sidebar"
    :inverted="themeStore.isDark"
    :position="props.isMobile ? 'fixed' : 'static'"
    :style="{
      zIndex: props.isMobile ? 1000 : 10,
      height: '100vh',
    }"
  >
    <SidebarHeader :collapsed="isCollapsed" />

    <n-scrollbar style="max-height: calc(100vh - 64px)" :scrollbar-props="{ size: 0 }">
      <n-menu
        :collapsed="isCollapsed"
        :collapsed-width="props.isMobile ? 0 : 80"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleMenuSelect"
        :inverted="themeStore.isDark"
        accordion
      />
    </n-scrollbar>
  </n-layout-sider>
</template>

<style scoped>
.app-sidebar {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  transition:
    all 0.3s var(--n-bezier) !important;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  backdrop-filter: blur(2px);
}

/* --- Mobile Logic --- */
@media (max-width: 768px) {
  .app-sidebar {
    position: fixed !important;
    left: 0;
    top: 0;
    bottom: 0;
    /* Yopilganda chapga suriladi */
    transform: translateX(-100%);
  }

  /* Ochiq holatda (n-layout-sider--collapsed klassi yo'q bo'lganda) */
  .app-sidebar:not(.n-layout-sider--collapsed) {
    transform: translateX(0);
    box-shadow: 8px 0 20px rgba(0, 0, 0, 0.2);
  }
}

/* --- Naive UI Deep Fixes --- */
:deep(.n-layout-sider-content) {
  display: flex;
  flex-direction: column;
}

/* Scrollbar ni hide qilish */
:deep(.n-scrollbar) {
  --n-scrollbar-width: 0px !important;
}

:deep(.n-scrollbar-rail) {
  display: none !important;
}

:deep(.n-scrollbar-container) {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

:deep(.n-scrollbar-container::-webkit-scrollbar) {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

:deep(.n-menu-item-group-title) {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--n-text-color-3);
  padding: 18px 18px 8px !important;
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
