<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue"
import BasicInput from './widgets/BasicInput.vue'
import TypesInput from './widgets/TypesInput.vue'
import StatesInput from './widgets/StatesInput.vue'
import PrefixSuffixInput from './widgets/PrefixSuffixInput.vue'
import TextareaInput from './widgets/TextareaInput.vue'
import ValidationInput from './widgets/ValidationInput.vue'
</script>

<template>
  <div class="input-demo p-0">
    <n-space vertical :size="18">
      <PageHeader title="Input" subtitle="Comprehensive input components with validation, states, and custom styling options" />
      
      <n-grid cols="1 sm:2" responsive="screen" :x-gap="12">
        <n-gi>
          <BasicInput />
          <TypesInput />
          <StatesInput />
        </n-gi>
        <n-gi>
          <PrefixSuffixInput />
          <TextareaInput />
          <ValidationInput />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
</style>
