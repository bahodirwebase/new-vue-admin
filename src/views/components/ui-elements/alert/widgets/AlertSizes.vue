<template>
    <n-card title="Alert Sizes">
        <n-space vertical :size="12">
            <n-alert type="info" size="small" title="Small Alert">
                This is a small-sized alert component.
            </n-alert>
            <n-alert type="info" size="medium" title="Medium Alert">
                This is a medium-sized alert component (default).
            </n-alert>
            <n-alert type="info" size="large" title="Large Alert">
                This is a large-sized alert component for important messages.
            </n-alert>
        </n-space>
    </n-card>
</template>