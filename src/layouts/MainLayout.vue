<template>
  <n-layout has-sider class="main-layout">
    <AppSidebar
      :collapsed="isCollapsed"
      :is-mobile="isMobile"
      @toggle-sidebar="toggleSidebar"
    />
    <n-layout>
      <AppHeader @toggle-sidebar="toggleSidebar" />
      <n-layout-content :class="contentClass" :content-style="contentStyle">
        <router-view v-slot="{ Component }">
          <transition :name="themeStore.pageAnimation" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
    <CustomizerButton @toggle="handleCustomizerToggle" />
    <CustomizerSidebar :is-open="isCustomizerOpen" @close="closeCustomizer" />
  </n-layout>
</template>

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
  const handleResize = () => {
    windowWidth.value = window.innerWidth;
  };
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", () => {});
});

const contentClass = computed(() => {
  return themeStore.isBoxed ? "boxed-content" : "full-content";
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

<style scoped>
.main-layout {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  overflow-x: hidden;
  width: 100%;
}

.boxed-content {
  max-width: 1400px;
  margin: 0 auto;
}

.full-content {
  width: auto;
  flex: 1 1 auto;
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

  .boxed-content {
    max-width: 100%;
    padding: 0 8px;
  }
}

@media (max-width: 480px) {
  .boxed-content {
    padding: 0 4px;
  }
}
</style>
