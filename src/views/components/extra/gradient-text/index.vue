<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Gradient Text</h1>
        <p class="page-subtitle">Beautiful gradient text effects with customizable colors and animations</p>
      </div>

      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card title="Basic Gradients">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Predefined Gradients</h3>
                <n-space vertical :size="12">
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #18a058 0%, #36ad6a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Success Gradient Text
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #2080f0 0%, #4098fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Info Gradient Text
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #f0a020 0%, #f5c042 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Warning Gradient Text
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #d03050 0%, #de576d 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Error Gradient Text
                  </div>
                </n-space>
              </div>
            </n-space>
          </n-card>

          <n-card title="Color Variations">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Two Color Gradients</h3>
                <n-space vertical :size="12">
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Purple to Violet
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Pink to Red
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Blue to Cyan
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Green to Mint
                  </div>
                </n-space>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Multi-color Gradients</h3>
                <n-space vertical :size="12">
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Rainbow Spectrum
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #fa709a 0%, #fee140 50%, #30cfd0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Sunset Colors
                  </div>
                </n-space>
              </div>
            </n-space>
          </n-card>

          <n-card title="Gradient Angles">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Directions</h3>
                <n-space vertical :size="12">
                  <div class="gradient-text"
                    style="background: linear-gradient(0deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Top to Bottom (0deg)
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Diagonal (45deg)
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Left to Right (90deg)
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Diagonal (135deg)
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(180deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Bottom to Top (180deg)
                  </div>
                </n-space>
              </div>
            </n-space>
          </n-card>


        </n-gi>
        <n-gi>
          <n-card title="Text Styling">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Font Sizes</h3>
                <n-space vertical :size="12">
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 12px;">
                    Small gradient text
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 16px;">
                    Regular gradient text
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 24px; font-weight: 600;">
                    Large gradient text
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 32px; font-weight: 700;">
                    Extra Large gradient text
                  </div>
                </n-space>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Font Weights</h3>
                <n-space vertical :size="12">
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 300;">
                    Light weight
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 400;">
                    Regular weight
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600;">
                    Semi-bold weight
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 700;">
                    Bold weight
                  </div>
                </n-space>
              </div>
            </n-space>
          </n-card>

          <n-card title="Animated Gradients">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Color Animation</h3>
                <n-space vertical :size="12">
                  <div class="gradient-text animated-gradient"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Animated gradient text
                  </div>
                  <div class="gradient-text animated-gradient"
                    style="background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 24px; font-weight: 600;">
                    Large animated gradient
                  </div>
                </n-space>
              </div>
            </n-space>
          </n-card>

          <n-card title="Usage Examples">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Headings and Titles</h3>
                <n-space vertical :size="12">
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 28px; font-weight: 700;">
                    Main Heading Title
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 20px; font-weight: 600;">
                    Subheading Text
                  </div>
                </n-space>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Call to Actions</h3>
                <n-space vertical :size="12">
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #18a058 0%, #36ad6a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 18px; font-weight: 600;">
                    Get Started Now
                  </div>
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #f0a020 0%, #f5c042 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Limited Time Offer
                  </div>
                </n-space>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">In Cards</h3>
                <n-card size="small" style="max-width: 400px">
                  <div class="gradient-text"
                    style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 18px; font-weight: 600; margin-bottom: 8px;">
                    Premium Feature
                  </div>
                  <p style="color: var(--text-secondary); margin: 0;">
                    This card demonstrates how gradient text can be used as a title or highlight within card components.
                  </p>
                </n-card>
              </div>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NSpace, NCard } from 'naive-ui'
</script>

<style scoped>

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

.gradient-text {
  display: inline-block;
  cursor: default;
}

.animated-gradient {
  animation: gradient-shift 3s ease infinite;
}


@keyframes gradient-shift {

  0%,
  100% {
    filter: hue-rotate(0deg);
  }

  50% {
    filter: hue-rotate(30deg);
  }
}
</style>
