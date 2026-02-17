<script setup lang="ts">
import { ref, computed, h, watch } from 'vue'
import { useMessage, NDynamicTags, NAutoComplete, NText, NCollapseTransition, NIcon } from 'naive-ui'
import { PricetagOutline, AlertCircleOutline } from '@vicons/ionicons5'
import CustomTag from '@/components/custom/CustomTag.vue'

interface Props {
    value?: string[]
    max?: number
    suggestions?: string[]
    variant?: 'filled' | 'outlined' | 'subtle' | 'ghost'
    size?: 'small' | 'medium' | 'large'
    round?: boolean
    closable?: boolean
    colorful?: boolean
    placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
    value: () => [],
    max: undefined,
    suggestions: () => [],
    variant: 'subtle',
    size: 'medium',
    round: false,
    closable: true,
    colorful: true,
    placeholder: 'Add tag...'
})

const emit = defineEmits<{
    (e: 'update:value', value: string[]): void
    (e: 'exceed'): void
    (e: 'clear'): void
}>()

const message = useMessage()
const inputValue = ref('')
const isFocused = ref(false)
const showLimitWarning = ref(false)

const tags = computed({
    get: () => props.value,
    set: (val) => {
        emit('update:value', val)
    }
})

const autoCompleteOptions = computed(() => {
    if (!props.suggestions.length) return []
    return props.suggestions
        .filter(tag => !tags.value.includes(tag) && tag.toLowerCase().includes(inputValue.value.toLowerCase()))
        .map(tag => ({ label: tag, value: tag }))
})

const getTagType = (index: number) => {
    if (!props.colorful) return 'default'
    const types = ['primary', 'success', 'warning', 'info', 'error'] as const
    return types[index % types.length]
}

const renderCustomTag = (tag: string, index: number) => {
    return h(CustomTag, {
        type: getTagType(index),
        variant: props.variant,
        size: props.size,
        round: props.round,
        closable: props.closable,
        style: { marginRight: '4px', marginBottom: '4px' },
        icon: PricetagOutline,
        onClose: () => removeTag(index)
    }, { default: () => tag })
}

const removeTag = (index: number) => {
    const newTags = [...tags.value]
    newTags.splice(index, 1)
    emit('update:value', newTags)
    showLimitWarning.value = false
}

const handleInputSubmit = (value: string) => {
    if (!value || !value.trim()) return

    if (props.max && tags.value.length >= props.max) {
        showLimitWarning.value = true
        emit('exceed')
        return
    }

    if (tags.value.includes(value)) {
        message.warning('Tag already exists')
        inputValue.value = ''
        return
    }

    emit('update:value', [...tags.value, value])
    inputValue.value = ''
    showLimitWarning.value = false
}

watch(() => tags.value.length, (newLength) => {
    if (props.max && newLength < props.max) {
        showLimitWarning.value = false
    }
})
</script>

<template>
    <div class="custom-dynamic-tags-wrapper" :class="{ 'is-focused': isFocused }">
        <n-dynamic-tags v-model:value="tags" :render-tag="renderCustomTag" :max="max" @focus="isFocused = true"
            @blur="isFocused = false">
            <template #input="{ deactivate }">
                <n-auto-complete v-model:value="inputValue" :options="autoCompleteOptions" :placeholder="placeholder"
                    size="small" :clear-after-select="true" @select="handleInputSubmit($event)"
                    @keydown.enter.prevent="handleInputSubmit(inputValue)" @blur="deactivate" />
            </template>
        </n-dynamic-tags>

        <n-collapse-transition :show="showLimitWarning">
            <div class="limit-warning">
                <n-text type="warning" depth="3">
                    <div style="display: flex; align-items: center; gap: 4px; margin-top: 8px;">
                        <n-icon><alert-circle-outline /></n-icon>
                        Limit of {{ max }} tags reached
                    </div>
                </n-text>
            </div>
        </n-collapse-transition>
    </div>
</template>

<style scoped>
.custom-dynamic-tags-wrapper {
    padding: 6px;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background-color: var(--input-color);
    transition: all 0.3s var(--cubic-bezier-ease-in-out);
    min-height: 42px;
}

.custom-dynamic-tags-wrapper.is-focused {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
    background-color: var(--card-color);
}

:deep(.n-dynamic-tags) {
    width: 100%;
}

:deep(.n-tag) {
    margin-right: 4px;
    margin-bottom: 4px;
}
</style>
