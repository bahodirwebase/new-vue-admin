<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  SettingsOutline,
  MailOutline,
  NotificationsOutline,
  ShieldOutline,
  ColorPaletteOutline,
} from '@vicons/ionicons5'

interface Props {
  show: boolean
}

interface Emits {
  (e: 'update:show', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const modalShow = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

// Settings state
const signatureEnabled = ref(true)
const signatureText = ref(`
Best regards,
Your Name
Your Position
Your Company
`)

const notifications = ref({
  desktop: true,
  sound: true,
  emailPreview: true,
  importantOnly: false
})

const theme = ref('auto')
const fontSize = ref('medium')
const compactMode = ref(false)

const autoSave = ref(true)
const sendDelay = ref(0)
const readReceipts = ref(false)

const spamFilter = ref(true)
const phishingProtection = ref(true)
const blockImages = ref(false)

const closeSettings = () => {
  modalShow.value = false
}

const saveSettings = () => {
  console.log('Saving settings:', {
    signature: {
      enabled: signatureEnabled.value,
      text: signatureText.value
    },
    notifications: notifications.value,
    appearance: {
      theme: theme.value,
      fontSize: fontSize.value,
      compactMode: compactMode.value
    },
    behavior: {
      autoSave: autoSave.value,
      sendDelay: sendDelay.value,
      readReceipts: readReceipts.value
    },
    security: {
      spamFilter: spamFilter.value,
      phishingProtection: phishingProtection.value,
      blockImages: blockImages.value
    }
  })
  
  modalShow.value = false
}

const resetSettings = () => {
  signatureEnabled.value = true
  signatureText.value = `
Best regards,
Your Name
Your Position
Your Company
`
  
  notifications.value = {
    desktop: true,
    sound: true,
    emailPreview: true,
    importantOnly: false
  }
  
  theme.value = 'auto'
  fontSize.value = 'medium'
  compactMode.value = false
  
  autoSave.value = true
  sendDelay.value = 0
  readReceipts.value = false
  
  spamFilter.value = true
  phishingProtection.value = true
  blockImages.value = false
}
</script>

<template>
  <n-modal
    v-model:show="modalShow"
    preset="card"
    :style="{ width: '700px', maxWidth: '90vw' }"
    :bordered="false"
    size="huge"
    class="settings-modal"
  >
    <template #header>
      <div class="modal-header">
        <h3>Email Settings</h3>
      </div>
    </template>

    <div class="settings-content">
      <n-tabs type="line" animated>
        <!-- General Tab -->
        <n-tab-pane name="general" tab="General">
          <div class="settings-section">
            <h4 class="section-title d-flex align-center">
              <n-icon :component="MailOutline" size="24" class="mr-2" />
              Email Signature
            </h4>
            <div class="setting-item mt-2">
              <n-switch v-model:value="signatureEnabled">
                <template #checked>Enabled</template>
                <template #unchecked>Disabled</template>
              </n-switch>
            </div>
            <div class="setting-item mt-2" v-if="signatureEnabled">
              <n-input
                v-model:value="signatureText"
                type="textarea"
                placeholder="Enter your email signature..."
                :autosize="{ minRows: 4, maxRows: 8 }"
              />
            </div>
          </div>

          <div class="settings-section">
            <h4 class="section-title mt-2 d-flex align-center">
              <n-icon :component="NotificationsOutline" size="24" class="mr-2" />
              Notifications
            </h4>
            <div class="setting-item mt-2">
              <n-space vertical>
                <div class="setting-row">
                  <span class="mr-2">Desktop Notifications</span>
                  <n-switch v-model:value="notifications.desktop" />
                </div>
                <div class="setting-row">
                  <span class="mr-2">Sound Alerts</span>
                  <n-switch v-model:value="notifications.sound" />
                </div>
                <div class="setting-row">
                  <span class="mr-2">Show Email Preview</span>
                  <n-switch v-model:value="notifications.emailPreview" />
                </div>
                <div class="setting-row">
                  <span class="mr-2">Important Emails Only</span>
                  <n-switch v-model:value="notifications.importantOnly" />
                </div>
              </n-space>
            </div>
          </div>
        </n-tab-pane>

        <!-- Appearance Tab -->
        <n-tab-pane name="appearance" tab="Appearance">
          <div class="settings-section">
            <h4 class="section-title d-flex align-center">
              <n-icon :component="ColorPaletteOutline" size="24" class="mr-2" />
              Theme & Display
            </h4>
            <div class="setting-item mt-2">
              <n-space vertical>
                <div class="setting-row">
                  <span class="mr-2">Theme</span>
                  <n-select
                    v-model:value="theme"
                    :options="[
                      { label: 'Auto', value: 'auto' },
                      { label: 'Light', value: 'light' },
                      { label: 'Dark', value: 'dark' }
                    ]"
                    style="width: 150px"
                  />
                </div>
                <div class="setting-row">
                  <span class="mr-2">Font Size</span>
                  <n-select
                    v-model:value="fontSize"
                    :options="[
                      { label: 'Small', value: 'small' },
                      { label: 'Medium', value: 'medium' },
                      { label: 'Large', value: 'large' }
                    ]"
                    style="width: 150px"
                  />
                </div>
                <div class="setting-row">
                  <span class="mr-2">Compact Mode</span>
                  <n-switch v-model:value="compactMode" />
                </div>
              </n-space>
            </div>
          </div>
        </n-tab-pane>

        <!-- Behavior Tab -->
        <n-tab-pane name="behavior" tab="Behavior">
          <div class="settings-section">
            <h4 class="section-title d-flex align-center">
              <n-icon :component="SettingsOutline" size="24" class="mr-2" />
              Email Behavior
            </h4>
            <div class="setting-item mt-2">
              <n-space vertical>
                <div class="setting-row">
                  <span class="mr-2">Auto-save Drafts</span>
                  <n-switch v-model:value="autoSave" />
                </div>
                <div class="setting-row">
                  <span class="mr-2">Send Delay (seconds)</span>
                  <n-input-number
                    v-model:value="sendDelay"
                    :min="0"
                    :max="30"
                    style="width: 100px"
                  />
                </div>
                <div class="setting-row">
                  <span class="mr-2">Read Receipts</span>
                  <n-switch v-model:value="readReceipts" />
                </div>
              </n-space>
            </div>
          </div>
        </n-tab-pane>

        <!-- Security Tab -->
        <n-tab-pane name="security" tab="Security">
          <div class="settings-section">
            <h4 class="section-title d-flex align-center">
              <n-icon :component="ShieldOutline" size="24" class="mr-2" />
              Privacy & Security
            </h4>
            <div class="setting-item mt-2">
              <n-space vertical>
                <div class="setting-row">
                  <span class="mr-2">Spam Filter</span>
                  <n-switch v-model:value="spamFilter" />
                </div>
                <div class="setting-row">
                  <span class="mr-2">Phishing Protection</span>
                  <n-switch v-model:value="phishingProtection" />
                </div>
                <div class="setting-row">
                  <span class="mr-2">Block External Images</span>
                  <n-switch v-model:value="blockImages" />
                </div>
              </n-space>
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>

    <template #footer>
      <div class="modal-footer">
        <n-space>
          <n-button @click="resetSettings">
            Reset to Default
          </n-button>
          <n-button @click="closeSettings">
            Cancel
          </n-button>
          <n-button type="primary" @click="saveSettings">
            Save Settings
          </n-button>
        </n-space>
      </div>
    </template>
  </n-modal>
</template>

<style scoped>
/* Using external SCSS file */
</style>
