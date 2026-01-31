<script setup lang="ts">

import AlertSizes from './widgets/AlertSizes.vue'
import AlertWithoutTitle from './widgets/AlertWithoutTitle.vue'
import ClosablesAlerts from './widgets/ClosablesAlerts.vue'
import CustomIcons from './widgets/CustomIcons.vue'
import AlertTypes from './widgets/AlertTypes.vue'


</script>
<template>
    <div class="ui-page">
        <n-space vertical :size="24">
            <div class="page-header">
                <h1 class="page-title">Alert</h1>
                <p class="page-subtitle">Contextual feedback messages for user notifications and system status</p>
            </div>

            <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
                <n-gi>
                    <AlertTypes />
                    <ClosablesAlerts />
                    <CustomIcons />
                </n-gi>
                <n-gi>
                    <AlertWithoutTitle />
                    <AlertSizes />
                </n-gi>
            </n-grid>
        </n-space>
    </div>
</template>
