<script setup lang="ts">
import { NGrid, NGi, NStatistic } from 'naive-ui'

interface Props {
  totalUsers: number
  activeUsers: number
  pendingUsers: number
  inactiveUsers: number
}

defineProps<Props>()
</script>

<template>
  <n-grid cols="1 sm:2 md:4" responsive="screen" :x-gap="16" class="statistics-grid mt-6">
    <n-gi>
      <n-statistic label="Total Users" :value="totalUsers" />
    </n-gi>
    <n-gi>
      <n-statistic label="Active Users" :value="activeUsers" />
    </n-gi>
    <n-gi>
      <n-statistic label="Pending Users" :value="pendingUsers" />
    </n-gi>
    <n-gi>
      <n-statistic label="Inactive Users" :value="inactiveUsers" />
    </n-gi>
  </n-grid>
</template>
