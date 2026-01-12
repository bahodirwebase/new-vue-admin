<template>
  <div class="switch-demo">
    <n-space vertical :size="24">
      <n-card title="Basic Switch">
        <n-space vertical :size="16">
          <n-switch v-model:value="basicSwitch" />
          <n-p>Switch state: {{ basicSwitch ? 'ON' : 'OFF' }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Switch with Labels">
        <n-space vertical :size="16">
          <n-switch v-model:value="labeledSwitch">
            <template #checked>Enabled</template>
            <template #unchecked>Disabled</template>
          </n-switch>
          <n-switch v-model:value="iconSwitch">
            <template #checked>
              <n-icon :component="CheckmarkOutline" />
            </template>
            <template #unchecked>
              <n-icon :component="CloseOutline" />
            </template>
          </n-switch>
        </n-space>
      </n-card>

      <n-card title="Switch Sizes">
        <n-space vertical :size="16">
          <n-space align="center" :size="12">
            <span>Small:</span>
            <n-switch v-model:value="sizeSwitch" size="small" />
          </n-space>
          <n-space align="center" :size="12">
            <span>Medium:</span>
            <n-switch v-model:value="sizeSwitch" size="medium" />
          </n-space>
          <n-space align="center" :size="12">
            <span>Large:</span>
            <n-switch v-model:value="sizeSwitch" size="large" />
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Switch States">
        <n-space vertical :size="16">
          <n-space align="center" :size="12">
            <span>Normal:</span>
            <n-switch v-model:value="normalSwitch" />
          </n-space>
          <n-space align="center" :size="12">
            <span>Disabled:</span>
            <n-switch v-model:value="disabledSwitch" disabled />
          </n-space>
          <n-space align="center" :size="12">
            <span>Loading:</span>
            <n-switch v-model:value="loadingSwitch" loading />
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Switch with Custom Values">
        <n-space vertical :size="16">
          <n-switch
            v-model:value="valueSwitch"
            :checked-value="'yes'"
            :unchecked-value="'no'"
          >
            <template #checked>Yes</template>
            <template #unchecked>No</template>
          </n-switch>
          <n-p>Switch value: {{ valueSwitch }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Switch with Events">
        <n-space vertical :size="16">
          <n-switch
            v-model:value="eventSwitch"
            @update:value="handleSwitchChange"
          />
          <n-p>Last change: {{ lastChange || 'No changes yet' }}</n-p>
          <n-p>Change count: {{ changeCount }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Switch in Form">
        <n-space vertical :size="16">
          <n-form :model="formData" label-placement="left" label-width="120">
            <n-form-item label="Notifications">
              <n-switch v-model:value="formData.notifications" />
            </n-form-item>
            <n-form-item label="Email Updates">
              <n-switch v-model:value="formData.emailUpdates" />
            </n-form-item>
            <n-form-item label="Dark Mode">
              <n-switch v-model:value="formData.darkMode" />
            </n-form-item>
            <n-form-item label="Auto Save">
              <n-switch v-model:value="formData.autoSave" />
            </n-form-item>
          </n-form>
          <n-code :code="JSON.stringify(formData, null, 2)" language="json" />
        </n-space>
      </n-card>

      <n-card title="Switch Group">
        <n-space vertical :size="16">
          <div>Feature Toggles:</div>
          <n-space vertical :size="8">
            <n-space align="center" :size="12">
              <n-switch v-model:value="features.beta" />
              <span>Beta Features</span>
            </n-space>
            <n-space align="center" :size="12">
              <n-switch v-model:value="features.advanced" />
              <span>Advanced Mode</span>
            </n-space>
            <n-space align="center" :size="12">
              <n-switch v-model:value="features.experimental" />
              <span>Experimental Features</span>
            </n-space>
          </n-space>
          <n-code :code="JSON.stringify(features, null, 2)" language="json" />
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { CheckmarkOutline, CloseOutline } from '@vicons/ionicons5'

const basicSwitch = ref(false)
const labeledSwitch = ref(false)
const iconSwitch = ref(false)
const sizeSwitch = ref(false)
const normalSwitch = ref(false)
const disabledSwitch = ref(true)
const loadingSwitch = ref(false)
const valueSwitch = ref('no')
const eventSwitch = ref(false)

const lastChange = ref('')
const changeCount = ref(0)

const handleSwitchChange = (value: boolean) => {
  lastChange.value = `Switch changed to: ${value ? 'ON' : 'OFF'} at ${new Date().toLocaleTimeString()}`
  changeCount.value++
}

const formData = reactive({
  notifications: false,
  emailUpdates: true,
  darkMode: false,
  autoSave: true
})

const features = reactive({
  beta: false,
  advanced: false,
  experimental: false
})
</script>

<style scoped>
.switch-demo {
  padding: 0;
}

.n-card {
  margin-bottom: 16px;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.n-code {
  margin-top: 8px;
}
</style>
