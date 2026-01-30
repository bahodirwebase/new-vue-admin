<template>
  <n-card title="Pagination Display Options">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Show Previous/Next
        </h3>
        <n-pagination
          v-model:page="pageNav"
          :page-count="10"
          show-prev
        />
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Custom Button Text
        </h3>
        <n-pagination :page-count="101">
          <template #prev> Go Prev </template>
          <template #next> Go Next </template>
        </n-pagination>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageNav = ref(1)
</script>
