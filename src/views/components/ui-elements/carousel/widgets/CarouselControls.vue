<script setup lang="ts">
import { ref } from 'vue'
import { ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const carouselRef = ref()

const prevSlide = () => {
  carouselRef.value?.prev()
}

const nextSlide = () => {
  carouselRef.value?.next()
}
</script>

<template>
  <n-card title="Carousel Controls">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Manual Controls</h3>
        <n-carousel ref="carouselRef" :show-dots="false" style="height: 300px">
          <div class="control-slide">
            <h3>Slide 1</h3>
            <p>This is first slide with manual controls</p>
          </div>
          <div class="control-slide">
            <h3>Slide 2</h3>
            <p>Navigate through slides using buttons below</p>
          </div>
          <div class="control-slide">
            <h3>Slide 3</h3>
            <p>You can control every aspect of carousel</p>
          </div>
        </n-carousel>
        <div class="manual-controls">
          <n-space>
            <n-button @click="prevSlide" circle>
              <template #icon>
                <n-icon :component="ChevronBackOutline" />
              </template>
            </n-button>
            <n-button @click="nextSlide" circle>
              <template #icon>
                <n-icon :component="ChevronForwardOutline" />
              </template>
            </n-button>
          </n-space>
        </div>
      </div>
    </n-space>
  </n-card>
</template>

<style scoped>
.control-slide {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 8px;
  padding: 32px;
}

.control-slide h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.control-slide p {
  font-size: 16px;
  opacity: 0.9;
  text-align: center;
}

.manual-controls {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
