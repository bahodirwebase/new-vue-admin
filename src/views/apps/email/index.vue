<template>
  <div class="mail-app">
    <!-- Mobile sidebar backdrop -->
    <transition name="fade-overlay">
      <div
        v-if="isMobile && sidebarOpen"
        class="mail-backdrop"
        @click="sidebarOpen = false"
      />
    </transition>

    <!-- ── Sidebar ─────────────────────────────────────────────── -->
    <div class="mail-sidebar-wrap" :class="{ 'is-open': sidebarOpen }">
      <MailSidebar
        :folders="store.foldersWithCount.value"
        :labels="store.labels.value"
        :active-folder="store.currentFolder.value"
        :active-label="store.currentLabel.value"
        @compose="openCompose('new')"
        @folder-select="onFolderSelect"
        @label-select="onLabelSelect"
      />
    </div>

    <!-- ── Main area ───────────────────────────────────────────── -->
    <div class="mail-main" :class="{ 'show-detail': !!store.selectedEmail.value && isMobile }">

      <!-- Email list panel -->
      <div
        class="mail-list-panel"
        :class="{ 'is-hidden-mobile': isMobile && !!store.selectedEmail.value }"
      >
        <!-- Mobile topbar -->
        <div v-if="isMobile" class="mobile-topbar">
          <n-button text @click="sidebarOpen = true">
            <template #icon><n-icon :component="MenuOutline" size="22" /></template>
          </n-button>
          <span class="topbar-title">{{ folderTitle }}</span>
          <n-button text @click="openCompose('new')">
            <template #icon><n-icon :component="CreateOutline" size="22" /></template>
          </n-button>
        </div>

        <MailList
          :emails="store.paginatedEmails.value"
          :loading="store.loading.value"
          :selected-id="store.selectedEmail.value?.id"
          :checked-ids="store.selectedIds.value"
          :all-selected="store.allSelected.value"
          :current-folder="store.currentFolder.value"
          :total-pages="store.totalPages.value"
          :current-page="store.currentPage.value"
          @select="store.openEmail"
          @toggle-check="store.toggleCheck"
          @check-all="store.checkAll"
          @search="store.search"
          @star="store.toggleStar"
          @bulk-delete="store.bulkTrash"
          @bulk-archive="store.bulkArchive"
          @bulk-read="store.bulkRead"
          @page-change="store.setPage"
        />
      </div>

      <!-- Email detail panel -->
      <div class="mail-detail-panel">
        <MailReader
          :email="store.selectedEmail.value"
          @back="store.closeEmail"
          @toggle-star="store.toggleStar"
          @delete="store.moveToTrash"
          @archive="store.archive"
          @mark-read="store.markRead"
          @reply="openCompose('reply')"
          @forward="openCompose('forward')"
        />
      </div>
    </div>

    <!-- ── Compose window ──────────────────────────────────────── -->
    <transition name="compose-rise">
      <MailCompose
        v-if="composeVisible"
        :mode="composeMode"
        :reply-to="store.selectedEmail.value"
        @close="composeVisible = false"
        @sent="composeVisible = false"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NButton, NIcon } from 'naive-ui'
import { MenuOutline, CreateOutline } from '@vicons/ionicons5'
import MailSidebar   from './widgets/MailSidebar.vue'
import MailList      from './widgets/MailList.vue'
import MailReader    from './widgets/MailReader.vue'
import MailCompose   from './widgets/MailCompose.vue'
import { useMailStore } from './composables/useMailStore'
import type { ComposeMode } from './types'

const store = useMailStore()

const sidebarOpen    = ref(false)
const composeVisible = ref(false)
const composeMode    = ref<ComposeMode>('new')
const windowWidth    = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 1024)

const folderTitle = computed(() => {
  const folder = store.foldersWithCount.value.find(f => f.id === store.currentFolder.value)
  return folder?.name ?? 'Inbox'
})

function onFolderSelect(id: string) {
  store.selectFolder(id)
  sidebarOpen.value = false
}

function onLabelSelect(id: string) {
  store.selectLabel(id)
  sidebarOpen.value = false
}

function openCompose(mode: ComposeMode) {
  composeMode.value    = mode
  composeVisible.value = true
}

function onResize() { windowWidth.value = window.innerWidth }

onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))
</script>

<style scoped lang="scss">
/* ── Root layout ── */
.mail-app {
  display: flex;
  height: calc(100vh - 64px - 32px); /* subtract navbar + page padding */
  overflow: hidden;
  position: relative;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  margin: 16px;
}

/* ── Backdrop (mobile) ── */
.mail-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
}

/* ── Sidebar wrapper ── */
.mail-sidebar-wrap {
  width: 240px;
  flex-shrink: 0;
  height: 100%;
  overflow: hidden;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  border-radius: 14px 0 0 14px;
}

/* ── Main area ── */
.mail-main {
  flex: 1;
  display: flex;
  min-width: 0;
  overflow: hidden;
}

/* ── List panel ── */
.mail-list-panel {
  width: 360px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-right: 1px solid var(--border-color);
}

/* ── Detail panel ── */
.mail-detail-panel {
  flex: 1;
  height: 100%;
  overflow: hidden;
  min-width: 0;
}

/* ── Mobile topbar ── */
.mobile-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
  flex-shrink: 0;
}

.topbar-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
}

/* ── Compose transition ── */
.compose-rise-enter-active,
.compose-rise-leave-active {
  transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.22s;
}
.compose-rise-enter-from,
.compose-rise-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* ── Fade overlay ── */
.fade-overlay-enter-active,
.fade-overlay-leave-active { transition: opacity 0.2s; }
.fade-overlay-enter-from,
.fade-overlay-leave-to     { opacity: 0; }

/* ── Responsive: tablet/mobile (<1024px) ── */
@media (max-width: 1023px) {
  .mail-sidebar-wrap {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    transform: translateX(-100%);

    &.is-open { transform: translateX(0); }
  }

  .mail-list-panel {
    width: 100%;
    flex-shrink: unset;
    border-right: none;

    &.is-hidden-mobile { display: none; }
  }

  .mail-detail-panel {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: none;
  }

  .mail-main.show-detail .mail-detail-panel {
    display: flex;
    flex-direction: column;
  }
}

/* ── Responsive: small desktop (1024–1200px): hide list width limit ── */
@media (min-width: 1024px) and (max-width: 1280px) {
  .mail-list-panel { width: 300px; }
}
</style>
