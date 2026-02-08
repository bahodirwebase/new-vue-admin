<template>
  <n-card title="Modal Features">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Closable Modal
        </h3>
        <n-button @click="showClosable = true">Show Closable</n-button>
        <n-modal v-model:show="showClosable" preset="dialog" title="Closable Modal" :closable="true">
          <p>This modal can be closed using the X button or ESC key.</p>
        </n-modal>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Mask Closable
        </h3>
        <n-button @click="showMaskClosable = true">Show Mask Closable</n-button>
        <n-modal v-model:show="showMaskClosable" preset="dialog" title="Mask Closable" :mask-closable="false">
          <p>This modal can be closed by clicking the mask/overlay.</p>
        </n-modal>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showClosable = ref(false)
const showMaskClosable = ref(false)
</script>
