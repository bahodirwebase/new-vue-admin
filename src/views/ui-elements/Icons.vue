<template>
  <div class="icons-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Icons</h1>
        <p class="page-subtitle">Icon library and usage examples</p>
      </div>

      <n-card title="Ionicons 5">
        <n-space vertical :size="16">
          <h4>Popular Icons</h4>
          <n-grid :cols="gridCols" :x-gap="16" :y-gap="16">
            <n-grid-item v-for="icon in popularIcons" :key="icon.name">
              <div class="icon-item">
                <div class="icon-container">
                  <n-icon :component="icon.component" :size="24" />
                </div>
                <div class="icon-name">{{ icon.name }}</div>
              </div>
            </n-grid-item>
          </n-grid>
        </n-space>
      </n-card>

      <n-card title="Icon Sizes">
        <n-space vertical :size="16">
          <h4>Different Icon Sizes</h4>
          <n-space :size="24">
            <div class="size-example">
              <n-icon :component="HomeOutline" :size="12" />
              <span class="size-label">12px</span>
            </div>
            <div class="size-example">
              <n-icon :component="HomeOutline" :size="16" />
              <span class="size-label">16px</span>
            </div>
            <div class="size-example">
              <n-icon :component="HomeOutline" :size="20" />
              <span class="size-label">20px</span>
            </div>
            <div class="size-example">
              <n-icon :component="HomeOutline" :size="24" />
              <span class="size-label">24px</span>
            </div>
            <div class="size-example">
              <n-icon :component="HomeOutline" :size="32" />
              <span class="size-label">32px</span>
            </div>
            <div class="size-example">
              <n-icon :component="HomeOutline" :size="48" />
              <span class="size-label">48px</span>
            </div>
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Icon Colors">
        <n-space vertical :size="16">
          <h4>Icon Color Variations</h4>
          <n-space :size="24">
            <div class="color-example">
              <n-icon :component="HeartOutline" :size="24" style="color: var(--color-primary)" />
              <span class="color-label">Primary</span>
            </div>
            <div class="color-example">
              <n-icon :component="HeartOutline" :size="24" style="color: var(--color-success)" />
              <span class="color-label">Success</span>
            </div>
            <div class="color-example">
              <n-icon :component="HeartOutline" :size="24" style="color: var(--color-warning)" />
              <span class="color-label">Warning</span>
            </div>
            <div class="color-example">
              <n-icon :component="HeartOutline" :size="24" style="color: var(--color-error)" />
              <span class="color-label">Error</span>
            </div>
            <div class="color-example">
              <n-icon :component="HeartOutline" :size="24" style="color: var(--color-info)" />
              <span class="color-label">Info</span>
            </div>
            <div class="color-example">
              <n-icon :component="HeartOutline" :size="24" style="color: var(--text-secondary)" />
              <span class="color-label">Secondary</span>
            </div>
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Navigation Icons">
        <n-grid :cols="gridCols" :x-gap="16" :y-gap="16">
          <n-grid-item v-for="icon in navigationIcons" :key="icon.name">
            <div class="icon-item">
              <div class="icon-container">
                <n-icon :component="icon.component" :size="24" />
              </div>
              <div class="icon-name">{{ icon.name }}</div>
            </div>
          </n-grid-item>
        </n-grid>
      </n-card>

      <n-card title="Action Icons">
        <n-grid :cols="gridCols" :x-gap="16" :y-gap="16">
          <n-grid-item v-for="icon in actionIcons" :key="icon.name">
            <div class="icon-item">
              <div class="icon-container">
                <n-icon :component="icon.component" :size="24" />
              </div>
              <div class="icon-name">{{ icon.name }}</div>
            </div>
          </n-grid-item>
        </n-grid>
      </n-card>

      <n-card title="Social Icons">
        <n-grid :cols="gridCols" :x-gap="16" :y-gap="16">
          <n-grid-item v-for="icon in socialIcons" :key="icon.name">
            <div class="icon-item">
              <div class="icon-container">
                <n-icon :component="icon.component" :size="24" />
              </div>
              <div class="icon-name">{{ icon.name }}</div>
            </div>
          </n-grid-item>
        </n-grid>
      </n-card>

      <n-card title="Icon Usage Examples">
        <n-space vertical :size="20">
          <div>
            <h4>Icons in Buttons</h4>
            <n-space :size="12">
              <n-button type="primary">
                <template #icon>
                  <n-icon :component="AddOutline" />
                </template>
                Add
              </n-button>
              <n-button type="success">
                <template #icon>
                  <n-icon :component="CheckmarkOutline" />
                </template>
                Save
              </n-button>
              <n-button type="warning">
                <template #icon>
                  <n-icon :component="WarningOutline" />
                </template>
                Warning
              </n-button>
              <n-button type="error">
                <template #icon>
                  <n-icon :component="TrashOutline" />
                </template>
                Delete
              </n-button>
            </n-space>
          </div>

          <div>
            <h4>Icon Buttons</h4>
            <n-space :size="12">
              <n-button circle>
                <template #icon>
                  <n-icon :component="SearchOutline" />
                </template>
              </n-button>
              <n-button circle type="primary">
                <template #icon>
                  <n-icon :component="SettingsOutline" />
                </template>
              </n-button>
              <n-button circle type="success">
                <template #icon>
                  <n-icon :component="DownloadOutline" />
                </template>
              </n-button>
              <n-button circle quaternary>
                <template #icon>
                  <n-icon :component="NotificationsOutline" />
                </template>
              </n-button>
            </n-space>
          </div>

          <div>
            <h4>Icons with Text</h4>
            <n-space :size="16" vertical>
              <div class="icon-with-text">
                <n-icon :component="CheckmarkCircleOutline" :size="20" style="color: var(--color-success)" />
                <span>Task completed successfully</span>
              </div>
              <div class="icon-with-text">
                <n-icon :component="AlertCircleOutline" :size="20" style="color: var(--color-warning)" />
                <span>Please review your input</span>
              </div>
              <div class="icon-with-text">
                <n-icon :component="InformationCircleOutline" :size="20" style="color: var(--color-info)" />
                <span>Additional information available</span>
              </div>
              <div class="icon-with-text">
                <n-icon :component="CloseCircleOutline" :size="20" style="color: var(--color-error)" />
                <span>Action failed</span>
              </div>
            </n-space>
          </div>

          <div>
            <h4>Icon Lists</h4>
            <n-space :size="16" vertical>
              <div class="icon-list-item">
                <n-icon :component="FolderOutline" :size="16" />
                <span>Documents</span>
              </div>
              <div class="icon-list-item">
                <n-icon :component="ImageOutline" :size="16" />
                <span>Images</span>
              </div>
              <div class="icon-list-item">
                <n-icon :component="MusicalNotesOutline" :size="16" />
                <span>Music</span>
              </div>
              <div class="icon-list-item">
                <n-icon :component="VideocamOutline" :size="16" />
                <span>Videos</span>
              </div>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Animated Icons">
        <n-space vertical :size="16">
          <h4>Icon Animations</h4>
          <n-space :size="24">
            <div class="animated-icon spin">
              <n-icon :component="RefreshOutline" :size="32" />
            </div>
            <div class="animated-icon pulse">
              <n-icon :component="HeartOutline" :size="32" style="color: var(--color-error)" />
            </div>
            <div class="animated-icon bounce">
              <n-icon :component="StarOutline" :size="32" style="color: var(--color-warning)" />
            </div>
            <div class="animated-icon shake">
              <n-icon :component="NotificationsOutline" :size="32" style="color: var(--color-info)" />
            </div>
          </n-space>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  HomeOutline,
  HeartOutline,
  AddOutline,
  CheckmarkOutline,
  WarningOutline,
  TrashOutline,
  SearchOutline,
  SettingsOutline,
  DownloadOutline,
  NotificationsOutline,
  CheckmarkCircleOutline,
  AlertCircleOutline,
  InformationCircleOutline,
  CloseCircleOutline,
  FolderOutline,
  ImageOutline,
  MusicalNotesOutline,
  VideocamOutline,
  RefreshOutline,
  StarOutline,
  // Navigation Icons
  GridOutline,
  MenuOutline,
  ListOutline,
  EllipsisHorizontalOutline,
  ChevronBackOutline,
  ChevronForwardOutline,
  ChevronUpOutline,
  ChevronDownOutline,
  // Action Icons
  CreateOutline,
  PencilOutline,
  SaveOutline,
  CopyOutline,
  ShareOutline,
  PrintOutline,
  Download,
  CloudUploadOutline,
  // Social Icons
  MailOutline,
  CallOutline,
  PersonOutline,
  PeopleOutline,
  TimeOutline,
  CalendarOutline,
  LocationOutline,
  CameraOutline
} from '@vicons/ionicons5'

