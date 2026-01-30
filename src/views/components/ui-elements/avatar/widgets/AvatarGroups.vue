<template>
  <n-card title="Avatar Groups">
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
