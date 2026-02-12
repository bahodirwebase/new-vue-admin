<script setup lang="ts">
import { ref } from 'vue'
import { PersonOutline, CreateOutline } from '@vicons/ionicons5'
import { usePersonalInfo } from '../composables/usePersonalInfo'
import { FORM_LABELS, PLACEHOLDERS } from '../constants'

const {
  personalInfo,
  isEditing,
  editPersonalInfo,
  savePersonalInfo,
  cancelEdit
} = usePersonalInfo()

// Add loading state for save operation
const isLoading = ref(false)

const handleSavePersonalInfo = async () => {
  isLoading.value = true
  try {
    await savePersonalInfo()
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <n-card class="settings-card" :bordered="false">
    <template #header>
      <div class="card-header">
        <div class="header-title">
          <n-icon :component="PersonOutline" />
          <h3>Personal Information</h3>
        </div>
        <n-button text size="small" @click="editPersonalInfo">
          <n-icon :component="CreateOutline" />
        </n-button>
      </div>
    </template>
    <div class="settings-form">
      <div class="form-group">
        <label>{{ FORM_LABELS.PERSONAL_INFO.firstName }}</label>
        <n-input 
          v-model:value="personalInfo.firstName" 
          :placeholder="PLACEHOLDERS.PERSONAL_INFO.firstName" 
        />
      </div>
      <div class="form-group">
        <label>{{ FORM_LABELS.PERSONAL_INFO.lastName }}</label>
        <n-input 
          v-model:value="personalInfo.lastName" 
          :placeholder="PLACEHOLDERS.PERSONAL_INFO.lastName" 
        />
      </div>
      <div class="form-group">
        <label>{{ FORM_LABELS.PERSONAL_INFO.email }}</label>
        <n-input 
          v-model:value="personalInfo.email" 
          :placeholder="PLACEHOLDERS.PERSONAL_INFO.email" 
        />
      </div>
      <div class="form-group">
        <label>{{ FORM_LABELS.PERSONAL_INFO.phone }}</label>
        <n-input 
          v-model:value="personalInfo.phone" 
          :placeholder="PLACEHOLDERS.PERSONAL_INFO.phone" 
        />
      </div>
      <div class="form-group">
        <label>{{ FORM_LABELS.PERSONAL_INFO.bio }}</label>
        <n-input 
          type="textarea" 
          v-model:value="personalInfo.bio" 
          :placeholder="PLACEHOLDERS.PERSONAL_INFO.bio"
          :rows="3"
        />
      </div>
      
      <div v-if="isEditing" class="form-actions">
        <n-space>
          <n-button @click="cancelEdit">Cancel</n-button>
          <n-button type="primary" @click="handleSavePersonalInfo" :loading="isLoading">
            Save Changes
          </n-button>
        </n-space>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.settings-card {
  transition: all 0.3s ease;
}

.settings-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-title h3 {
  margin: 0;
  color: var(--text-primary);
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: var(--text-primary);
}

.form-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}
</style>