const windowWidth = ref(window.innerWidth)

const gridCols = computed(() => {
  if (windowWidth.value < 480) return 2
  if (windowWidth.value < 768) return 4
  return 6
})

onMounted(() => {
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {})
})

const popularIcons = [
  { name: 'Home', component: HomeOutline },
  { name: 'Heart', component: HeartOutline },
  { name: 'Search', component: SearchOutline },
  { name: 'Settings', component: SettingsOutline },
  { name: 'Notifications', component: NotificationsOutline },
  { name: 'Menu', component: MenuOutline },
  { name: 'User', component: PersonOutline },
  { name: 'Users', component: PeopleOutline },
  { name: 'Star', component: StarOutline },
  { name: 'Time', component: TimeOutline },
  { name: 'Calendar', component: CalendarOutline },
  { name: 'Location', component: LocationOutline },
  { name: 'Camera', component: CameraOutline },
  { name: 'Mail', component: MailOutline },
  { name: 'Call', component: CallOutline },
  { name: 'Grid', component: GridOutline },
  { name: 'List', component: ListOutline },
  { name: 'Folder', component: FolderOutline },
  { name: 'Image', component: ImageOutline },
  { name: 'Video', component: VideocamOutline },
  { name: 'Music', component: MusicalNotesOutline },
  { name: 'Document', component: CreateOutline },
  { name: 'Download', component: Download },
  { name: 'Upload', component: CloudUploadOutline },
  { name: 'Share', component: ShareOutline },
  { name: 'Print', component: PrintOutline },
  { name: 'Copy', component: CopyOutline },
  { name: 'Save', component: SaveOutline },
  { name: 'Edit', component: PencilOutline },
  { name: 'Delete', component: TrashOutline },
  { name: 'Add', component: AddOutline },
  { name: 'Check', component: CheckmarkOutline },
  { name: 'Close', component: CloseCircleOutline },
  { name: 'Warning', component: WarningOutline },
  { name: 'Info', component: InformationCircleOutline },
  { name: 'Success', component: CheckmarkCircleOutline },
  { name: 'Error', component: AlertCircleOutline },
  { name: 'Refresh', component: RefreshOutline },
  { name: 'Back', component: ChevronBackOutline },
  { name: 'Forward', component: ChevronForwardOutline },
  { name: 'Up', component: ChevronUpOutline },
  { name: 'Down', component: ChevronDownOutline }
]

