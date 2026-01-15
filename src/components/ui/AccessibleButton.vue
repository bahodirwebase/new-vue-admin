<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :aria-describedby="ariaDescribedBy"
    :aria-expanded="ariaExpanded"
    :aria-pressed="ariaPressed"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <span v-if="loading" class="loading-spinner" aria-hidden="true"></span>
    <span v-if="icon && !loading" class="button-icon" aria-hidden="true">
      <n-icon :component="icon" :size="iconSize" />
    </span>
    <span class="button-text">
      <slot>{{ text }}</slot>
    </span>
    <span v-if="badge" class="button-badge" :aria-label="`${badge} notifications`">
      {{ badge }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  icon?: Component
  iconSize?: number
  text?: string
  badge?: string | number
  ariaLabel?: string
  ariaDescribedBy?: string
  ariaExpanded?: boolean
  ariaPressed?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  iconSize: 16,
  fullWidth: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  keydown: [event: KeyboardEvent]
}>()

const buttonClasses = computed(() => [
  'accessible-button',
  `accessible-button--${props.variant}`,
  `accessible-button--${props.size}`,
  {
    'accessible-button--disabled': props.disabled,
    'accessible-button--loading': props.loading,
    'accessible-button--full-width': props.fullWidth,
    'accessible-button--icon-only': props.icon && !props.text
  }
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
  
  // Handle space and enter for button activation
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    handleClick(event as any)
  }
}
</script>

<style scoped>
.accessible-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid transparent;
  border-radius: 8px;
  font-family: var(--font-primary);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.accessible-button:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Variants */
.accessible-button--primary {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.accessible-button--primary:hover:not(:disabled) {
  background-color: var(--primary-color-hover);
  border-color: var(--primary-color-hover);
}

.accessible-button--secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-color);
}

.accessible-button--secondary:hover:not(:disabled) {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color-hover);
}

.accessible-button--outline {
  background-color: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.accessible-button--outline:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: white;
}

.accessible-button--ghost {
  background-color: transparent;
  color: var(--text-primary);
  border-color: transparent;
}

.accessible-button--ghost:hover:not(:disabled) {
  background-color: var(--bg-secondary);
}

.accessible-button--danger {
  background-color: var(--error-color);
  color: white;
  border-color: var(--error-color);
}

.accessible-button--danger:hover:not(:disabled) {
  background-color: #dc2626;
  border-color: #dc2626;
}

/* Sizes */
.accessible-button--small {
  padding: 6px 12px;
  font-size: 14px;
  min-height: 32px;
}

.accessible-button--medium {
  padding: 8px 16px;
  font-size: 14px;
  min-height: 40px;
}

.accessible-button--large {
  padding: 12px 24px;
  font-size: 16px;
  min-height: 48px;
}

/* States */
.accessible-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.accessible-button--loading {
  cursor: wait;
}

.accessible-button--full-width {
  width: 100%;
}

.accessible-button--icon-only {
  padding: 8px;
  min-width: auto;
}

/* Icon */
.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Text */
.button-text {
  flex: 1;
  text-align: center;
}

/* Badge */
.button-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background-color: var(--error-color);
  color: white;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

/* Loading Spinner */
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .accessible-button {
    border-width: 3px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .accessible-button {
    transition: none;
  }
  
  .loading-spinner {
    animation: none;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .accessible-button--large {
    padding: 10px 20px;
    font-size: 14px;
    min-height: 44px; /* Minimum touch target size */
  }
  
  .accessible-button--medium {
    min-height: 44px; /* Minimum touch target size */
  }
  
  .accessible-button--small {
    min-height: 44px; /* Minimum touch target size */
  }
}
</style>
