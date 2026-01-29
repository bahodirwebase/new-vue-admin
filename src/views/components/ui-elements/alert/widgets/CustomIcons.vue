<template>
    <n-card title="Custom Icons">
        <n-space vertical :size="12">
            <n-alert type="success" show-icon title="With Icon">
                Alerts can display icons to enhance visual communication.
            </n-alert>
            <n-alert type="info" show-icon title="Icon Enabled">
                Icons help users quickly identify the type of message.
            </n-alert>
            <n-alert type="warning" show-icon title="Warning Icon">
                Warning icons draw attention to important notices.
            </n-alert>
            <n-alert type="error" show-icon title="Error Icon">
                Error icons indicate critical issues that need attention.
            </n-alert>
        </n-space>
    </n-card>
</template>