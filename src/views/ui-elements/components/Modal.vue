<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Modal</h1>
        <p class="page-subtitle">Dialog boxes, confirmations, and layered content overlays</p>
      </div>

      <n-card title="Basic Modals">
        <n-space :size="12">
          <n-button type="primary" @click="showBasic = true">Basic Modal</n-button>
          <n-button type="info" @click="showInfo = true">Info Modal</n-button>
          <n-button type="success" @click="showSuccess = true">Success Modal</n-button>
        </n-space>

        <n-modal v-model:show="showBasic" preset="dialog" title="Basic Dialog">
          <p>This is a basic modal dialog. You can add any content here.</p>
        </n-modal>

        <n-modal v-model:show="showInfo" preset="dialog" title="Information" type="info">
          <p>This is an informational modal with an info icon.</p>
        </n-modal>

        <n-modal v-model:show="showSuccess" preset="dialog" title="Success" type="success">
          <p>Operation completed successfully!</p>
        </n-modal>
      </n-card>

      <n-card title="Modal Presets">
        <n-space vertical :size="12">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Dialog Preset</h3>
            <n-space :size="12">
              <n-button @click="showDialog = true">Dialog</n-button>
              <n-button type="warning" @click="showWarning = true">Warning Dialog</n-button>
              <n-button type="error" @click="showError = true">Error Dialog</n-button>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Card Preset</h3>
            <n-button @click="showCard = true">Card Modal</n-button>
          </div>
        </n-space>

        <n-modal v-model:show="showDialog" preset="dialog" title="Confirmation">
          <p>Are you sure you want to proceed with this action?</p>
        </n-modal>

        <n-modal v-model:show="showWarning" preset="dialog" title="Warning" type="warning">
          <p>This action cannot be undone. Please confirm.</p>
        </n-modal>

        <n-modal v-model:show="showError" preset="dialog" title="Error" type="error">
          <p>Something went wrong. Please try again.</p>
        </n-modal>

        <n-modal v-model:show="showCard" preset="card" title="Card Modal" style="width: 600px">
          <n-space vertical :size="16">
            <p>This is a card-style modal with more space for content.</p>
            <n-input v-model:value="cardInput" placeholder="Enter some text" />
            <n-textarea v-model:value="cardTextarea" placeholder="Enter description" />
          </n-space>
        </n-modal>
      </n-card>

      <n-card title="Modal Sizes">
        <n-space :size="12">
          <n-button @click="showSmall = true">Small</n-button>
          <n-button @click="showMedium = true">Medium</n-button>
          <n-button @click="showLarge = true">Large</n-button>
        </n-space>

        <n-modal
          v-model:show="showSmall"
          preset="card"
          title="Small Modal"
          style="width: 400px"
        >
          <p>This is a small modal (400px width).</p>
        </n-modal>

        <n-modal
          v-model:show="showMedium"
          preset="card"
          title="Medium Modal"
          style="width: 600px"
        >
          <p>This is a medium modal (600px width).</p>
        </n-modal>

        <n-modal
          v-model:show="showLarge"
          preset="card"
          title="Large Modal"
          style="width: 900px"
        >
          <p>This is a large modal (900px width) for extensive content.</p>
        </n-modal>
      </n-card>

      <n-card title="Closable & Mask Closable">
        <n-space :size="12">
          <n-button @click="showClosable = true">Closable</n-button>
          <n-button @click="showMaskClosable = true">Mask Closable</n-button>
          <n-button @click="showNonClosable = true">Non-Closable</n-button>
        </n-space>

        <n-modal
          v-model:show="showClosable"
          preset="card"
          title="Closable Modal"
          closable
        >
          <p>This modal can be closed using the X button.</p>
        </n-modal>

        <n-modal
          v-model:show="showMaskClosable"
          preset="card"
          title="Mask Closable"
          :mask-closable="true"
        >
          <p>Click outside the modal to close it.</p>
        </n-modal>

        <n-modal
          v-model:show="showNonClosable"
          preset="card"
          title="Non-Closable"
          :closable="false"
          :mask-closable="false"
        >
          <p>This modal cannot be closed by clicking X or mask. Use the button below.</p>
          <n-button @click="showNonClosable = false" style="margin-top: 16px">Close</n-button>
        </n-modal>
      </n-card>

      <n-card title="Modal with Form">
        <n-button type="primary" @click="showForm = true">Open Form Modal</n-button>

        <n-modal
          v-model:show="showForm"
          preset="card"
          title="User Form"
          style="width: 500px"
        >
          <n-form :model="formData" label-placement="left" label-width="100px">
            <n-form-item label="Name">
              <n-input v-model:value="formData.name" placeholder="Enter name" />
            </n-form-item>
            <n-form-item label="Email">
              <n-input v-model:value="formData.email" placeholder="Enter email" />
            </n-form-item>
            <n-form-item label="Message">
              <n-input
                v-model:value="formData.message"
                type="textarea"
                placeholder="Enter message"
              />
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
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

const showBasic = ref(false)
const showInfo = ref(false)
const showSuccess = ref(false)
const showDialog = ref(false)
const showWarning = ref(false)
const showError = ref(false)
const showCard = ref(false)
const showSmall = ref(false)
const showMedium = ref(false)
const showLarge = ref(false)
const showClosable = ref(false)
const showMaskClosable = ref(false)
const showNonClosable = ref(false)
const showForm = ref(false)

const cardInput = ref('')
const cardTextarea = ref('')

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

<style scoped>
.ui-page {
  max-width: 100%;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}
</style>
