<script setup lang="ts">
import { CreateOutline } from '@vicons/ionicons5'
import { useProfileActions } from '../composables/useProfileActions'

const {
  showEditModal,
  editForm,
  saveProfile,
  cancelEdit
} = useProfileActions()
</script>

<template>
  <n-modal v-model:show="showEditModal" preset="dialog" title="Edit Profile">
    <template #header>
      <div class="modal-header">
        <n-icon :component="CreateOutline" />
        <span>Edit Profile</span>
      </div>
    </template>
    
    <n-form :model="editForm" label-placement="top" label-width="120">
      <n-form-item label="Full Name">
        <n-input v-model:value="editForm.fullName" placeholder="Enter your full name" />
      </n-form-item>
      
      <n-form-item label="Title">
        <n-input v-model:value="editForm.title" placeholder="Enter your professional title" />
      </n-form-item>
      
      <n-form-item label="Location">
        <n-input v-model:value="editForm.location" placeholder="Enter your location" />
      </n-form-item>
      
      <n-form-item label="Company">
        <n-input v-model:value="editForm.company" placeholder="Enter your company" />
      </n-form-item>
      
      <n-form-item label="About">
        <n-input 
          v-model:value="editForm.about" 
          type="textarea" 
          :rows="4"
          placeholder="Tell us about yourself"
        />
      </n-form-item>
    </n-form>
    
    <template #action>
      <n-button @click="cancelEdit">Cancel</n-button>
      <n-button type="primary" @click="saveProfile">Save Changes</n-button>
    </template>
  </n-modal>
</template>

<style scoped>
.modal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 600;
}
</style>
