<script setup lang="ts">
import type { MenuOption } from 'naive-ui'

const horizontalMenuOptions: MenuOption[] = [
  { label: 'Home', key: 'home' },
  { label: 'Products', key: 'products' },
  { label: 'About', key: 'about' },
  { label: 'Contact', key: 'contact' }
]
</script>

<template>
  <n-card title="Horizontal Menu">
    <n-menu mode="horizontal" :options="horizontalMenuOptions" />
  </n-card>
</template>
