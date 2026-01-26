<script lang="ts" setup>
import { ExpandOutline, ContractOutline } from '@vicons/ionicons5'
import { NButton, NIcon } from 'naive-ui'
import { useFullscreen } from '@/composables'

const { isFullscreen, toggleFullscreen } = useFullscreen()
</script>

<template>
    <n-button  quaternary circle @click="toggleFullscreen" class="fullscreen-toggle">
        <template #icon>
            <n-icon v-if="!isFullscreen" :component="ExpandOutline" :size="20" />
            <n-icon v-else :component="ContractOutline" :size="20" />
        </template>
    </n-button>
</template>