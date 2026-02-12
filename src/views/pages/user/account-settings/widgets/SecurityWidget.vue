<script setup lang="ts">
import { ref } from 'vue'
import { LockClosedOutline, CreateOutline } from '@vicons/ionicons5'
import { useSecurity } from '../composables/useSecurity'
import { FORM_LABELS, PLACEHOLDERS } from '../constants'

const {
  securityData,
  isEditing,
  passwordStrengthClass,
  passwordStrengthText,
  isPasswordValid,
  editSecurity,
  saveSecuritySettings,
  cancelEdit
} = useSecurity()

// Add loading state for save operation
const isLoading = ref(false)

const handleSaveSecurity = async () => {
  isLoading.value = true
  try {
    await saveSecuritySettings()
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <n-card class="settings-card security-card" :bordered="false">
    <template #header>
      <div class="card-header">
        <div class="header-title">
          <n-icon :component="LockClosedOutline" />
          <h3>Security</h3>
        </div>
        <n-button text size="small" @click="editSecurity">
          <n-icon :component="CreateOutline" />
        </n-button>
      </div>
    </template>
    <div class="settings-form">
      <div class="form-group">
        <label>{{ FORM_LABELS.SECURITY.currentPassword }}</label>
        <n-input 
          type="password" 
          v-model:value="securityData.currentPassword" 
          :placeholder="PLACEHOLDERS.SECURITY.currentPassword"
          show-password-on="click"
        />
      </div>
      <div class="form-group">
        <label>{{ FORM_LABELS.SECURITY.newPassword }}</label>
        <n-input 
          type="password" 
          v-model:value="securityData.newPassword" 
          :placeholder="PLACEHOLDERS.SECURITY.newPassword"
          show-password-on="click"
        />
      </div>
      <div class="form-group">
        <label>{{ FORM_LABELS.SECURITY.confirmPassword }}</label>
        <n-input 
          type="password" 
          v-model:value="securityData.confirmPassword" 
          :placeholder="PLACEHOLDERS.SECURITY.confirmPassword"
          show-password-on="click"
        />
      </div>
      <div class="password-strength">
        <div class="strength-label">Password Strength</div>
        <div class="strength-bar">
          <div class="strength-fill" :class="passwordStrengthClass"></div>
        </div>
        <span class="strength-text">{{ passwordStrengthText }}</span>
      </div>
      
      <div v-if="isEditing" class="form-actions">
        <n-space>
          <n-button @click="cancelEdit">Cancel</n-button>
          <n-button 
            type="primary" 
            @click="handleSaveSecurity" 
            :loading="isLoading"
            :disabled="!isPasswordValid"
          >
            Update Password
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

.password-strength {
  margin-top: 1rem;
}

.strength-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.strength-bar {
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.strength-fill {
  height: 100%;
  width: 0;
  transition: all 0.3s ease;
  border-radius: 3px;
}

.strength-fill.weak {
  width: 33%;
  background: #ef4444;
}

.strength-fill.medium {
  width: 66%;
  background: #f59e0b;
}

.strength-fill.strong {
  width: 100%;
  background: #22c55e;
}

.strength-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.form-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}
</style>
