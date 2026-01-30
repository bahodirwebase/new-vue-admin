<template>
  <n-card title="Badge with Custom Content">
    <n-space :size="16" align="center">
      <n-badge value="Hot" type="error">
        <n-button type="primary">Featured</n-button>
      </n-badge>
      <n-badge value="Sale" type="success">
        <n-button>Products</n-button>
      </n-badge>
      <n-badge value="Pro">
        <n-button quaternary>Upgrade</n-button>
      </n-badge>
    </n-space>
  </n-card>
</template>
