<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Divider</h1>
        <p class="page-subtitle">Visual separators to divide content and create visual hierarchy</p>
      </div>

      <n-card title="Basic Dividers">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Horizontal Dividers</h3>
            <n-space vertical :size="12">
              <div>
                <span style="color: var(--text-secondary)">Default divider:</span>
                <n-divider />
              </div>
              <div>
                <span style="color: var(--text-secondary)">Dashed divider:</span>
                <n-divider dashed />
              </div>
              <div>
                <span style="color: var(--text-secondary)">With title:</span>
                <n-divider>Title Text</n-divider>
              </div>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Vertical Dividers</h3>
            <n-space :size="12">
              <span>Left</span>
              <n-divider vertical />
              <span>Middle</span>
              <n-divider vertical />
              <span>Right</span>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Title Placement">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Title Positions</h3>
            <n-space vertical :size="12">
              <n-divider title-placement="left">Left Title</n-divider>
              <n-divider title-placement="center">Center Title</n-divider>
              <n-divider title-placement="right">Right Title</n-divider>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Custom Styles">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Custom Colors</h3>
            <n-space vertical :size="12">
              <n-divider style="border-color: #18a058">Success Divider</n-divider>
              <n-divider style="border-color: #f0a020">Warning Divider</n-divider>
              <n-divider style="border-color: #d03050">Error Divider</n-divider>
              <n-divider style="border-color: #2080f0">Info Divider</n-divider>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Sizes</h3>
            <n-space vertical :size="12">
              <n-divider style="border-width: 1px">Thin Divider</n-divider>
              <n-divider style="border-width: 2px">Medium Divider</n-divider>
              <n-divider style="border-width: 3px">Thick Divider</n-divider>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="With Content">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Rich Content</h3>
            <n-space vertical :size="12">
              <n-divider>
                <n-space align="center" :size="8">
                  <n-icon color="#18a058">
                    <CheckmarkCircle />
                  </n-icon>
                  <span>Completed Section</span>
                </n-space>
              </n-divider>
              <n-divider>
                <n-tag type="info" size="small">Important</n-tag>
              </n-divider>
              <n-divider>
                <n-button size="tiny" type="primary">Action</n-button>
              </n-divider>
            </n-space>
          </div>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NDivider, NSpace, NCard, NIcon, NTag, NButton } from 'naive-ui'
import { CheckmarkCircle } from '@vicons/ionicons5'
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
