<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Carousel</h1>
        <p class="page-subtitle">A slideshow component for cycling through elements—images or slides of text</p>
      </div>

      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card title="Basic Carousel">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Auto-play Carousel</h3>
                <n-carousel autoplay show-dots style="height: 300px">
                  <img class="carousel-img" src="https://picsum.photos/800/400?random=1" alt="Slide 1">
                  <img class="carousel-img" src="https://picsum.photos/800/400?random=2" alt="Slide 2">
                  <img class="carousel-img" src="https://picsum.photos/800/400?random=3" alt="Slide 3">
                  <img class="carousel-img" src="https://picsum.photos/800/400?random=4" alt="Slide 4">
                </n-carousel>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Manual Carousel</h3>
                <n-carousel show-dots style="height: 300px">
                  <img class="carousel-img" src="https://picsum.photos/800/400?random=5" alt="Slide 1">
                  <img class="carousel-img" src="https://picsum.photos/800/400?random=6" alt="Slide 2">
                  <img class="carousel-img" src="https://picsum.photos/800/400?random=7" alt="Slide 3">
                </n-carousel>
              </div>
            </n-space>
          </n-card>
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
        </n-gi>
        <n-gi>
          <n-card title="Carousel Styles">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Without Dots</h3>
                <n-carousel :show-dots="false" style="height: 300px">
                  <img class="carousel-img" src="https://picsum.photos/800/400?random=8" alt="Slide 1">
                  <img class="carousel-img" src="https://picsum.photos/800/400?random=9" alt="Slide 2">
                  <img class="carousel-img" src="https://picsum.photos/800/400?random=10" alt="Slide 3">
                </n-carousel>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Custom Content</h3>
                <n-carousel show-dots style="height: 300px">
                  <div class="custom-slide">
                    <h3>Welcome to Our Platform</h3>
                    <p>Discover amazing features and possibilities</p>
                  </div>
                  <div class="custom-slide">
                    <h3>Modern Design</h3>
                    <p>Beautiful and intuitive user interface</p>
                  </div>
                  <div class="custom-slide">
                    <h3>Powerful Features</h3>
                    <p>Everything you need in one place</p>
                  </div>
                </n-carousel>
              </div>
            </n-space>
          </n-card>
          <n-card title="Carousel Directions">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Vertical Carousel</h3>
                <n-carousel direction="vertical" style="height: 300px">
                  <div class="vertical-slide">
                    <h4>First Feature</h4>
                    <p>Advanced analytics and reporting</p>
                  </div>
                  <div class="vertical-slide">
                    <h4>Second Feature</h4>
                    <p>Real-time collaboration tools</p>
                  </div>
                  <div class="vertical-slide">
                    <h4>Third Feature</h4>
                    <p>Customizable workflows</p>
                  </div>
                </n-carousel>
              </div>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

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

<style scoped>
.ui-page {
  max-width: 100%;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.custom-slide {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  padding: 32px;
}

.custom-slide h3 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
}

.custom-slide p {
  font-size: 18px;
  opacity: 0.9;
  text-align: center;
}

.vertical-slide {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 24px;
}

.vertical-slide h4 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.vertical-slide p {
  font-size: 16px;
  color: var(--text-secondary);
  text-align: center;
}

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

.n-card {
  margin-bottom: 12px;
}
</style>
