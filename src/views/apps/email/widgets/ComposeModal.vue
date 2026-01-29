<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  SendOutline,
  AttachOutline,
  TrashOutline,
} from '@vicons/ionicons5'

interface Props {
  show: boolean
}

interface Emits {
  (e: 'update:show', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const to = ref('')
const cc = ref('')
const bcc = ref('')
const subject = ref('')
const content = ref('')
const attachments = ref<File[]>([])
const showCcBcc = ref(false)

const modalShow = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return to.value.split(',').every(email => emailRegex.test(email.trim()))
})

const canSend = computed(() => {
  return to.value.trim() && subject.value.trim() && content.value.trim() && isValidEmail.value
})

const toggleCcBcc = () => {
  showCcBcc.value = !showCcBcc.value
}

const fileInput = ref<HTMLInputElement>()

const handleFileUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files) {
    attachments.value = [...attachments.value, ...Array.from(files)]
  }
}

const removeAttachment = (index: number) => {
  attachments.value.splice(index, 1)
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const sendEmail = () => {
  if (!canSend.value) return

  const emailData = {
    to: to.value,
    cc: cc.value,
    bcc: bcc.value,
    subject: subject.value,
    content: content.value,
    attachments: attachments.value.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }))
  }

  console.log('Sending email:', emailData)
  
  // Reset form
  resetForm()
  modalShow.value = false
}

const resetForm = () => {
  to.value = ''
  cc.value = ''
  bcc.value = ''
  subject.value = ''
  content.value = ''
  attachments.value = []
  showCcBcc.value = false
}

const closeModal = () => {
  if (hasUnsavedChanges.value) {
    // In a real app, you'd show a confirmation dialog
    console.log('There are unsaved changes')
  }
  resetForm()
  modalShow.value = false
}

const hasUnsavedChanges = computed(() => {
  return to.value || cc.value || bcc.value || subject.value || content.value || attachments.value.length > 0
})

// Watch for modal close to reset form
watch(modalShow, (newShow) => {
  if (!newShow) {
    resetForm()
  }
})
</script>

<template>
  <n-modal
    v-model:show="modalShow"
    preset="card"
    :style="{ width: '800px', maxWidth: '90vw' }"
    :bordered="false"
    size="huge"
    class="compose-modal"
  >
    <template #header>
      <div class="modal-header">
        <h3>New Message</h3>
      </div>
    </template>

    <div class="compose-form">
      <!-- Recipients -->
      <div class="recipients-section">
        <div class="recipient-row">
          <label class="recipient-label">To:</label>
          <n-input
            v-model:value="to"
            placeholder="Recipients"
            class="recipient-input"
            :status="to && !isValidEmail ? 'error' : undefined"
          />
          <n-button quaternary @click="toggleCcBcc" v-if="!showCcBcc">
            Cc/Bcc
          </n-button>
        </div>

        <div v-if="showCcBcc" class="additional-recipients">
          <div class="recipient-row mt-2">
            <label class="recipient-label">Cc:</label>
            <n-input
              v-model:value="cc"
              placeholder="Cc recipients"
              class="recipient-input"
            />
          </div>
          <div class="recipient-row mt-2">
            <label class="recipient-label">Bcc:</label>
            <n-input
              v-model:value="bcc"
              placeholder="Bcc recipients"
              class="recipient-input"
            />
          </div>
        </div>
      </div>

      <!-- Subject -->
      <div class="subject-section mt-2">
        <n-input
          v-model:value="subject"
          placeholder="Subject"
          size="large"
        />
      </div>

      <!-- Email Content -->
      <div class="content-section mt-2">
        <n-input
          v-model:value="content"
          type="textarea"
          placeholder="Compose your message..."
          :autosize="{ minRows: 12, maxRows: 20 }"
          class="content-textarea"
        />
      </div>

      <!-- Attachments -->
      <div class="attachments-section" v-if="attachments.length > 0">
        <div class="attachments-header">
          <n-icon :component="AttachOutline" />
          <span>Attachments ({{ attachments.length }})</span>
        </div>
        <div class="attachments-list">
          <div
            v-for="(attachment, index) in attachments"
            :key="index"
            class="attachment-item"
          >
            <div class="attachment-info">
              <div class="attachment-name">{{ attachment.name }}</div>
              <div class="attachment-size">{{ formatFileSize(attachment.size) }}</div>
            </div>
            <n-button quaternary size="small" @click="removeAttachment(index)">
              <template #icon>
                <n-icon>
                  <TrashOutline />
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="modal-footer">
        <div class="footer-left">
          <input
            ref="fileInput"
            type="file"
            multiple
            @change="handleFileUpload"
            style="display: none"
          />
          <n-button quaternary @click="fileInput?.click()">
            <template #icon>
              <n-icon>
                <AttachOutline />
              </n-icon>
            </template>
            Attach
          </n-button>
        </div>

        <div class="footer-right">
          <n-space>
            <n-button @click="closeModal">
              Cancel
            </n-button>
            <n-button
              type="primary"
              @click="sendEmail"
              :disabled="!canSend"
            >
              <template #icon>
                <n-icon>
                  <SendOutline />
                </n-icon>
              </template>
              Send
            </n-button>
          </n-space>
        </div>
      </div>
    </template>
  </n-modal>
</template>

<style scoped>
/* Using external SCSS file */
</style>
