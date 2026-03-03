<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue";

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
      <PageHeader title="List" subtitle="Organized lists for displaying data, menus, and content" />

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
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
