<script lang="ts" setup>
import { h } from 'vue'
import type { DropdownOption } from 'naive-ui'
import {
    AppsOutline, DocumentTextOutline,
    AnalyticsOutline, MailOutline
} from '@vicons/ionicons5'
import { NDropdown, NButton, NIcon } from 'naive-ui'



const appsOptions: DropdownOption[] = [
    {
        label: 'Email',
        key: 'email',
        icon: () => h(NIcon, { component: MailOutline })
    },
    {
        label: 'Documents',
        key: 'documents',
        icon: () => h(NIcon, { component: DocumentTextOutline })
    },
    {
        label: 'Analytics',
        key: 'analytics',
        icon: () => h(NIcon, { component: AnalyticsOutline })
    }
]
</script>
<template>
    <n-dropdown :options="appsOptions" placement="bottom-end">
        <n-button quaternary circle class="apps-toggle">
            <template #icon>
                <n-icon :component="AppsOutline" :size="20" />
            </template>
        </n-button>
    </n-dropdown>
</template>