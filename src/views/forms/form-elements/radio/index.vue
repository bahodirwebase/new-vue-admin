<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue"
import BasicRadio from './widgets/BasicRadio.vue'
import ButtonRadio from './widgets/ButtonRadio.vue'
import VerticalRadio from './widgets/VerticalRadio.vue'
import CustomRadio from './widgets/CustomRadio.vue'
import StatesRadio from './widgets/StatesRadio.vue'
import IconRadio from './widgets/IconRadio.vue'
import SizesRadio from './widgets/SizesRadio.vue'
</script>

<template>
  <div class="radio-demo p-0">
    <n-space vertical :size="18">
      <PageHeader title="Radio" subtitle="Interactive radio button components with custom styling, icons, and various layout options" />
      
      <n-grid cols="1 sm:2" responsive="screen" :x-gap="12">
        <n-gi>
          <BasicRadio />
          <ButtonRadio />
          <VerticalRadio />
          <CustomRadio />
        </n-gi>
        <n-gi>
          <StatesRadio />
          <IconRadio />
          <SizesRadio />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
</style>