const navigationIcons = [
  { name: 'Grid', component: GridOutline },
  { name: 'List', component: ListOutline },
  { name: 'Menu', component: MenuOutline },
  { name: 'Ellipsis', component: EllipsisHorizontalOutline },
  { name: 'ChevronBack', component: ChevronBackOutline },
  { name: 'ChevronForward', component: ChevronForwardOutline },
  { name: 'ChevronUp', component: ChevronUpOutline },
  { name: 'ChevronDown', component: ChevronDownOutline },
  { name: 'Time', component: TimeOutline },
  { name: 'Calendar', component: CalendarOutline },
  { name: 'Location', component: LocationOutline },
  { name: 'Camera', component: CameraOutline }
]

const actionIcons = [
  { name: 'Create', component: CreateOutline },
  { name: 'Edit', component: PencilOutline },
  { name: 'Save', component: SaveOutline },
  { name: 'Copy', component: CopyOutline },
  { name: 'Share', component: ShareOutline },
  { name: 'Print', component: PrintOutline },
  { name: 'Download', component: Download },
  { name: 'Upload', component: CloudUploadOutline },
  { name: 'Add', component: AddOutline },
  { name: 'Checkmark', component: CheckmarkOutline },
  { name: 'Warning', component: WarningOutline },
  { name: 'Trash', component: TrashOutline }
]

const socialIcons = [
  { name: 'Mail', component: MailOutline },
  { name: 'Call', component: CallOutline },
  { name: 'Person', component: PersonOutline },
  { name: 'People', component: PeopleOutline },
  { name: 'Heart', component: HeartOutline },
  { name: 'Star', component: StarOutline }
]
</script>

<style scoped>
.icons-page {
  max-width: 100%;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-primary);
  transition: all 0.2s ease;
}

.icon-item:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-primary);
}

.icon-name {
  font-size: 12px;
  color: var(--text-secondary);
  text-align: center;
  word-break: break-word;
}

.size-example,
.color-example {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-primary);
  min-width: 80px;
}

.size-label,
.color-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.icon-with-text {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-primary);
}

.icon-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: var(--bg-primary);
  transition: background-color 0.2s ease;
}

.icon-list-item:hover {
  background-color: var(--bg-tertiary);
}

.animated-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-primary);
}

.animated-icon.spin {
  animation: spin 2s linear infinite;
}

.animated-icon.pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

.animated-icon.bounce {
  animation: bounce 1s ease-in-out infinite;
}

.animated-icon.shake {
  animation: shake 0.5s ease-in-out infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Dark theme adjustments */
[data-theme="dark"] .icon-item,
[data-theme="dark"] .size-example,
[data-theme="dark"] .color-example,
[data-theme="dark"] .icon-with-text,
[data-theme="dark"] .icon-list-item,
[data-theme="dark"] .animated-icon {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
}
</style>
