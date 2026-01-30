<template>
  <n-card title="Dot Badges">
    <n-space :size="16" align="center">
      <n-badge dot>
        <n-button>Default Dot</n-button>
      </n-badge>
      <n-badge dot type="success">
        <n-button quaternary>Online</n-button>
      </n-badge>
      <n-badge dot type="warning">
        <n-button quaternary>Pending</n-button>
      </n-badge>
      <n-badge dot type="error">
        <n-button quaternary>Offline</n-button>
      </n-badge>
      <n-badge dot type="info">
        <n-button quaternary>Active</n-button>
      </n-badge>
    </n-space>
  </n-card>
</template>
