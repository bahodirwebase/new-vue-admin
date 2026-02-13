<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted, nextTick, watch, h } from 'vue'

interface Props {
  /**
   * Unique key for the item
   */
  key?: string | number
  
  /**
   * Title of the collapse item
   */
  title?: string
  
  /**
   * Disable the item
   * @default false
   */
  disabled?: boolean
  
  /**
   * Show arrow icon
   * @default true
   */
  showArrow?: boolean
  
  /**
   * Custom extra content in header
   */
  extra?: any
  
  /**
   * Force expanded state
   * @default undefined
   */
  expanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showArrow: true
})

const emit = defineEmits([
  'click',
  'expand',
  'collapse'
])

// Inject collapse context
const collapseContext: any = inject('collapseContext', {
  activeKeys: ref(new Set()),
  accordion: false,
  expandIconPosition: 'right',
  expandIcon: null,
  registerItem: () => {},
  unregisterItem: () => {},
  toggleItem: () => {}
})

const itemKey = computed(() => String(props.key || Math.random().toString(36).substr(2, 9)))
const isActive = computed(() => collapseContext.activeKeys.value.has(itemKey.value))
const contentHeight = ref(0)
const contentRef = ref<HTMLElement>()

const classes = computed(() => [
  'custom-collapse-item',
  {
    'is-active': isActive.value,
    'is-disabled': props.disabled,
    'has-extra': !!props.extra
  }
])

const headerClasses = computed(() => [
  'collapse-header',
  {
    'is-disabled': props.disabled
  }
])

const contentClasses = computed(() => [
  'collapse-content',
  {
    'is-active': isActive.value
  }
])

const arrowClasses = computed(() => [
  'collapse-arrow',
  `arrow-position-${collapseContext.expandIconPosition}`,
  {
    'is-expanded': isActive.value
  }
])

// Default expand icon
const defaultExpandIcon = computed(() => 
  h('svg', { 
    xmlns: 'http://www.w3.org/2000/svg', 
    viewBox: '0 0 24 24', 
    width: '16', 
    height: '16' 
  }, [
    h('path', { 
      fill: 'currentColor', 
      d: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z' 
    })
  ])
)

const expandIcon = computed(() => collapseContext.expandIcon || defaultExpandIcon.value)

const updateContentHeight = async () => {
  if (!contentRef.value) return
  
  await nextTick()
  if (isActive.value) {
    contentHeight.value = contentRef.value.scrollHeight
  } else {
    contentHeight.value = 0
  }
}

const handleClick = () => {
  if (props.disabled) return
  
  emit('click')
  collapseContext.toggleItem(itemKey.value)
  
  if (isActive.value) {
    emit('expand')
  } else {
    emit('collapse')
  }
}

// Register/unregister with parent
onMounted(() => {
  collapseContext.registerItem(itemKey.value, props.title || '', props.disabled)
  updateContentHeight()
})

onUnmounted(() => {
  collapseContext.unregisterItem(itemKey.value)
})

// Watch for active state changes
watch(() => isActive.value, updateContentHeight, { immediate: true })

// Watch for content changes
watch(() => props.expanded, (newVal) => {
  if (newVal !== undefined && newVal !== isActive.value) {
    collapseContext.toggleItem(itemKey.value)
  }
})
</script>

<template>
  <div :class="classes">
    <div :class="headerClasses" @click="handleClick">
      <div class="header-content">
        <!-- Left arrow position -->
        <div v-if="showArrow && collapseContext.expandIconPosition === 'left'" :class="arrowClasses">
          <component :is="expandIcon" />
        </div>
        
        <!-- Title slot or prop -->
        <div class="header-title">
          <slot name="title">{{ title }}</slot>
        </div>
        
        <!-- Extra content -->
        <div v-if="extra || $slots.extra" class="header-extra">
          <slot name="extra">{{ extra }}</slot>
        </div>
        
        <!-- Right arrow position -->
        <div v-if="showArrow && collapseContext.expandIconPosition === 'right'" :class="arrowClasses">
          <component :is="expandIcon" />
        </div>
      </div>
    </div>
    
    <!-- Collapsible content -->
    <div :class="contentClasses" :style="{ height: `${contentHeight}px` }">
      <div ref="contentRef" class="content-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-collapse-item {
  border-bottom: 1px solid var(--border-color);
}

.custom-collapse-item:last-child {
  border-bottom: none;
}

.custom-collapse-item.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}

.collapse-header {
  position: relative;
  padding: 12px 16px;
  background-color: var(--card-color);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

.collapse-header:hover:not(.is-disabled) {
  background-color: var(--hover-color);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header-title {
  flex: 1;
  font-weight: 500;
  color: var(--text-primary);
}

.header-extra {
  margin-left: 12px;
  color: var(--text-secondary);
  font-size: 0.9em;
}

.collapse-arrow {
  display: flex;
  align-items: center;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--text-secondary);
}

.arrow-position-left {
  margin-right: 12px;
}

.arrow-position-right {
  margin-left: 12px;
}

.collapse-arrow.is-expanded {
  transform: rotate(90deg);
}

.collapse-content {
  overflow: hidden;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 0;
}

.collapse-content.is-active {
  border-top: 1px solid var(--border-color);
}

.content-inner {
  padding: 16px;
  color: var(--text-primary);
  line-height: 1.6;
}

/* Size variations */
.custom-collapse.size-small .collapse-header {
  padding: 8px 12px;
}

.custom-collapse.size-small .content-inner {
  padding: 12px;
}

.custom-collapse.size-large .collapse-header {
  padding: 16px 20px;
}

.custom-collapse.size-large .content-inner {
  padding: 20px;
}

/* Ghost mode styles */
.custom-collapse.is-ghost .collapse-header {
  background-color: transparent;
}

.custom-collapse.is-ghost .collapse-content.is-active {
  border-top-color: var(--border-color);
}
</style>
