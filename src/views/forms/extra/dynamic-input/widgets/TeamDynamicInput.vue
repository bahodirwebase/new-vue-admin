<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NDynamicInput } from 'naive-ui'

const teamMembers = ref([
  { name: 'John Doe', role: 'Developer' },
  { name: 'Jane Smith', role: 'Designer' }
])
const teamName = ref('')
const teamDescription = ref('')

const onCreate = () => {
  return {
    name: '',
    role: ''
  }
}
</script>

<template>
  <n-card title="Real World Example - Team Members">
    <n-space vertical :size="16">
      <div class="team-form">
        <n-dynamic-input 
          v-model:value="teamMembers" 
          @create="onCreate"
        >
          <template #default="{ value }">
            <div style="display: flex; gap: 8px; width: 100%;">
              <n-input 
                v-model:value="value.name" 
                placeholder="Name" 
                style="flex: 1" 
              />
              <n-input 
                v-model:value="value.role" 
                placeholder="Role" 
                style="width: 150px" 
              />
            </div>
          </template>
        </n-dynamic-input>

        <n-input v-model:value="teamName" placeholder="Team name" style="margin-top: 12px;" />
        <n-input 
          v-model:value="teamDescription" 
          type="textarea" 
          placeholder="Team description" 
          :rows="3"
          style="margin-top: 12px;" 
        />
      </div>
    </n-space>
  </n-card>
</template>

<style scoped>
.team-form {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}
</style>
