<script lang="ts" setup>
import { h } from 'vue'

import type { DropdownOption } from 'naive-ui'
import {
    PersonCircleOutline,
    LogOutOutline,
    ChatbubbleOutline,
    GridOutline,
    HelpCircleOutline,
    WalletOutline,
    LockClosedOutline,
    CogOutline
} from '@vicons/ionicons5'
import { useRouter, useRoute } from 'vue-router'
import { NIcon } from 'naive-ui'


const router = useRouter()
const route = useRoute()
const userMenuOptions: DropdownOption[] = [
    {
        label: 'Welcome Admin!',
        key: 'welcome',
        props: {
            style: {
                fontWeight: '700',
                fontSize: '14px',
                color: 'var(--primary-color)',
                padding: '0px 12px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '6px',
                margin: '4px 8px',
                textAlign: 'center'
            }
        }
    },
    {
        label: 'Profile',
        key: 'UserProfile',
        icon: () => h(NIcon, { component: PersonCircleOutline }),

    },
    {
        label: 'Messages',
        key: 'Chat',
        icon: () => h(NIcon, { component: ChatbubbleOutline })
    },
    {
        label: 'Taskboard',
        key: 'taskboard',
        disabled: true,
        icon: () => h(NIcon, { component: GridOutline })
    },
    {
        label: 'Help',
        key: 'Faq',
        icon: () => h(NIcon, { component: HelpCircleOutline })
    },
    {
        label: 'Balance : $5971.67',
        key: 'Pricing',
        icon: () => h(NIcon, { component: WalletOutline, style: 'color: var(--color-success)' }),
        props: {
            style: {
                fontWeight: '600',
                color: 'var(--color-success)'
            }
        }
    },
    {
        type: 'divider'
    },
    {
        label: 'Settings',
        key: 'AccountSettings',
        icon: () => h(NIcon, { component: CogOutline })
    },
    {
        label: 'Lock screen',
        key: 'LockScreen',
        icon: () => h(NIcon, { component: LockClosedOutline })
    },
    {
        label: 'Logout',
        key: 'logout',
        icon: () => h(NIcon, { component: LogOutOutline })
    }
]
const handleSelect = (key: string) => {
    if (key === 'logout') {
        router.push({ name: 'LoginSimple' })
        // logout logikasi
    } else {
        // Tanlangan key (path) ga yo'naltirish
        router.push({ name: key })
    }
}
</script>
<template>
    <n-dropdown :options="userMenuOptions" @select="handleSelect" placement="bottom-end" :value="route.name">
        <n-avatar round :size="32" style="cursor: pointer">
            <n-icon :component="PersonCircleOutline" :size="24" />
        </n-avatar>
    </n-dropdown>
</template>
