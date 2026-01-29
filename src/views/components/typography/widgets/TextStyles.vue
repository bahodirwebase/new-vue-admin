<script setup lang="ts">
import { NSpace } from 'naive-ui'
</script>

<template>
  <n-space vertical :size="16">
    <div>
      <h4>Regular Text</h4>
      <p class="text-regular">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
    
    <div>
      <h4>Text Secondary</h4>
      <p class="text-secondary">
        This is secondary text with reduced opacity for less important information.
      </p>
    </div>

    <div>
      <h4>Text Tertiary</h4>
      <p class="text-tertiary">
        This is tertiary text with even more reduced opacity for supplementary information.
      </p>
    </div>

    <div>
      <h4>Text Success</h4>
      <p class="text-success">
        ✓ Success message with green color
      </p>
    </div>

    <div>
      <h4>Text Warning</h4>
      <p class="text-warning">
        ⚠ Warning message with orange color
      </p>
    </div>

    <div>
      <h4>Text Error</h4>
      <p class="text-error">
        ✗ Error message with red color
      </p>
    </div>

    <div>
      <h4>Text Info</h4>
      <p class="text-info">
        ℹ Info message with blue color
      </p>
    </div>
  </n-space>
</template>
