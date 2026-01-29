<script setup lang="ts">
import { NSpace, NButton, NIcon } from 'naive-ui'
import {
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
  VideocamOutline
} from '@vicons/ionicons5'
</script>

<template>
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
</template>
