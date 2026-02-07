<!-- widgets/EmailComposer.vue -->
<template>
  <n-modal
    v-model:show="isVisible"
    preset="dialog"
    title="Compose Email"
    type="default"
    :style="{ width: composerWidth }"
    :mask-closable="false"
    class="email-composer-modal"
  >
    <div class="composer-content">
      <!-- To Field -->
      <div class="composer-field">
        <label class="field-label">To</label>
        <n-dynamic-input
          v-model:value="state.to"
          item-style="display: flex; align-items: center; gap: 8px;"
          @create="() => ({ name: '', email: '' })"
        >
          <template #default="{ value }">
            <n-input
              v-model:value="value.email"
              type="text"
              placeholder="email@example.com"
              class="recipient-input"
              @blur="validateEmail(value.email)"
            />
            <n-button text @click.stop="() => {}">
              <template #icon>
                <n-icon :component="CloseOutline" />
              </template>
            </n-button>
          </template>
        </n-dynamic-input>
      </div>

      <!-- CC Field -->
      <div class="composer-field">
        <button class="toggle-cc-bcc" @click="showCcBcc = !showCcBcc">
          {{ showCcBcc ? '- CC/BCC' : '+ CC/BCC' }}
        </button>
      </div>

      <!-- CC/BCC Fields (Conditional) -->
      <template v-if="showCcBcc">
        <div class="composer-field">
          <label class="field-label">CC</label>
          <n-input
            v-model:value="ccInput"
            type="text"
            placeholder="Add CC recipients"
            clearable
          />
        </div>

        <div class="composer-field">
          <label class="field-label">BCC</label>
          <n-input
            v-model:value="bccInput"
            type="text"
            placeholder="Add BCC recipients"
            clearable
          />
        </div>
      </template>

      <!-- Subject -->
      <div class="composer-field">
        <label class="field-label">Subject</label>
        <n-input
          v-model:value="state.subject"
          type="text"
          placeholder="Email subject"
          clearable
        />
      </div>

      <!-- Body -->
      <div class="composer-field">
        <label class="field-label">Message</label>
        <n-input
          v-model:value="state.body"
          type="textarea"
          placeholder="Write your email here..."
          :rows="10"
        />
      </div>

      <!-- Attachments -->
      <div class="composer-field">
        <label class="field-label">Attachments</label>
        <div class="attachments-section">
          <n-upload
            directory
            action="#"
            :auto-upload="false"
            @change="handleFileUpload"
            :default-file-list="attachmentFileList"
          >
            <n-button text>
              <template #icon>
                <n-icon :component="CloudUploadOutline" />
              </template>
              Click to upload or drag files
            </n-button>
          </n-upload>

          <!-- Attachment List -->
          <div v-if="state.attachments.length" class="attachment-list">
            <div
              v-for="attachment in state.attachments"
              :key="attachment.id"
              class="attachment-item"
            >
              <span class="attachment-name">{{ attachment.name }}</span>
              <span class="attachment-size">({{ formatFileSize(attachment.size) }})</span>
              <n-button
                text
                type="error"
                size="small"
                @click="handleRemoveAttachment(attachment.id)"
              >
                <template #icon>
                <n-icon :component="CloseOutline" />
              </template>
              </n-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Priority -->
      <div class="composer-field">
        <label class="field-label">Priority</label>
        <n-select
          v-model:value="priority"
          :options="priorityOptions"
          clearable
        />
      </div>
    </div>

    <!-- Footer Actions -->
    <template #footer>
      <div class="composer-footer">
        <div class="left-actions">
          <n-button text @click="handleSaveDraft">
            <template #icon>
              <n-icon :component="SaveOutline" />
            </template>
            Save Draft
          </n-button>
        </div>

        <div class="right-actions">
          <n-button @click="handleCancel">Cancel</n-button>
          <n-button
            type="primary"
            :loading="state.isSending"
            :disabled="!isValid"
            @click="handleSend"
          >
            Send
          </n-button>
        </div>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  NModal,
  NButton,
  NIcon,
  NInput,
  NDynamicInput,
  NUpload,
  NSelect,
  useMessage,
} from 'naive-ui';
import { 
  CloseOutline, 
  SaveOutline,
  CloudUploadOutline
} from '@vicons/ionicons5';
import { useEmailComposer } from '../composables/useEmailComposer';
import { useEmailUtils } from '../composables/useEmailUtils';
import { COMPOSER_WIDTH, EMAIL_PRIORITIES } from '../constants';

