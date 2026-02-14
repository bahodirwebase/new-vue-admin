<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useThemeStore } from "@/stores/theme";
import AppSidebar from "@/layouts/sidebar/index.vue";
import AppHeader from "@/layouts/navbar/index.vue";
import CustomizerButton from "@/layouts/customizer/CustomizerButton.vue";
import CustomizerSidebar from "@/layouts/customizer/CustomizerSidebar.vue";

const themeStore = useThemeStore();
const windowWidth = ref(window.innerWidth);
const isCollapsed = ref(true);
const isCustomizerOpen = ref(false);

// Store resize handler reference to prevent memory leak
let resizeHandler: (() => void) | null = null;

const isMobile = computed(() => windowWidth.value < 768);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleCustomizerToggle = () => {
  isCustomizerOpen.value = !isCustomizerOpen.value;
};

const closeCustomizer = () => {
  isCustomizerOpen.value = false;
};

onMounted(() => {
  resizeHandler = () => {
    windowWidth.value = window.innerWidth;
  };
  window.addEventListener("resize", resizeHandler);
});

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
    resizeHandler = null;
  }
});

const contentClass = computed(() => {
  return "full-content";
});

const contentStyle = computed(() => {
  return {
    padding: isMobile.value ? "16px 8px 16px 16px" : "24px 16px 24px 24px",
    height: "calc(100vh - 64px)",
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "border-box",
    width: "auto",
    flex: "1 1 auto",
    backgroundColor: "var(--bg-secondary)",
  };
});
</script>
<template>
  <n-layout has-sider class="main-layout">
    <AppSidebar :collapsed="isCollapsed" :is-mobile="isMobile" @toggle-sidebar="toggleSidebar" />
    <n-layout>
      <AppHeader @toggle-sidebar="toggleSidebar" />
      <n-layout-content :class="contentClass" :content-style="contentStyle">
        <div :class="themeStore.isBoxed ? 'boxed-wrapper' : 'full-wrapper'">
          <router-view v-slot="{ Component }">
            <transition :name="themeStore.pageAnimation" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </n-layout-content>
    </n-layout>
    <CustomizerButton @toggle="handleCustomizerToggle" />
    <CustomizerSidebar :is-open="isCustomizerOpen" @close="closeCustomizer" />
  </n-layout>
</template>
<style scoped>
.main-layout {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  overflow-x: hidden;
  width: 100%;
}

.full-content {
  width: auto;
  flex: 1 1 auto;
}

.boxed-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.full-wrapper {
  width: 100%;
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-layout {
    overflow-x: auto;
  }
}
</style>
