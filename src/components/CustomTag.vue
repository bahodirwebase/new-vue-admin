<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /**
   * Tag turi (rangi)
   * @default 'default'
   */
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default'
  
  /**
   * Tag ko'rinishi
   * @default 'subtle'
   */
  variant?: 'filled' | 'outlined' | 'subtle' | 'ghost'
  
  /**
   * Dumaloq burchaklar
   * @default false
   */
  round?: boolean
  
  /**
   * O'lchami
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  
  /**
   * Yopish tugmasini ko'rsatish
   * @default false
   */
  closable?: boolean

  /**
   * Bosish mumkinligi
   * @default false
   */
  clickable?: boolean

  /**
   * Custom background color
   */
  color?: string
  
  /**
   * Custom text color
   */
  textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  variant: 'subtle',
  round: false,
  size: 'medium',
  closable: false,
  clickable: false
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'click', event: MouseEvent): void
}>()

const classes = computed(() => [
  'custom-tag',
  `tag-${props.type}`,
  `variant-${props.variant}`,
  `size-${props.size}`,
  {
    'is-round': props.round,
    'is-clickable': props.clickable,
    'has-icon': !!props.icon,
    'has-custom-color': !!props.color
  }
])

const styles = computed(() => {
  if (!props.color) return {}
  
  return {
    '--tag-base': props.color,
    '--tag-text': props.textColor || props.color,
    // For filled variant with custom color, we need specific overrides
    ...(props.variant === 'filled' ? { 
      backgroundColor: props.color, 
      color: props.textColor || '#fff',
      borderColor: props.color
    } : {}),
     // For outlined variant
    ...(props.variant === 'outlined' ? { 
      borderColor: props.color, 
      color: props.textColor || props.color 
    } : {})
  }
})

const handleClose = (e: MouseEvent) => {
  e.stopPropagation()
  emit('close')
}
</script>

<template>
  <span :class="classes" :style="styles" @click="emit('click', $event)">
    <span v-if="icon" class="tag-icon">
      <component :is="icon" />
    </span>
    <span class="tag-content">
      <slot />
    </span>
    <span v-if="closable" class="tag-close" @click="handleClose">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </span>
  </span>
</template>

<style scoped>
.custom-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  vertical-align: middle;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: var(--font-primary);
  font-weight: 500;
  border: 1px solid transparent;
  user-select: none;
  position: relative;
  overflow: hidden;
}

.is-clickable {
  cursor: pointer;
}

.is-clickable:active {
  transform: scale(0.96);
}

/* Sizes */
.size-small {
  height: 22px;
  padding: 0 8px;
  font-size: 11px;
  border-radius: 4px;
}

.size-medium {
  height: 28px;
  padding: 0 10px;
  font-size: 13px;
  border-radius: 6px;
}

.size-large {
  height: 34px;
  padding: 0 14px;
  font-size: 14px;
  border-radius: 8px;
}

.is-round {
  border-radius: 9999px;
}

/* Icon & Content */
.tag-content {
  display: flex;
  align-items: center;
  line-height: 1;
}

.tag-icon {
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-size: 1.1em;
}

.tag-close {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s, background-color 0.2s;
  border-radius: 50%;
  padding: 1px;
  width: 16px;
  height: 16px;
}

.tag-close:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.1);
}

/* Base Colors Mapping */
.tag-default {
  --tag-base: var(--text-secondary);
  --tag-bg-base: var(--bg-tertiary);
  --tag-text: var(--text-secondary);
}

.tag-primary {
  --tag-base: var(--primary-color);
}

.tag-success {
  --tag-base: var(--color-success);
}

.tag-warning {
  --tag-base: var(--color-warning);
}

.tag-error {
  --tag-base: var(--color-error);
}

.tag-info {
  --tag-base: var(--color-info);
}

/* Variant: Filled */
.variant-filled {
  background-color: var(--tag-base);
  color: #fff;
  border-color: transparent;
  box-shadow: var(--shadow-sm);
}

.variant-filled:not(.tag-default):hover {
  opacity: 0.9;
}

.variant-filled.tag-default {
  background-color: var(--text-tertiary);
}

/* Variant: Outlined */
.variant-outlined {
  background-color: transparent;
  border-color: var(--tag-base);
  color: var(--tag-base);
}

.variant-outlined:hover {
  background-color: color-mix(in srgb, var(--tag-base) 8%, transparent);
}

.variant-outlined.tag-default {
  border-color: var(--border-color);
  color: var(--text-secondary);
}

/* Variant: Subtle (Modern Default) */
.variant-subtle {
  background-color: color-mix(in srgb, var(--tag-base) 12%, transparent);
  color: var(--tag-base);
  border-color: transparent;
}

.variant-subtle:hover {
  background-color: color-mix(in srgb, var(--tag-base) 18%, transparent);
}

.variant-subtle.tag-default {
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
}

.variant-subtle.tag-default:hover {
  background-color: var(--border-color);
}

/* Variant: Ghost */
.variant-ghost {
  background-color: transparent;
  border-color: transparent;
  color: var(--tag-base);
}

.variant-ghost:hover {
  background-color: color-mix(in srgb, var(--tag-base) 12%, transparent);
}

.variant-ghost.tag-default {
  color: var(--text-secondary);
}
</style>