interface Props {
  visible: boolean;
}

interface Emits {
  (e: 'update:visible', value: boolean): void;
  (e: 'send'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { composerState: state, isValid, sendEmail, saveDraft, addAttachment, removeAttachment } = useEmailComposer();
const { formatFileSize, isValidEmail, parseEmailAddresses } = useEmailUtils();
const message = useMessage();

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emits('update:visible', value),
});

const showCcBcc = ref(false);
const ccInput = ref('');
const bccInput = ref('');
const priority = ref<'low' | 'normal' | 'high'>('normal');
const attachmentFileList = ref([]);

const composerWidth = computed(() => {
  if (typeof window === 'undefined') return COMPOSER_WIDTH.DESKTOP;
  const width = window.innerWidth;
  if (width < 640) return COMPOSER_WIDTH.MOBILE;
  if (width < 1024) return COMPOSER_WIDTH.TABLET;
  return COMPOSER_WIDTH.DESKTOP;
});

const priorityOptions = EMAIL_PRIORITIES.map((p) => ({
  label: p.label,
  value: p.value,
}));

const handleFileUpload = (options: any) => {
  const file = options.file.file as File;
  if (file) {
    addAttachment(file);
  }
};

const handleRemoveAttachment = (attachmentId: string) => {
  removeAttachment(attachmentId);
};

const validateEmail = (email: string) => {
  if (email && !isValidEmail(email)) {
    message.error(`Invalid email: ${email}`);
  }
};

const handleSend = async () => {
  // Parse CC va BCC emails
  if (ccInput.value) {
    const ccEmails = parseEmailAddresses(ccInput.value);
    state.value.cc = ccEmails.map((email) => ({
      id: `cc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: email.split('@')[0],
      email,
    }));
  }

  if (bccInput.value) {
    const bccEmails = parseEmailAddresses(bccInput.value);
    state.value.bcc = bccEmails.map((email) => ({
      id: `bcc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: email.split('@')[0],
      email,
    }));
  }

  const success = await sendEmail();
  if (success) {
    message.success('Email sent successfully!');
    isVisible.value = false;
    emits('send');
  } else {
    message.error('Failed to send email');
  }
};

const handleCancel = () => {
  isVisible.value = false;
};

const handleSaveDraft = async () => {
  await saveDraft();
  message.info('Draft saved');
};
</script>

<style scoped lang="scss">
.email-composer-modal {
  :deep(.n-dialog) {
    border-radius: 8px;
  }

  :deep(.n-dialog__title) {
    font-size: 16px;
    font-weight: 600;
  }
}

.composer-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 70vh;
  overflow-y: auto;
  padding: 16px 0;

  .composer-field {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .field-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-color-1);
    }

    .recipient-input {
      flex: 1;
    }

    .toggle-cc-bcc {
      background: none;
      border: none;
      color: var(--primary-color);
      cursor: pointer;
      font-size: 13px;
      padding: 0;
      text-decoration: underline;

      &:hover {
        color: var(--primary-color-light);
      }
    }
  }

  .attachments-section {
    border: 1px dashed var(--border-color);
    border-radius: 4px;
    padding: 12px;
    background-color: var(--bg-tertiary);

    .attachment-list {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .attachment-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px;
      background: var(--bg-primary);
      border-radius: 4px;
      font-size: 13px;

      .attachment-name {
        font-weight: 500;
        color: var(--text-color-1);
      }

      .attachment-size {
        color: var(--text-color-3);
      }
    }
  }
}

.composer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);

  .left-actions {
    display: flex;
    gap: 8px;
  }

  .right-actions {
    display: flex;
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .composer-content {
    max-height: 60vh;
  }

  .composer-footer {
    flex-direction: column;
    gap: 8px;

    .left-actions,
    .right-actions {
      width: 100%;
    }

    :deep(.n-button) {
      width: 100%;
    }
  }
}
</style>
