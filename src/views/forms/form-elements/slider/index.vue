<template>
  <div class="slider-demo">
    <n-space vertical :size="24">
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <n-card title="Basic Slider">
            <n-space vertical :size="16">
              <n-slider v-model:value="basicValue" />
              <n-p>Slider value: {{ basicValue }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Slider Range">
            <n-space vertical :size="16">
              <n-slider v-model:value="rangeValue" range :min="0" :max="100" />
              <n-p>Range value: {{ rangeValue[0] }} - {{ rangeValue[1] }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Slider Steps">
            <n-space vertical :size="16">
              <n-slider v-model:value="stepValue" :step="10" />
              <n-p>Step value (10): {{ stepValue }}</n-p>
              <n-slider v-model:value="stepValue2" :step="0.1" :min="0" :max="1" />
              <n-p>Step value (0.1): {{ stepValue2 }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Slider Marks">
            <n-space vertical :size="16">
              <n-slider v-model:value="marksValue" :marks="marks" />
              <n-p>Marks value: {{ marksValue }}</n-p>
              <n-slider v-model:value="customMarksValue" :marks="customMarks" />
              <n-p>Custom marks value: {{ customMarksValue }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Slider Sizes">
            <n-space vertical :size="16">
              <div>
                <span style="margin-right: 12px;">Small:</span>
                <n-slider v-model:value="sizeValue" size="small" style="width: 200px; display: inline-block;" />
              </div>
              <div>
                <span style="margin-right: 12px;">Medium:</span>
                <n-slider v-model:value="sizeValue" size="medium" style="width: 200px; display: inline-block;" />
              </div>
              <div>
                <span style="margin-right: 12px;">Large:</span>
                <n-slider v-model:value="sizeValue" size="large" style="width: 200px; display: inline-block;" />
              </div>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Slider States">
            <n-space vertical :size="16">
              <div>
                <span style="margin-right: 12px;">Normal:</span>
                <n-slider v-model:value="normalValue" style="width: 200px; display: inline-block;" />
              </div>
              <div>
                <span style="margin-right: 12px;">Disabled:</span>
                <n-slider v-model:value="disabledValue" disabled style="width: 200px; display: inline-block;" />
              </div>
              <div>
                <span style="margin-right: 12px;">Readonly:</span>
                <n-slider v-model:value="readonlyValue" readonly style="width: 200px; display: inline-block;" />
              </div>
            </n-space>
          </n-card>

          <n-card title="Vertical Slider">
            <n-space vertical :size="16">
              <div style="display: flex; align-items: center; gap: 24px;">
                <div>
                  <span style="margin-right: 12px;">Vertical:</span>
                  <n-slider v-model:value="verticalValue" vertical style="height: 200px;" />
                </div>
                <div>
                  <span style="margin-right: 12px;">Vertical Range:</span>
                  <n-slider v-model:value="verticalRangeValue" vertical range style="height: 200px;" />
                </div>
              </div>
            </n-space>
          </n-card>

          <n-card title="Slider with Tooltip">
            <n-space vertical :size="16">
              <n-slider v-model:value="tooltipValue" :tooltip="false" />
              <n-p>No tooltip: {{ tooltipValue }}</n-p>
              <n-slider v-model:value="customTooltipValue" :format-tooltip="formatTooltip" />
              <n-p>Custom tooltip: {{ customTooltipValue }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Slider Styles">
            <n-space vertical :size="16">
              <n-slider v-model:value="styleValue" color="#ff6b6b" />
              <n-p>Custom color: {{ styleValue }}</n-p>
              <n-slider v-model:value="styleValue2" :rail-style="railStyle" />
              <n-p>Custom rail style: {{ styleValue2 }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Interactive Examples">
            <n-space vertical :size="16">
              <div>
                <h4 style="margin-bottom: 8px;">Volume Control</h4>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <n-icon :component="VolumeMuteOutline" />
                  <n-slider v-model:value="volumeValue" :max="100" style="flex: 1;" />
                  <n-icon :component="VolumeHighOutline" />
                  <span style="min-width: 40px;">{{ volumeValue }}%</span>
                </div>
              </div>

              <div>
                <h4 style="margin-bottom: 8px;">Brightness Control</h4>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <n-icon :component="SunnyOutline" />
                  <n-slider v-model:value="brightnessValue" :max="100" style="flex: 1;" />
                  <span style="min-width: 40px;">{{ brightnessValue }}%</span>
                </div>
              </div>

              <div>
                <h4 style="margin-bottom: 8px;">Price Range Filter</h4>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="min-width: 60px;">${{ priceRange[0] }}</span>
                  <n-slider v-model:value="priceRange" range :min="0" :max="1000" :step="50" style="flex: 1;" />
                  <span style="min-width: 60px;">${{ priceRange[1] }}</span>
                </div>
              </div>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>

    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VolumeMuteOutline, VolumeHighOutline, SunnyOutline } from '@vicons/ionicons5'

const basicValue = ref(50)
const rangeValue = ref([20, 80])
const stepValue = ref(30)
const stepValue2 = ref(0.5)
const marksValue = ref(30)
const customMarksValue = ref(40)
const sizeValue = ref(50)
const normalValue = ref(50)
const disabledValue = ref(50)
const readonlyValue = ref(50)
const verticalValue = ref(50)
const verticalRangeValue = ref([20, 80])
const tooltipValue = ref(50)
const customTooltipValue = ref(50)
const styleValue = ref(50)
const styleValue2 = ref(50)
const volumeValue = ref(75)
const brightnessValue = ref(60)
const priceRange = ref([200, 800])

const marks = {
  0: '0°C',
  20: '20°C',
  40: '40°C',
  60: '60°C',
  80: '80°C',
  100: '100°C'
}

const customMarks = {
  0: 'Min',
  25: 'Low',
  50: 'Medium',
  75: 'High',
  100: 'Max'
}

const formatTooltip = (value: number) => {
  return `${value}% Complete`
}

const railStyle = ({
  focused,
  disabled
}: {
  focused: boolean
  disabled: boolean
}) => {
  return {
    background: disabled ? '#ccc' : focused ? '#18a058' : '#2080f0'
  }
}
</script>

<style scoped>
.slider-demo {
  max-width: 100%;
}
</style>
