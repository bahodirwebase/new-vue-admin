<template>
  <n-card title="List with Badges">
    <n-list bordered>
      <n-list-item>
        <n-text>Notifications</n-text>
        <template #suffix>
          <n-badge value="5" type="error" />
        </template>
      </n-list-item>
      <n-list-item>
        <n-text>Messages</n-text>
        <template #suffix>
          <n-badge value="12" type="info" />
        </template>
      </n-list-item>
      <n-list-item>
        <n-text>Updates</n-text>
        <template #suffix>
          <n-badge value="New" type="success" />
        </template>
      </n-list-item>
    </n-list>
  </n-card>
</template>
