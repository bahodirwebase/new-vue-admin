<template>
  <n-card title="Avatar with Fallback">
    <n-space :size="16" align="center">
      <n-avatar
        round
        size="large"
        src="https://invalid-url.com/image.jpg"
        fallback-src="https://api.dicebear.com/7.x/pixel-art/svg?seed=fallback"
      />
      <n-avatar
        round
        size="large"
        src="https://invalid-url.com/image.jpg"
      >
        FB
      </n-avatar>
    </n-space>
  </n-card>
</template>
