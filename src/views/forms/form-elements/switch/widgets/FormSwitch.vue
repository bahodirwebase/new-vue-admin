<template>
  <n-card title="Switch in Form">
    <n-space vertical :size="16">
      <n-form :model="formData" label-placement="left" label-width="120">
        <n-form-item label="Notifications">
          <n-switch v-model:value="formData.notifications" />
        </n-form-item>
        <n-form-item label="Email Updates">
          <n-switch v-model:value="formData.emailUpdates" />
        </n-form-item>
        <n-form-item label="Dark Mode">
          <n-switch v-model:value="formData.darkMode" />
        </n-form-item>
        <n-form-item label="Auto Save">
          <n-switch v-model:value="formData.autoSave" />
        </n-form-item>
      </n-form>
      <n-code :code="JSON.stringify(formData, null, 2)" language="json" />
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
  notifications: false,
  emailUpdates: true,
  darkMode: false,
  autoSave: true
})
</script>

<style scoped>
.n-code {
  margin-top: 8px;
}
</style>
