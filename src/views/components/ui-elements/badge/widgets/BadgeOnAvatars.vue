<template>
  <n-card title="Badge on Avatars">
    <n-space :size="24" align="center">
      <n-badge dot type="success">
        <n-avatar round size="large">JD</n-avatar>
      </n-badge>
      <n-badge value="5" type="error">
        <n-avatar round size="large" color="#6366f1">MK</n-avatar>
      </n-badge>
      <n-badge value="12+">
        <n-avatar
          round
          size="large"
          src="https://api.dicebear.com/7.x/pixel-art/svg?seed=badge"
        />
      </n-badge>
    </n-space>
  </n-card>
</template>
