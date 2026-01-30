<template>
  <n-card title="Complex List Item">
    <n-list bordered>
      <n-list-item>
        <template #prefix>
          <n-avatar
            round
            size="large"
            src="https://api.dicebear.com/7.x/pixel-art/svg?seed=user1"
          />
        </template>
        <div>
          <n-text strong style="font-size: 16px">Sarah Williams</n-text>
          <n-text depth="3" style="display: block; margin-top: 4px">
            Senior Developer • San Francisco, CA
          </n-text>
          <n-text depth="3" style="display: block; margin-top: 8px">
            Working on the new dashboard design. Expected completion: Friday.
          </n-text>
        </div>
        <template #suffix>
          <n-space vertical :size="8">
            <n-badge dot type="success" />
            <n-button size="small" quaternary>Contact</n-button>
          </n-space>
        </template>
      </n-list-item>
    </n-list>
  </n-card>
</template>
