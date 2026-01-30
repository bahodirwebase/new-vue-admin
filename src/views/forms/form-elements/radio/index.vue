<script setup lang="ts">
import BasicRadio from './widgets/BasicRadio.vue'
import ButtonRadio from './widgets/ButtonRadio.vue'
import VerticalRadio from './widgets/VerticalRadio.vue'
import CustomRadio from './widgets/CustomRadio.vue'
import StatesRadio from './widgets/StatesRadio.vue'
import IconRadio from './widgets/IconRadio.vue'
import SizesRadio from './widgets/SizesRadio.vue'
</script>

<template>
  <div class="radio-demo">
    <n-space vertical :size="24">
      <n-grid :cols="2" :x-gap="12">
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
.radio-demo {
  padding: 0;
}
</style>
