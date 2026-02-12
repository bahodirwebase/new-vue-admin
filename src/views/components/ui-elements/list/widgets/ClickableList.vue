<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()

const handleClick = (item: string) => {
  message.info(`Clicked: ${item}`)
}
</script>

<template>
  <n-card title="Clickable List Items">
    <n-list bordered clickable>
      <n-list-item @click="handleClick('Item 1')">
        <n-text>Clickable item 1</n-text>
      </n-list-item>
      <n-list-item @click="handleClick('Item 2')">
        <n-text>Clickable item 2</n-text>
      </n-list-item>
      <n-list-item @click="handleClick('Item 3')">
        <n-text>Clickable item 3</n-text>
      </n-list-item>
    </n-list>
  </n-card>
</template>
