<script setup lang="ts">
import { NSpace, NIcon } from 'naive-ui'
import { RefreshOutline, HeartOutline, StarOutline, NotificationsOutline } from '@vicons/ionicons5'
</script>

<template>
  <div>
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
  </div>
</template>
