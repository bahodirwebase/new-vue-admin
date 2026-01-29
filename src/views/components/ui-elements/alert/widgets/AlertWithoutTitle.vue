<template>
    <n-card title="Alert Without Title">
        <n-space vertical :size="12">
            <n-alert type="success">Operation completed successfully.</n-alert>
            <n-alert type="info">This is an informational message without a title.</n-alert>
            <n-alert type="warning">Please review your input before submitting.</n-alert>
            <n-alert type="error">An error occurred during the process.</n-alert>
        </n-space>
    </n-card>
</template>