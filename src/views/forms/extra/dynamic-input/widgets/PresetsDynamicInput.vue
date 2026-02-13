<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NDynamicInput, NCard, NSpace, NP } from 'naive-ui'

const presetValue = ref(['user@example.com'])
</script>

<template>
  <n-card title="Dynamic Input with Custom UI">
    <n-space vertical :size="16">
      
      <n-dynamic-input v-model:value="presetValue" placeholder="Enter email">
        <template #default="{ value, updateValue }">
          <n-input
            :value="value"
            @update:value="updateValue"
            placeholder="Enter email address"
          />
        </template>
      </n-dynamic-input>

      <n-p>Emails: {{ JSON.stringify(presetValue) }}</n-p>
    </n-space>
  </n-card>
</template>