<script setup lang="ts">

import BadgeTypes from './widgets/BadgeTypes.vue'
import BadgePositions from './widgets/BadgePositions.vue'
import DotBadges from './widgets/DotBadges.vue'
import BadgeWithCustomContent from './widgets/BadgeWithCustomContent.vue'
import BadgeOnAvatars from './widgets/BadgeOnAvatars.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Badge</h1>
        <p class="page-subtitle">Status indicators, notifications, and count badges</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
        <n-gi>
          <BadgeTypes />
          <BadgePositions />
        </n-gi>
        <n-gi>
          <DotBadges />
          <BadgeWithCustomContent />
          <BadgeOnAvatars />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>

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


</style>
