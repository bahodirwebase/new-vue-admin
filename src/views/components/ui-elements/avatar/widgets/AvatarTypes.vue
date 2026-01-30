<template>
  <n-card title="Avatar Types">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Initials
        </h3>
        <n-space :size="16" align="center">
          <n-avatar round>JD</n-avatar>
          <n-avatar color="#6366f1">MK</n-avatar>
          <n-avatar color="#10b981">AB</n-avatar>
          <n-avatar color="#f59e0b">CD</n-avatar>
          <n-avatar color="#ef4444">EF</n-avatar>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Images
        </h3>
        <n-space :size="16" align="center">
          <n-avatar
            round
            src="https://api.dicebear.com/7.x/pixel-art/svg?seed=avatar1"
          />
          <n-avatar
            round
            src="https://api.dicebear.com/7.x/pixel-art/svg?seed=avatar2"
          />
          <n-avatar
            round
            src="https://api.dicebear.com/7.x/pixel-art/svg?seed=avatar3"
          />
          <n-avatar
            round
            src="https://api.dicebear.com/7.x/pixel-art/svg?seed=avatar4"
          />
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Square vs Round
        </h3>
        <n-space :size="16" align="center">
          <n-avatar>SQ</n-avatar>
          <n-avatar round>RD</n-avatar>
          <n-avatar color="#6366f1">SQ</n-avatar>
          <n-avatar round color="#6366f1">RD</n-avatar>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
