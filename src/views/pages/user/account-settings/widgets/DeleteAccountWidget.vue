<template>
  <n-card class="settings-card danger-card" :bordered="false">
    <template #header>
      <div class="card-header danger-header">
        <div class="header-title">
          <n-icon :component="WarningOutline" />
          <h3>Delete Account</h3>
        </div>
      </div>
    </template>
    <div class="delete-account-content">
      <div class="warning-section">
        <n-alert type="error" title="Danger Zone">
          <p>Once you delete your account, there is no going back. Please be certain.</p>
        </n-alert>
        
        <div class="warning-list">
          <ul>
            <li>All your data will be permanently deleted</li>
            <li>Your projects and files will be removed</li>
            <li>You will lose access to all connected services</li>
            <li>This action cannot be undone</li>
          </ul>
        </div>
      </div>
      
      <div class="action-section">
        <n-button 
          type="error" 
          size="large"
          @click="openDeleteModal"
          :loading="isLoading"
        >
          <template #icon>
            <n-icon :component="WarningOutline" />
          </template>
          Delete Account
        </n-button>
      </div>
    </div>
  </n-card>
  
  <!-- Delete Confirmation Modal -->
  <n-modal v-model:show="showDeleteModal" preset="dialog" title="Delete Account">
    <template #header>
      <div class="modal-header">
        <n-icon :component="WarningOutline" />
        <span>Delete Account</span>
      </div>
    </template>
    <div class="modal-content">
      <p>{{ DELETE_CONFIRMATION.WARNING_MESSAGE }}</p>
      <div class="confirmation-input">
        <label>{{ DELETE_CONFIRMATION.CONFIRM_LABEL }}</label>
        <n-input 
          v-model:value="deleteConfirmation" 
          :placeholder="DELETE_CONFIRMATION.REQUIRED_TEXT"
        />
      </div>
    </div>
    <template #action>
      <n-space>
        <n-button @click="closeDeleteModal">Cancel</n-button>
        <n-button 
          type="error" 
          :disabled="!canDeleteAccount"
          @click="handleDeleteAccount"
          :loading="isLoading"
        >
          Delete Account
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { WarningOutline } from '@vicons/ionicons5'
import { useAccountActions } from '../composables/useAccountActions'
import { DELETE_CONFIRMATION } from '../constants'

const {
  showDeleteModal,
  deleteConfirmation,
  isLoading,
  openDeleteModal,
  closeDeleteModal,
  deleteAccount,
  canDeleteAccount
} = useAccountActions()

const handleDeleteAccount = async () => {
  await deleteAccount()
}
</script>

<style scoped>
.settings-card {
  transition: all 0.3s ease;
}

.settings-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.danger-card {
  border: 1px solid #ef4444;
}

.danger-card:hover {
  border-color: #dc2626;
  box-shadow: 0 12px 24px rgba(239, 68, 68, 0.2);
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

.danger-header .header-title h3 {
  color: #ef4444;
}

.delete-account-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.warning-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.warning-list ul {
  margin: 0;
  padding-left: 1.5rem;
  color: var(--text-secondary);
}

.warning-list li {
  margin-bottom: 0.5rem;
}

.action-section {
  display: flex;
  justify-content: center;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ef4444;
  font-weight: 600;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.confirmation-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.confirmation-input label {
  font-weight: 500;
  color: var(--text-primary);
}
</style>
