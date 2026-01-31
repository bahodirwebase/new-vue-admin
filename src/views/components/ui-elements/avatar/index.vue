<script setup lang="ts">

import AvatarSizes from './widgets/AvatarSizes.vue'
import AvatarGroups from './widgets/AvatarGroups.vue'
import AvatarTypes from './widgets/AvatarTypes.vue'
import AvatarWithBadge from './widgets/AvatarWithBadge.vue'
import AvatarWithFallback from './widgets/AvatarWithFallback.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Avatar</h1>
        <p class="page-subtitle">
          User profile images, initials, and status indicators
        </p>
      </div>
      <n-grid x-gap="12" cols="1 sm:2" responsive="screen" >
        <n-gi>
          <AvatarSizes />
          <AvatarGroups />
          <AvatarWithFallback />
        </n-gi>
        <n-gi>
          <AvatarTypes />
          <AvatarWithBadge />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>

</style>
