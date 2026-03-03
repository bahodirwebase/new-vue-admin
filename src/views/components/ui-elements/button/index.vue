<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue";

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
      <PageHeader title="Button" subtitle="Interactive buttons for actions, forms, and navigation" />

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
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

</style>
