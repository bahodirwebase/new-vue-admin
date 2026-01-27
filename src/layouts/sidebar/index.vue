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

// Resize handlerini alohida funksiyaga olamiz (unmount uchun muhim)
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => window.addEventListener("resize", handleResize));
onUnmounted(() => window.removeEventListener("resize", handleResize));

watch(
  () => props.collapsed,
  (val) => {
    if (val !== undefined) isCollapsed.value = val;
  },
);

watch(
  () => themeStore.isMiniSidebar,
  (val) => {
    if (!props.isMobile) isCollapsed.value = val;
  },
  { immediate: true },
);

const sidebarWidth = computed(() => {
  if (props.isMobile) return isCollapsed.value ? 0 : 240;
  return isCollapsed.value ? 80 : 240;
});

const activeKey = computed(() => route.name as string);

const handleMenuSelect = (key: string) => {
  if (!key.includes("-group")) {
    router.push({ name: key });
    if (props.isMobile) toggleSidebar(); // Mobileda bosilganda yopilishi kerak
  }
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit("update:collapsed", isCollapsed.value);
  emit("toggleSidebar");
};
</script>

<template>
  <div
    v-if="props.isMobile && !isCollapsed"
    class="sidebar-overlay"
    @click="toggleSidebar"
  />

  <n-layout-sider
    :collapsed="isCollapsed"
    :collapsed-width="80"
    :width="sidebarWidth"
    collapse-mode="width"
    class="app-sidebar"
    :inverted="themeStore.isDark"
    :position="props.isMobile ? 'fixed' : 'static'"
  >
    <SidebarHeader :collapsed="isCollapsed" />

    <n-scrollbar style="max-height: calc(100vh - 64px)">
      <n-menu
        :collapsed="isCollapsed"
        :collapsed-width="80"
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
  height: 100vh;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  z-index: 100;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  backdrop-filter: blur(2px);
}


:deep(.n-layout-sider-content) {
  display: flex;
  flex-direction: column;
}


:deep(.n-menu-item-group-title) {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  padding: 12px 18px 6px !important;
}


@media (max-width: 768px) {
  .app-sidebar[data-collapsed="true"] {
    transform: translateX(-100%);
  }
}
</style>
