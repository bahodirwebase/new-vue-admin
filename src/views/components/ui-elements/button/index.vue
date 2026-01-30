<script setup lang="ts">

import ButtonTypes from './widgets/ButtonTypes.vue'
import ButtonSizes from './widgets/ButtonSizes.vue'
import ButtonGroups from './widgets/ButtonGroups.vue'
import ButtonStyles from './widgets/ButtonStyles.vue'
import ButtonStates from './widgets/ButtonStates.vue'
import IconButtons from './widgets/IconButtons.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Button</h1>
        <p class="page-subtitle">Interactive buttons for actions, forms, and navigation</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
        <n-gi>
          <ButtonTypes />
          <ButtonSizes />
          <ButtonGroups />
        </n-gi>
        <n-gi>
          <ButtonStyles />
          <ButtonStates />
          <IconButtons />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>

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
