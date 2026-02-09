<template>
  <n-card title="Pagination Sizes">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Small
        </h3>
        <n-pagination
          v-model:page="pageSmall"
          :page-count="10"
          size="small"
          :page-slot="6"
        />
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Medium (Default)
        </h3>
        <n-pagination
          v-model:page="pageMedium"
          :page-count="10"
          size="medium"
          :page-slot="6"
        />
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Large
        </h3>
        <n-pagination
          v-model:page="pageLarge"
          :page-count="10"
          size="large"
          :page-slot="6"
        />
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageSmall = ref(1)
const pageMedium = ref(1)
const pageLarge = ref(1)
</script>
