<script setup lang="ts">
import { ref } from 'vue'

const customRadio = ref('')
</script>

<template>
  <n-card title="Radio with Custom Labels">
    <n-space vertical :size="16">
      <n-radio-group v-model:value="customRadio">
        <n-space vertical :size="8">
          <n-radio value="premium">
            <template #default>
              <div>
                <div style="font-weight: 600">Premium Plan</div>
                <div style="font-size: 12px; color: var(--text-secondary)">
                  $9.99/month - All features included
                </div>
              </div>
            </template>
          </n-radio>
          <n-radio value="basic">
            <template #default>
              <div>
                <div style="font-weight: 600">Basic Plan</div>
                <div style="font-size: 12px; color: var(--text-secondary)">
                  Free - Basic features only
                </div>
              </div>
            </template>
          </n-radio>
        </n-space>
      </n-radio-group>
      <n-p>Selected plan: {{ customRadio || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>


