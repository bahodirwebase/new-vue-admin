<template>
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
</template>

<style scoped>
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
</style>
