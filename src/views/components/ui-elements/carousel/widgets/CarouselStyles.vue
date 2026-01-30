<template>
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
</template>

<style scoped>
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
</style>
