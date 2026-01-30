<template>
  <div class="input-demo">
    <n-space vertical :size="24">
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <n-card title="Basic Input">
            <n-space vertical :size="16">
              <n-input v-model:value="basicInput" placeholder="Basic input" clearable />
              <n-p>Input value: {{ basicInput || 'Empty' }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Input Types">
            <n-space vertical :size="16">
              <n-input v-model:value="textValue" type="text" placeholder="Text input" />
              <n-input v-model:value="passwordValue" type="password" placeholder="Password input"
                show-password-on="click" />
              <n-input v-model:value="emailValue" type="email" placeholder="Email input" />
              <n-input v-model:value="numberValue" type="number" placeholder="Number input" />
              <n-input v-model:value="urlValue" type="url" placeholder="URL input" />
            </n-space>
          </n-card>

          <n-card title="Input States">
            <n-space vertical :size="16">
              <n-input v-model:value="normalValue" placeholder="Normal state" />
              <n-input v-model:value="disabledValue" placeholder="Disabled state" disabled />
              <n-input v-model:value="readonlyValue" placeholder="Readonly state" readonly />
              <n-input v-model:value="errorValue" placeholder="Error state" status="error" />
              <n-input v-model:value="warningValue" placeholder="Warning state" status="warning" />
            </n-space>
          </n-card>


        </n-gi>
        <n-gi>
          <n-card title="Input with Prefix and Suffix">
            <n-space vertical :size="16">
              <n-input v-model:value="searchValue" placeholder="Search...">
                <template #prefix>
                  <n-icon :component="SearchOutline" />
                </template>
              </n-input>
              <n-input v-model:value="userValue" placeholder="Username">
                <template #prefix>
                  <n-icon :component="PersonOutline" />
                </template>
              </n-input>
              <n-input v-model:value="emailInput" placeholder="Email address">
                <template #suffix>
                  <n-icon :component="MailOutline" />
                </template>
              </n-input>
            </n-space>
          </n-card>

          <n-card title="Textarea">
            <n-space vertical :size="16">
              <n-input v-model:value="textareaValue" type="textarea" placeholder="Enter your message..." :rows="4" />
              <n-input v-model:value="resizableValue" type="textarea" placeholder="Resizable textarea" :rows="3"
                resizable />
            </n-space>
          </n-card>

          <n-card title="Input Validation">
            <n-space vertical :size="16">
              <n-input v-model:value="requiredValue" placeholder="Required field"
                :status="requiredValue ? 'success' : 'error'" />
              <n-input v-model:value="minLengthValue" placeholder="Min 5 characters"
                :status="minLengthValue.length >= 5 ? 'success' : 'warning'" />
              <n-input v-model:value="patternValue" placeholder="Numbers only"
                :status="/^\d+$/.test(patternValue) ? 'success' : 'error'" />
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutline, PersonOutline, MailOutline } from '@vicons/ionicons5'

const basicInput = ref('')
const textValue = ref('')
const passwordValue = ref('')
const emailValue = ref('')
const numberValue = ref('')
const urlValue = ref('')

const normalValue = ref('')
const disabledValue = ref('Disabled content')
const readonlyValue = ref('Readonly content')
const errorValue = ref('')
const warningValue = ref('')

const searchValue = ref('')
const userValue = ref('')
const emailInput = ref('')

const textareaValue = ref('')
const resizableValue = ref('')

const requiredValue = ref('')
const minLengthValue = ref('')
const patternValue = ref('')
</script>

<style scoped>
.input-demo {
  padding: 0;
}


.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}
</style>
