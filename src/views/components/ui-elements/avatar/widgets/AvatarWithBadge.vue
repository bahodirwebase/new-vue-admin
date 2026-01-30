<template>
  <n-card title="Avatar with Badge">
    <n-space :size="24" align="center">
      <n-badge dot type="success">
        <n-avatar round size="large">ON</n-avatar>
      </n-badge>
      <n-badge dot type="warning">
        <n-avatar round size="large" color="#6366f1">AW</n-avatar>
      </n-badge>
      <n-badge dot type="error">
        <n-avatar
          round
          size="large"
          src="https://api.dicebear.com/7.x/pixel-art/svg?seed=badge"
        />
      </n-badge>
      <n-badge value="5" type="error">
        <n-avatar round size="large">NT</n-avatar>
      </n-badge>
    </n-space>
  </n-card>
</template>
