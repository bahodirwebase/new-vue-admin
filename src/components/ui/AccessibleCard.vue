<template>
  <article
    :class="cardClasses"
    :role="role"
    :tabindex="interactive ? 0 : undefined"
    :aria-label="ariaLabel"
    :aria-describedby="ariaDescribedBy"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <header v-if="title || $slots.header" class="card-header">
      <slot name="header">
        <h3 class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </slot>
    </header>
    
    <div class="card-content">
      <slot></slot>
    </div>
    
    <footer v-if="$slots.actions" class="card-actions">
      <slot name="actions"></slot>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  variant?: 'default' | 'outlined' | 'elevated' | 'flat'
  size?: 'small' | 'medium' | 'large'
  interactive?: boolean
  role?: string
  ariaLabel?: string
  ariaDescribedBy?: string
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'medium',
  interactive: false,
  hoverable: true
})

const emit = defineEmits<{
  click: [event: MouseEvent | KeyboardEvent]
}>()

const cardClasses = computed(() => [
  'accessible-card',
  `accessible-card--${props.variant}`,
  `accessible-card--${props.size}`,
  {
    'accessible-card--interactive': props.interactive,
    'accessible-card--hoverable': props.hoverable
  }
])

const handleClick = (event: MouseEvent) => {
  if (props.interactive) {
    emit('click', event)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.interactive && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    emit('click', event)
  }
}
</script>

<style scoped>
.accessible-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.accessible-card:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Variants */
.accessible-card--default {
  border: 1px solid var(--border-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.accessible-card--outlined {
  border: 2px solid var(--border-color);
  box-shadow: none;
}

.accessible-card--elevated {
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.accessible-card--flat {
  border: none;
  box-shadow: none;
  background: var(--bg-secondary);
}

/* Sizes */
.accessible-card--small {
  padding: 16px;
}

.accessible-card--medium {
  padding: 20px;
}

.accessible-card--large {
  padding: 24px;
}

/* Interactive States */
.accessible-card--interactive {
  cursor: pointer;
}

.accessible-card--interactive.accessible-card--hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.accessible-card--interactive:active {
  transform: translateY(0);
}

/* Header */
.card-header {
  margin-bottom: 16px;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
}

.card-subtitle {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Content */
.card-content {
  flex: 1;
  color: var(--text-primary);
  line-height: 1.6;
}

/* Actions */
.card-actions {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .accessible-card {
    border-width: 2px;
  }
  
  .accessible-card--flat {
    border: 2px solid var(--border-color);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .accessible-card {
    transition: none;
  }
  
  .accessible-card--interactive.accessible-card--hoverable:hover {
    transform: none;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .accessible-card--small {
    padding: 12px;
  }
  
  .accessible-card--medium {
    padding: 16px;
  }
  
  .accessible-card--large {
    padding: 20px;
  }
  
  .card-title {
    font-size: 1.125rem;
  }
  
  .card-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .card-actions :deep(button) {
    width: 100%;
  }
}
</style>
