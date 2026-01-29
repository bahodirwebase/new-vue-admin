<script lang="ts" setup>
import { useMessage } from 'naive-ui'
const message = useMessage()

const handleClose = () => {
  message.info('Alert closed')
}
</script>
<template>
    <n-card title="Closable Alerts">
        <n-space vertical :size="12">
            <n-alert type="success" closable @close="handleClose">
                This alert can be closed by clicking the X button.
            </n-alert>
            <n-alert type="info" closable title="Dismissible Info">
                You can dismiss this alert to remove it from view.
            </n-alert>
        </n-space>
    </n-card>
</template>