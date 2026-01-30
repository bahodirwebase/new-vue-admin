<template>
  <n-card title="Badge Types">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Default Badges
        </h3>
        <n-space :size="16" align="center">
          <n-badge value="9+">
            <n-button>Notifications</n-button>
          </n-badge>
          <n-badge value="New">
            <n-button type="primary">Messages</n-button>
          </n-badge>
          <n-badge value="99+">
            <n-button type="info">Updates</n-button>
          </n-badge>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Colored Badges
        </h3>
        <n-space :size="16" align="center">
          <n-badge type="success" value="5">
            <n-button quaternary>Success</n-button>
          </n-badge>
          <n-badge type="warning" value="12">
            <n-button quaternary>Warning</n-button>
          </n-badge>
          <n-badge type="error" value="3">
            <n-button quaternary>Error</n-button>
          </n-badge>
          <n-badge type="info" value="8">
            <n-button quaternary>Info</n-button>
          </n-badge>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
