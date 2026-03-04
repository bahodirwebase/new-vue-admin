<template>
  <div class="compose-window" :class="{ minimized: minimized }">
    <!-- Header bar -->
    <div class="compose-header" @click="minimized && (minimized = false)">
      <span class="compose-title">{{ titleText }}</span>
      <div class="compose-controls" @click.stop>
        <n-button text size="tiny" @click="minimized = !minimized">
          <n-icon :component="minimized ? ChevronUpOutline : RemoveOutline" size="16" />
        </n-button>
        <n-button text size="tiny" @click="$emit('close')">
          <n-icon :component="CloseOutline" size="16" />
        </n-button>
      </div>
    </div>

    <!-- Form (hidden when minimized) -->
    <div v-show="!minimized" class="compose-body">
      <!-- To -->
      <div class="compose-field">
        <span class="field-label">To</span>
        <n-input
          v-model:value="state.to"
          placeholder="recipient@email.com"
          :status="toError ? 'error' : undefined"
          @blur="validateTo"
        />
      </div>

      <!-- CC / BCC toggle -->
      <div v-if="!state.showCc && !state.showBcc" class="compose-toggles">
        <n-button text size="tiny" @click="state.showCc = true">CC</n-button>
        <n-button text size="tiny" @click="state.showBcc = true">BCC</n-button>
      </div>

      <div v-if="state.showCc" class="compose-field">
        <span class="field-label">CC</span>
        <n-input v-model:value="state.cc" placeholder="cc@email.com" />
      </div>

      <div v-if="state.showBcc" class="compose-field">
        <span class="field-label">BCC</span>
        <n-input v-model:value="state.bcc" placeholder="bcc@email.com" />
      </div>

      <!-- Subject -->
      <div class="compose-field">
        <span class="field-label">Subject</span>
        <n-input v-model:value="state.subject" placeholder="Subject" />
      </div>

      <!-- Divider -->
      <div class="compose-divider" />

      <!-- Body -->
      <n-input
        v-model:value="state.body"
        type="textarea"
        placeholder="Write your message..."
        class="compose-textarea"
        :autosize="{ minRows: 8, maxRows: 16 }"
        :bordered="false"
      />

      <!-- Footer toolbar -->
      <div class="compose-footer">
        <div class="footer-left">
          <!-- Priority -->
          <n-select
            v-model:value="state.priority"
            :options="priorityOptions"
            size="small"
            style="width: 130px;"
          />
        </div>
        <div class="footer-right">
          <n-button size="small" @click="$emit('close')">Discard</n-button>
          <n-button
            type="primary"
            size="small"
            :loading="sending.value"
            :disabled="!isValid"
            @click="handleSend"
          >
            <template #icon><n-icon :component="SendOutline" /></template>
            Send
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NIcon, NInput, NSelect, useMessage } from 'naive-ui'
import {
  CloseOutline, ChevronUpOutline, RemoveOutline, SendOutline,
} from '@vicons/ionicons5'
import type { ComposeMode, Email } from '../types'
import { useMailCompose } from '../composables/useMailCompose'

const props = defineProps<{
  mode: ComposeMode
  replyTo?: Email | null
}>()

const emit = defineEmits<{
  close: []
  sent: []
}>()

const message   = useMessage()
const minimized = ref(false)
const toError   = ref(false)

const { state, sending, isValid, prefillReply, send } = useMailCompose()

// Pre-fill if replying/forwarding
if (props.mode !== 'new' && props.replyTo) {
  prefillReply(props.replyTo, props.mode)
}

const titleMap: Record<ComposeMode, string> = {
  new:        'New Message',
  reply:      'Reply',
  'reply-all': 'Reply All',
  forward:    'Forward',
}
const titleText = titleMap[props.mode]

const priorityOptions = [
  { label: '⬆ High priority',   value: 'high'   },
  { label: '↔ Normal priority', value: 'normal' },
  { label: '⬇ Low priority',    value: 'low'    },
]

function validateTo() {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const parts   = state.to.split(',').map(s => s.trim()).filter(Boolean)
  toError.value = parts.length === 0 || parts.some(p => !emailRe.test(p))
}

function handleSend() {
  send(() => {
    message.success('Email sent successfully!')
    emit('sent')
    emit('close')
  })
}
</script>

<style scoped lang="scss">
.compose-window {
  position: fixed;
  bottom: 0;
  right: 28px;
  width: 520px;
  max-width: calc(100vw - 40px);
  background: var(--bg-secondary);
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15), 0 0 0 1px var(--border-color);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: height 0.2s;

  &.minimized { height: auto; }
}

/* ── Header ── */
.compose-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--primary-color);
  cursor: pointer;
  flex-shrink: 0;
}

.compose-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.compose-controls {
  display: flex;
  gap: 4px;

  :deep(.n-button) { color: rgba(255,255,255,0.8) !important; }
  :deep(.n-button:hover) { color: #fff !important; background: rgba(255,255,255,0.12) !important; }
}

/* ── Body ── */
.compose-body {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

/* ── Fields ── */
.compose-field {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--border-color);

  :deep(.n-input) { flex: 1; }
  :deep(.n-input__border), :deep(.n-input__state-border) { display: none; }
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color-3);
  width: 44px;
  flex-shrink: 0;
  text-align: right;
}

/* ── CC/BCC toggles ── */
.compose-toggles {
  display: flex;
  gap: 4px;
  padding: 4px 14px;
  border-bottom: 1px solid var(--border-color);
  justify-content: flex-end;
}

/* ── Divider ── */
.compose-divider { height: 1px; background: var(--border-color); }

/* ── Textarea ── */
.compose-textarea {
  padding: 12px 14px;
  font-size: 14px;
  min-height: 160px;

  :deep(.n-input__textarea-el) {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-color);
    resize: none;
  }
}

/* ── Footer ── */
.compose-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
  gap: 8px;
}

.footer-left, .footer-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Mobile */
@media (max-width: 600px) {
  .compose-window {
    right: 0;
    left: 0;
    width: 100%;
    border-radius: 12px 12px 0 0;
    max-width: 100%;
  }
}
</style>
