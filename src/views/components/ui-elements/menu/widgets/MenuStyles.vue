<script setup lang="ts">
import type { MenuOption } from 'naive-ui'

const styleMenuOptions: MenuOption[] = [
  { label: 'Home', key: 'home' },
  { label: 'Products', key: 'products' },
  { label: 'Services', key: 'services' },
  { label: 'Contact', key: 'contact' }
]
</script>

<template>
  <n-card title="Menu Styles">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Default Style
        </h3>
        <n-menu :options="styleMenuOptions" />
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Inverted Style
        </h3>
        <n-menu :options="styleMenuOptions" inverted />
      </div>
    </n-space>
  </n-card>
</template>
