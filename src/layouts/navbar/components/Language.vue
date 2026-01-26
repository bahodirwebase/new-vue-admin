<script lang="ts" setup>
import { LanguageOutline } from '@vicons/ionicons5'
import type { DropdownOption } from 'naive-ui'
import { NDropdown, NButton, NIcon } from 'naive-ui'


const languageOptions: DropdownOption[] = [
    {
        label: 'English',
        key: 'en'
    },
    {
        label: 'Russian',
        key: 'ru'
    },
    {
        label: 'Uzbek',
        key: 'uz'
    }
]
</script>

<template>
    <n-dropdown :options="languageOptions" placement="bottom-end">
        <n-button quaternary circle class="language-toggle">
            <template #icon>
                <n-icon :component="LanguageOutline" :size="20" />
            </template>
        </n-button>
    </n-dropdown>
</template>