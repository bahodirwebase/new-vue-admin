<template>
  <n-card title="Real World Example - Project">
    <n-space vertical :size="16">
      <div class="project-form">
        <n-form-item label="Project Name" :show-feedback="false">
          <n-input v-model:value="projectName" placeholder="Enter project name" />
        </n-form-item>

        <n-form-item label="Technologies" :show-feedback="false" style="margin-top: 16px;">
          <CustomDynamicTags v-model:value="projectTags" :max="8" variant="filled"
            :suggestions="['Vue', 'React', 'Angular', 'Node', 'Python', 'Go', 'Java', 'Docker', 'K8s']"
            placeholder="Add technology stack..." />
        </n-form-item>

        <n-form-item label="Description" :show-feedback="false" style="margin-top: 16px;">
          <n-input v-model:value="projectDescription" type="textarea" placeholder="Project details..." :rows="3" />
        </n-form-item>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomDynamicTags from '@/components/CustomDynamicTags.vue'

const projectName = ref('')
const projectTags = ref(['Frontend', 'Vue.js'])
const projectDescription = ref('')
</script>

<style scoped>
.project-form {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  background: var(--bg-secondary);
}
</style>
