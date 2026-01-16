<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Avatar</h1>
        <p class="page-subtitle">
          User profile images, initials, and status indicators
        </p>
      </div>
      <n-grid x-gap="12" :cols="2" >
        <n-gi>
          <n-card title="Avatar Sizes" >
            <n-space :size="16" align="center">
              <n-avatar size="small" round>SM</n-avatar>
              <n-avatar size="medium">MD</n-avatar>
              <n-avatar size="large">LG</n-avatar>
              <n-avatar :size="64" round>XL</n-avatar>
              <n-avatar :size="80" round>XXL</n-avatar>
            </n-space>
          </n-card>
          <n-card title="Avatar Groups" >
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Overlapping Avatars
                </h3>
                <n-avatar-group :options="avatarOptions" :max="3" />
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Custom Max Count
                </h3>
                <n-avatar-group :options="avatarOptions" :max="5" />
              </div>
            </n-space>
          </n-card>
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
        </n-gi>
        <n-gi>
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
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
interface AvatarOption {
  name: string;
  src: string;
}

const avatarOptions: AvatarOption[] = [
  {
    name: "John Doe",
    src: "https://api.dicebear.com/7.x/pixel-art/svg?seed=john",
  },
  {
    name: "Jane Smith",
    src: "https://api.dicebear.com/7.x/pixel-art/svg?seed=jane",
  },
  {
    name: "Mike Johnson",
    src: "https://api.dicebear.com/7.x/pixel-art/svg?seed=mike",
  },
  {
    name: "Sarah Williams",
    src: "https://api.dicebear.com/7.x/pixel-art/svg?seed=sarah",
  },
  {
    name: "Tom Brown",
    src: "https://api.dicebear.com/7.x/pixel-art/svg?seed=tom",
  },
  {
    name: "Emma Davis",
    src: "https://api.dicebear.com/7.x/pixel-art/svg?seed=emma",
  },
];
</script>

<style scoped>
.ui-page {
  max-width: 100%;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

.n-card {
  margin-bottom: 12px;
}
</style>
