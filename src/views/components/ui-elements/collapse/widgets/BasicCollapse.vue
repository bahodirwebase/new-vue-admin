<template>
  <n-card title="Basic Collapse">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Default Collapse
        </h3>
        <n-collapse>
          <n-collapse-item title="What is Vue.js?" name="1">
            Vue.js is a progressive JavaScript framework for building
            user interfaces. It's designed to be incrementally adoptable
            and can easily integrate with other libraries.
          </n-collapse-item>
          <n-collapse-item title="How does Naive UI work?" name="2">
            Naive UI is a Vue 3 component library that provides a
            complete set of UI components with excellent TypeScript
            support and modern design principles.
          </n-collapse-item>
          <n-collapse-item title="Why use TypeScript?" name="3">
            TypeScript provides static typing, better IDE support, and
            helps catch errors during development rather than at
            runtime, making applications more maintainable.
          </n-collapse-item>
        </n-collapse>
      </div>
    </n-space>
  </n-card>
</template>
