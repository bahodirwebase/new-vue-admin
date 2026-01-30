<script setup lang="ts">

import BasicList from './widgets/BasicList.vue'
import ListWithIcons from './widgets/ListWithIcons.vue'
import ListWithBadges from './widgets/ListWithBadges.vue'
import ListWithActions from './widgets/ListWithActions.vue'
import ListWithAvatars from './widgets/ListWithAvatars.vue'
import ClickableList from './widgets/ClickableList.vue'
import ComplexList from './widgets/ComplexList.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">List</h1>
        <p class="page-subtitle">Organized lists for displaying data, menus, and content</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
        <n-gi>
          <BasicList />
          <ListWithIcons />
          <ListWithBadges />
        </n-gi>
        <n-gi>
          <ListWithActions />
          <ListWithAvatars />
          <ClickableList />
        </n-gi>
      </n-grid>

      <ComplexList />
    </n-space>
  </div>
</template>
