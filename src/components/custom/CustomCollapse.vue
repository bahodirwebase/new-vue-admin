<script setup lang="ts">
import { ref, computed, provide, watch } from 'vue'

interface Props {
  /**
   * Accordion mode - only one item open at a time
   * @default false
   */
  accordion?: boolean
  
  /**
   * Default active item names/indices
   */
  defaultActive?: string[] | number[]
  
  /**
   * Border between items
   * @default true
   */
  bordered?: boolean
  
  /**
   * Ghost mode - no background
   * @default false
   */
  ghost?: boolean
  
  /**
   * Size of collapse items
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  
  /**
   * Position of expand icon
   * @default 'right'
   */
  expandIconPosition?: 'left' | 'right'
  
  /**
   * Custom icon for expand/collapse
   */
  expandIcon?: any
}

const props = withDefaults(defineProps<Props>(), {
  accordion: false,
  defaultActive: () => [],
  bordered: true,
  ghost: false,
  size: 'medium',
  expandIconPosition: 'right'
})

const emit = defineEmits([
  'update:defaultActive',
  'change',
  'item-click'
])

const activeKeys = ref<Set<string>>(new Set())
const items = ref<Map<string, { name: string; disabled: boolean }>>(new Map())

// Initialize default active keys
if (props.defaultActive.length > 0) {
  activeKeys.value = new Set(props.defaultActive.map(String))
}

const classes = computed(() => [
  'custom-collapse',
  `size-${props.size}`,
  {
    'is-bordered': props.bordered,
    'is-ghost': props.ghost,
    'is-accordion': props.accordion
  }
])

// Provide collapse context for child items
provide('collapseContext', {
  activeKeys,
  accordion: props.accordion,
  expandIconPosition: props.expandIconPosition,
  expandIcon: props.expandIcon,
  registerItem: (key: string, name: string, disabled: boolean = false) => {
    items.value.set(key, { name, disabled })
  },
  unregisterItem: (key: string) => {
    items.value.delete(key)
  },
  toggleItem: (key: string) => {
    const item = items.value.get(key)
    if (!item || item.disabled) return

    if (props.accordion) {
      // Accordion mode: close all others, open this one
      activeKeys.value.clear()
      activeKeys.value.add(key)
    } else {
      // Normal mode: toggle this item
      if (activeKeys.value.has(key)) {
        activeKeys.value.delete(key)
      } else {
        activeKeys.value.add(key)
      }
    }
    
    const activeArray = Array.from(activeKeys.value)
    emit('update:defaultActive', activeArray)
    emit('change', activeArray)
    emit('item-click', key)
  }
})

// Watch for external changes
watch(() => props.defaultActive, (newVal) => {
  activeKeys.value = new Set(newVal.map(String))
}, { deep: true })
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style scoped>
.custom-collapse {
  background-color: var(--card-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  width: 100%;
}

.custom-collapse.is-bordered {
  border: 1px solid var(--border-color);
}

.custom-collapse.is-ghost {
  background-color: transparent;
  border: none;
}

/* Size variations */
.size-small {
  font-size: 13px;
}

.size-medium {
  font-size: 14px;
}

.size-large {
  font-size: 16px;
}
</style>
