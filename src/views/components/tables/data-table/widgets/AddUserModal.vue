<script setup lang="ts">
import { ref } from 'vue'
import { NModal, NForm, NFormItem, NInput, NSelect, NInputNumber, NSpace, NButton } from 'naive-ui'
import { FORM_RULES, ROLE_OPTIONS, STATUS_OPTIONS, createNewUser, type User } from '../constants'

const show = defineModel<boolean>('show')
const emit = defineEmits<{
  add: [user: User]
}>()

const formRef = ref()
const newUser = ref<User>(createNewUser())

const handleAddUser = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      emit('add', { ...newUser.value })
      show.value = false
      
      // Reset form
      newUser.value = createNewUser()
    }
  })
}

const handleCancel = () => {
  show.value = false
  newUser.value = createNewUser()
}
</script>

<template>
  <n-modal v-model:show="show" preset="dialog" title="Add New User">
    <n-form :model="newUser" :rules="FORM_RULES" ref="formRef" class="modal-form">
      <n-form-item label="Name" path="name">
        <n-input v-model:value="newUser.name" placeholder="Enter name" />
      </n-form-item>
      <n-form-item label="Email" path="email">
        <n-input v-model:value="newUser.email" placeholder="Enter email" />
      </n-form-item>
      <n-form-item label="Role" path="role">
        <n-select v-model:value="newUser.role" :options="ROLE_OPTIONS" />
      </n-form-item>
      <n-form-item label="Status" path="status">
        <n-select v-model:value="newUser.status" :options="STATUS_OPTIONS" />
      </n-form-item>
      <n-form-item label="Salary" path="salary">
        <n-input-number v-model:value="newUser.salary" placeholder="Enter salary" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-space>
        <n-button @click="handleCancel">Cancel</n-button>
        <n-button type="primary" @click="handleAddUser">Add User</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
