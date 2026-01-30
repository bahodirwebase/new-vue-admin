<template>
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
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>
