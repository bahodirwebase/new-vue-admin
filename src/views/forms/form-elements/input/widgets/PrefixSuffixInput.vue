<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutline, PersonOutline, MailOutline } from '@vicons/ionicons5'

const searchValue = ref('')
const userValue = ref('')
const emailInput = ref('')
</script>

<template>
  <n-card title="Input with Prefix and Suffix">
    <n-space vertical :size="16">
      <n-input v-model:value="searchValue" placeholder="Search...">
        <template #prefix>
          <n-icon :component="SearchOutline" />
        </template>
      </n-input>
      <n-input v-model:value="userValue" placeholder="Username">
        <template #prefix>
          <n-icon :component="PersonOutline" />
        </template>
      </n-input>
      <n-input v-model:value="emailInput" placeholder="Email address">
        <template #suffix>
          <n-icon :component="MailOutline" />
        </template>
      </n-input>
    </n-space>
  </n-card>
</template>