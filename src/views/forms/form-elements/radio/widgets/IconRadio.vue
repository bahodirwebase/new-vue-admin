<template>
  <n-card title="Radio with Icons">
    <n-space vertical :size="16">
      <n-radio-group v-model:value="iconRadio">
        <n-radio value="home">
          <template #default>
            <n-space align="center" :size="8">
              <n-icon :component="HomeOutline" />
              <span>Home</span>
            </n-space>
          </template>
        </n-radio>
        <n-radio value="work">
          <template #default>
            <n-space align="center" :size="8">
              <n-icon :component="BriefcaseOutline" />
              <span>Work</span>
            </n-space>
          </template>
        </n-radio>
        <n-radio value="school">
          <template #default>
            <n-space align="center" :size="8">
              <n-icon :component="SchoolOutline" />
              <span>School</span>
            </n-space>
          </template>
        </n-radio>
      </n-radio-group>
      <n-p>Selected location: {{ iconRadio || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeOutline, BriefcaseOutline, SchoolOutline } from '@vicons/ionicons5'

const iconRadio = ref('')
</script>
