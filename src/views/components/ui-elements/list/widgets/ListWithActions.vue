<template>
  <n-card title="List with Actions">
    <n-list bordered>
      <n-list-item>
        <n-text strong>Project Alpha</n-text>
        <template #suffix>
          <n-button size="small" quaternary>View</n-button>
        </template>
      </n-list-item>
      <n-list-item>
        <n-text strong>Project Beta</n-text>
        <template #suffix>
          <n-button size="small" quaternary>View</n-button>
        </template>
      </n-list-item>
      <n-list-item>
        <n-text strong>Project Gamma</n-text>
        <template #suffix>
          <n-button size="small" quaternary>View</n-button>
        </template>
      </n-list-item>
    </n-list>
  </n-card>
</template>
