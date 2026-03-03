<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue";

import VerticalMenu from './widgets/VerticalMenu.vue'
import MenuWithIcons from './widgets/MenuWithIcons.vue'
import CollapsibleMenu from './widgets/CollapsibleMenu.vue'
import HorizontalMenu from './widgets/HorizontalMenu.vue'
import MenuStyles from './widgets/MenuStyles.vue'
import MenuWithBadges from './widgets/MenuWithBadges.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <PageHeader title="Menu" subtitle="Navigation menus for organizing content and features" />

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <VerticalMenu />
          <MenuWithIcons />
          <CollapsibleMenu />
        </n-gi>
        <n-gi>
          <HorizontalMenu />
          <MenuStyles />
          <MenuWithBadges />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
