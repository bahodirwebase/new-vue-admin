<script setup lang="ts">
import { ref } from 'vue'
import { CheckmarkOutline, CloseOutline } from '@vicons/ionicons5'

const labeledSwitch = ref(false)
const iconSwitch = ref(false)
</script>

<template>
  <n-card title="Switch with Labels">
    <n-space vertical :size="16">
      <n-switch v-model:value="labeledSwitch">
        <template #checked>Enabled</template>
        <template #unchecked>Disabled</template>
      </n-switch>
      <n-switch v-model:value="iconSwitch">
        <template #checked>
          <n-icon :component="CheckmarkOutline" />
        </template>
        <template #unchecked>
          <n-icon :component="CloseOutline" />
        </template>
      </n-switch>
    </n-space>
  </n-card>
</template>
