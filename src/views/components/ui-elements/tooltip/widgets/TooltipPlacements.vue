<template>
  <n-card title="Tooltip Placements">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Top Placements
        </h3>
        <n-space :size="16" align="center">
          <n-tooltip placement="top-start" trigger="hover">
            <template #trigger>
              <n-button>Top Start</n-button>
            </template>
            Tooltip at top start position
          </n-tooltip>

          <n-tooltip placement="top" trigger="hover">
            <template #trigger>
              <n-button>Top</n-button>
            </template>
            Tooltip at top center position
          </n-tooltip>

          <n-tooltip placement="top-end" trigger="hover">
            <template #trigger>
              <n-button>Top End</n-button>
            </template>
            Tooltip at top end position
          </n-tooltip>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Side Placements
        </h3>
        <n-space :size="16" align="center">
          <n-tooltip placement="left" trigger="hover">
            <template #trigger>
              <n-button>Left</n-button>
            </template>
            Tooltip on the left side
          </n-tooltip>

          <n-tooltip placement="right" trigger="hover">
            <template #trigger>
              <n-button>Right</n-button>
            </template>
            Tooltip on the right side
          </n-tooltip>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
