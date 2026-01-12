<template>
  <div class="radio-demo">
    <n-space vertical :size="24">
      <n-card title="Basic Radio">
        <n-space vertical :size="16">
          <n-radio-group v-model:value="basicRadio">
            <n-radio value="option1">Option 1</n-radio>
            <n-radio value="option2">Option 2</n-radio>
            <n-radio value="option3">Option 3</n-radio>
          </n-radio-group>
          <n-p>Selected value: {{ basicRadio || 'None' }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Radio Button Group">
        <n-space vertical :size="16">
          <n-radio-group v-model:value="buttonRadio">
            <n-radio-button value="left">Left</n-radio-button>
            <n-radio-button value="center">Center</n-radio-button>
            <n-radio-button value="right">Right</n-radio-button>
          </n-radio-group>
          <n-p>Selected value: {{ buttonRadio || 'None' }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Vertical Radio Group">
        <n-space vertical :size="16">
          <n-radio-group v-model:value="verticalRadio" vertical>
            <n-radio value="small">Small Size</n-radio>
            <n-radio value="medium">Medium Size</n-radio>
            <n-radio value="large">Large Size</n-radio>
          </n-radio-group>
          <n-p>Selected value: {{ verticalRadio || 'None' }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Radio with Custom Labels">
        <n-space vertical :size="16">
          <n-radio-group v-model:value="customRadio">
            <n-space vertical :size="8">
              <n-radio value="premium">
                <template #default>
                  <div>
                    <div style="font-weight: 600">Premium Plan</div>
                    <div style="font-size: 12px; color: var(--text-secondary)">
                      $9.99/month - All features included
                    </div>
                  </div>
                </template>
              </n-radio>
              <n-radio value="basic">
                <template #default>
                  <div>
                    <div style="font-weight: 600">Basic Plan</div>
                    <div style="font-size: 12px; color: var(--text-secondary)">
                      Free - Basic features only
                    </div>
                  </div>
                </template>
              </n-radio>
            </n-space>
          </n-radio-group>
          <n-p>Selected plan: {{ customRadio || 'None' }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Radio States">
        <n-space vertical :size="16">
          <n-radio-group v-model:value="statesRadio">
            <n-radio value="normal" :disabled="false">Normal</n-radio>
            <n-radio value="disabled" disabled>Disabled</n-radio>
            <n-radio value="checked" :default-checked="true" disabled>Checked & Disabled</n-radio>
          </n-radio-group>
          <n-p>Selected value: {{ statesRadio || 'None' }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Radio with Icons">
        <n-space vertical :size="16">
          <n-radio-group v-model:value="iconRadio">
            <n-radio value="home">
              <template #default>
                <n-space align="center" :size="8">
                  <n-icon :component="HomeOutline" />
                  <span>Home</span>
                </n-space>
              </template>
            </n-radio>
            <n-radio value="work">
              <template #default>
                <n-space align="center" :size="8">
                  <n-icon :component="BriefcaseOutline" />
                  <span>Work</span>
                </n-space>
              </template>
            </n-radio>
            <n-radio value="school">
              <template #default>
                <n-space align="center" :size="8">
                  <n-icon :component="SchoolOutline" />
                  <span>School</span>
                </n-space>
              </template>
            </n-radio>
          </n-radio-group>
          <n-p>Selected location: {{ iconRadio || 'None' }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Radio Size Variants">
        <n-space vertical :size="16">
          <n-space align="center" :size="12">
            <span>Small:</span>
            <n-radio-group v-model:value="sizeRadio" size="small">
              <n-radio value="a">A</n-radio>
              <n-radio value="b">B</n-radio>
            </n-radio-group>
          </n-space>
          <n-space align="center" :size="12">
            <span>Medium:</span>
            <n-radio-group v-model:value="sizeRadio" size="medium">
              <n-radio value="a">A</n-radio>
              <n-radio value="b">B</n-radio>
            </n-radio-group>
          </n-space>
          <n-space align="center" :size="12">
            <span>Large:</span>
            <n-radio-group v-model:value="sizeRadio" size="large">
              <n-radio value="a">A</n-radio>
              <n-radio value="b">B</n-radio>
            </n-radio-group>
          </n-space>
          <n-p>Selected value: {{ sizeRadio || 'None' }}</n-p>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeOutline, BriefcaseOutline, SchoolOutline } from '@vicons/ionicons5'

const basicRadio = ref('')
const buttonRadio = ref('')
const verticalRadio = ref('')
const customRadio = ref('')
const statesRadio = ref('')
const iconRadio = ref('')
const sizeRadio = ref('')
</script>

<style scoped>
.radio-demo {
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
</style>
