<script setup lang="ts">
import BasicInput from './widgets/BasicInput.vue'
import TypesInput from './widgets/TypesInput.vue'
import StatesInput from './widgets/StatesInput.vue'
import PrefixSuffixInput from './widgets/PrefixSuffixInput.vue'
import TextareaInput from './widgets/TextareaInput.vue'
import ValidationInput from './widgets/ValidationInput.vue'
</script>

<template>
  <div class="input-demo">
    <n-space vertical :size="24">
      <n-grid :cols="2" :x-gap="12">
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
.input-demo {
  padding: 0;
}
</style>
