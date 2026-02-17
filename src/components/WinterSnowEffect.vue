<script setup lang="ts">
import { useSnowEffect } from '@/composables/useSnowEffect'

interface Props {
  isActive: boolean
}

const props = defineProps<Props>()

// Use snow effect composable
//@ts-ignore
const { snowContainer } = useSnowEffect(() => props.isActive)
</script>

<template>
  <div v-if="isActive" class="winter-snow-container" ref="snowContainer"></div>
</template>

<style scoped>
.winter-snow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -20px;
  color: #fff;
  user-select: none;
  cursor: default;
  animation: snowfall linear forwards;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
}

@keyframes snowfall {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(100vh) translateX(var(--drift, 0));
  }
}
</style>
