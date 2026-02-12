<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

const showForm = ref(false)

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  message.success('Form submitted successfully!')
  showForm.value = false
  formData.value = { name: '', email: '', message: '' }
}
</script>

<template>
  <n-card title="Modal with Form">
    <n-button type="primary" @click="showForm = true">Open Form Modal</n-button>

    <n-modal v-model:show="showForm" preset="dialog" title="User Form" style="width: 500px">
      <n-form :model="formData" label-placement="left" label-width="100px">
        <n-form-item label="Name">
          <n-input v-model:value="formData.name" placeholder="Enter name" />
        </n-form-item>
        <n-form-item label="Email">
          <n-input v-model:value="formData.email" placeholder="Enter email" />
        </n-form-item>
        <n-form-item label="Message">
          <n-input v-model:value="formData.message" type="textarea" placeholder="Enter message" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showForm = false">Cancel</n-button>
          <n-button type="primary" @click="handleSubmit">Submit</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>
