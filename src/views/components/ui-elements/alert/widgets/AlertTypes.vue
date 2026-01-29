<template>
    <n-card title="Alert Types">
        <n-space vertical :size="12">
            <n-alert type="success" title="Success Alert">
                Your changes have been saved successfully. The data has been updated in the database.
            </n-alert>
            <n-alert type="info" title="Information Alert">
                New features are available in this update. Check out the latest improvements and enhancements.
            </n-alert>
            <n-alert type="warning" title="Warning Alert">
                Your session will expire in 5 minutes. Please save your work to avoid losing any unsaved changes.
            </n-alert>
            <n-alert type="error" title="Error Alert">
                There was a problem processing your request. Please try again or contact support if the issue persists.
            </n-alert>
        </n-space>
    </n-card>
</template>