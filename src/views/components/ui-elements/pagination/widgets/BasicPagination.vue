<template>
  <n-card title="Basic Pagination">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Default Pagination
        </h3>
        <n-space align="center">
          <n-pagination v-model:page="page1" :page-count="12" />
          <span class="page-indicator">Page {{ page1 }} of 12</span>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          With Page Size
        </h3>
        <n-space align="center">
          <n-pagination
            v-model:page="page2"
            :page-count="20"
            :page-size="10"
          />
          <span class="page-indicator">Page {{ page2 }} of 20</span>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const page1 = ref(1)
const page2 = ref(1)
</script>

<style scoped>
.page-indicator {
  color: var(--text-secondary);
  font-size: 14px;
}
</style>
