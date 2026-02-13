<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NSpace, NIcon, NText } from 'naive-ui'
import {
  SettingsOutline,
  CodeSlashOutline,
  ColorPaletteOutline,
  LayersOutline,
  CheckmarkCircleOutline,
  TimeOutline
} from '@vicons/ionicons5'
import CustomCollapse from '@/components/CustomCollapse.vue'
import CustomCollapseItem from '@/components/CustomCollapseItem.vue'

const activeItems = ref(['features', 'customization'])

const features = [
  { title: 'Accordion Mode', description: 'Only one item can be expanded at a time', icon: LayersOutline },
  { title: 'Custom Icons', description: 'Use any custom icon for expand/collapse', icon: ColorPaletteOutline },
  { title: 'Multiple Sizes', description: 'Small, medium, and large sizes available', icon: SettingsOutline },
  { title: 'Ghost Mode', description: 'Minimalist style without backgrounds', icon: CodeSlashOutline }
]

const customizationOptions = [
  { name: 'Arrow Position', value: 'Left or Right' },
  { name: 'Border Style', value: 'Bordered or Borderless' },
  { name: 'Size Variants', value: 'Small, Medium, Large' },
  { name: 'Color Themes', value: 'CSS Custom Properties' }
]

const codeExamples = [
  {
    title: 'Basic Usage',
    code: `<CustomCollapse>
  <CustomCollapseItem title="Item 1">
    Content for item 1
  </CustomCollapseItem>
</CustomCollapse>`
  },
  {
    title: 'Accordion Mode',
    code: `<CustomCollapse accordion>
  <CustomCollapseItem title="Item 1">
    Only one open at a time
  </CustomCollapseItem>
</CustomCollapse>`
  }
]
</script>

<template>
  <div>
    <NCard title="Custom Collapse Component" :bordered="false" size="small">
      <NSpace vertical :size="16">
        <!-- Introduction -->
        <div class="widget-intro">
          <NText depth="3">
            Modern, customizable collapse component built with Vue 3 Composition API.
            Features smooth animations, flexible styling, and comprehensive customization options.
          </NText>
        </div>

        <!-- Demo Collapse -->
        <CustomCollapse v-model:default-active="activeItems" class="demo-collapse">
          <CustomCollapseItem key="features" title="Key Features">
            <NSpace vertical :size="12">
              <div v-for="feature in features" :key="feature.title" class="feature-item">
                <div class="feature-content">
                  <NIcon :component="feature.icon" class="feature-icon" />
                  <div class="feature-text">
                    <NText strong>{{ feature.title }}</NText>
                    <NText depth="3" style="font-size: 12px;">
                      {{ feature.description }}
                    </NText>
                  </div>
                </div>
              </div>
            </NSpace>
          </CustomCollapseItem>

          <CustomCollapseItem key="customization" title="Customization Options">
            <NSpace vertical :size="8">
              <NText>Available customization options:</NText>
              <div class="customization-grid">
                <div v-for="option in customizationOptions" :key="option.name" class="custom-option">
                  <NIcon :component="CheckmarkCircleOutline" class="check-icon" />
                  <div>
                    <NText strong>{{ option.name }}</NText>
                    <div class="option-value">{{ option.value }}</div>
                  </div>
                </div>
              </div>
            </NSpace>
          </CustomCollapseItem>

          <CustomCollapseItem key="examples" title="Code Examples">
            <NSpace vertical :size="16">
              <div v-for="example in codeExamples" :key="example.title">
                <NText strong>{{ example.title }}</NText>
                <pre class="code-example"><code>{{ example.code }}</code></pre>
              </div>
            </NSpace>
          </CustomCollapseItem>

          <CustomCollapseItem key="performance" title="Performance">
            <NSpace vertical :size="12">
              <div class="performance-item">
                <NIcon :component="TimeOutline" class="perf-icon" />
                <div>
                  <NText>Optimized Animations</NText>
                  <NText depth="3" style="font-size: 12px;">
                    Smooth CSS transitions with GPU acceleration
                  </NText>
                </div>
              </div>
              <div class="performance-item">
                <NIcon :component="CheckmarkCircleOutline" class="perf-icon" />
                <div>
                  <NText>Lightweight</NText>
                  <NText depth="3" style="font-size: 12px;">
                    No external dependencies, pure Vue 3 implementation
                  </NText>
                </div>
              </div>
            </NSpace>
          </CustomCollapseItem>
        </CustomCollapse>
      </NSpace>
    </NCard>
    
  </div>
</template>

<style scoped>
.widget-intro {
  padding: 12px;
  background-color: var(--hover-color);
  border-radius: 6px;
  border-left: 3px solid var(--primary-color);
}

.demo-collapse {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.feature-item {
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.feature-item:hover {
  background-color: var(--hover-color);
}

.feature-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.feature-icon {
  color: var(--primary-color);
  font-size: 18px;
  margin-top: 2px;
}

.feature-text {
  flex: 1;
}

.customization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.custom-option {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.check-icon {
  color: var(--color-success);
  font-size: 16px;
  margin-top: 2px;
}

.option-value {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.code-example {
  background-color: var(--code-color);
  padding: 12px;
  border-radius: 6px;
  font-size: 12px;
  overflow-x: auto;
  color: var(--text-primary);
}

.performance-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px;
}

.perf-icon {
  color: var(--color-success);
  font-size: 18px;
  margin-top: 2px;
}

.style-variants {
  padding: 12px;
  background-color: var(--bg-tertiary);
  border-radius: 6px;
}
</style>
