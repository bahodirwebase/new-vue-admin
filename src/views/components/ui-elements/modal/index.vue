<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue";

import BasicModals from './widgets/BasicModals.vue'
import ModalFeatures from './widgets/ModalFeatures.vue'
import ModalSizes from './widgets/ModalSizes.vue'
import ModalWithForm from './widgets/ModalWithForm.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <PageHeader title="Modal" subtitle="Dialog boxes, confirmations, and layered content overlays" />

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <BasicModals />
          <ModalFeatures />
        </n-gi>

        <n-gi>
          <ModalSizes />
          <ModalWithForm />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
