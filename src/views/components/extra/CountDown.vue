<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Countdown</h1>
        <p class="page-subtitle">Versatile countdown timers with custom formatting and precision control</p>
      </div>

      <n-card title="Basic Countdowns">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Simple Countdown</h3>
            <n-space vertical :size="12">
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">60 seconds:</span>
                <n-countdown :duration="60 * 1000" :active="active" />
              </div>
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">5 minutes:</span>
                <n-countdown :duration="5 * 60 * 1000" :active="active" />
              </div>
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">1 hour:</span>
                <n-countdown :duration="60 * 60 * 1000" :active="active" />
              </div>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">With Controls</h3>
            <n-space vertical :size="12">
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">Controlled countdown:</span>
                <n-countdown :duration="30 * 1000" :active="active" />
              </div>
              <n-space>
                <n-button @click="active = !active" :type="active ? 'warning' : 'primary'">
                  {{ active ? 'Pause' : 'Start' }}
                </n-button>
                <n-button @click="restartCountdown" type="info">Restart</n-button>
              </n-space>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Precision Control">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Precision Levels</h3>
            <n-space vertical :size="12">
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">Seconds (precision: 0):</span>
                <n-countdown :duration="60 * 1000" :precision="0" :active="active" />
              </div>
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">Tenths (precision: 1):</span>
                <n-countdown :duration="60 * 1000" :precision="1" :active="active" />
              </div>
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">Hundredths (precision: 2):</span>
                <n-countdown :duration="60 * 1000" :precision="2" :active="active" />
              </div>
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">Milliseconds (precision: 3):</span>
                <n-countdown :duration="60 * 1000" :precision="3" :active="active" />
              </div>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Custom Formatting">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Custom Render Functions</h3>
            <n-space vertical :size="12">
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">Hours:Minutes:Seconds:</span>
                <n-countdown 
                  :duration="2 * 60 * 60 * 1000" 
                  :active="active"
                  :render="renderTime"
                />
              </div>
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">With Labels:</span>
                <n-countdown 
                  :duration="60 * 60 * 1000" 
                  :active="active"
                  :render="renderWithLabels"
                />
              </div>
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">Compact Format:</span>
                <n-countdown 
                  :duration="30 * 60 * 1000" 
                  :active="active"
                  :render="renderCompact"
                />
              </div>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Styled Countdowns</h3>
            <n-space vertical :size="12">
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">Card Style:</span>
                <n-countdown 
                  :duration="60 * 60 * 1000" 
                  :active="active"
                  :render="renderCardStyle"
                />
              </div>
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">Progress Style:</span>
                <n-countdown 
                  :duration="60 * 60 * 1000" 
                  :active="active"
                  :render="renderProgressStyle"
                />
              </div>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Events and Callbacks">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">On Finish Callback</h3>
            <n-space vertical :size="12">
              <div>
                <span style="color: var(--text-secondary); margin-right: 12px;">5 second countdown:</span>
                <n-countdown 
                  :duration="5 * 1000" 
                  :active="eventActive"
                  @finish="handleFinish"
                />
              </div>
              <div v-if="finished" style="color: #18a058; font-weight: 600;">
                ✅ Countdown completed!
              </div>
              <n-space>
                <n-button @click="eventActive = !eventActive" :type="eventActive ? 'warning' : 'primary'">
                  {{ eventActive ? 'Pause' : 'Start' }}
                </n-button>
                <n-button @click="resetEventCountdown" type="info">Reset</n-button>
              </n-space>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Real-world Examples">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Flash Sale Timer</h3>
            <n-card style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
              <div style="text-align: center; padding: 20px;">
                <h3 style="color: white; margin-bottom: 16px;">⚡ Flash Sale Ends In:</h3>
                <n-countdown 
                  :duration="2 * 60 * 60 * 1000" 
                  :active="active"
                  :render="renderFlashSale"
                />
                <div style="margin-top: 16px;">
                  <n-button type="primary" size="large">Shop Now</n-button>
                </div>
              </div>
            </n-card>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Exam Timer</h3>
            <n-card>
              <template #header>
                <n-space align="center" :size="12">
                  <n-icon size="20" color="#f0a020">
                    <Time />
                  </n-icon>
                  <span>Exam in Progress</span>
                </n-space>
              </template>
              <n-space vertical :size="16">
                <div>
                  <span style="color: var(--text-secondary); margin-right: 12px;">Time Remaining:</span>
                  <n-countdown 
                    :duration="90 * 60 * 1000" 
                    :active="active"
                    :render="renderExamTimer"
                  />
                </div>
                <n-space>
                  <n-button secondary>Submit Early</n-button>
                  <n-button type="primary">Submit Exam</n-button>
                </n-space>
              </n-space>
            </n-card>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Password Reset Timer</h3>
            <n-card>
              <div style="text-align: center; padding: 20px;">
                <h4>Reset Code Sent</h4>
                <p style="color: var(--text-secondary); margin-bottom: 16px;">
                  A verification code has been sent to your email. The code will expire in:
                </p>
                <n-countdown 
                  :duration="5 * 60 * 1000" 
                  :active="active"
                  :render="renderResetTimer"
                />
                <div style="margin-top: 16px;">
                  <n-button secondary>Resend Code</n-button>
                </div>
              </div>
            </n-card>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Auction Timer</h3>
            <n-card>
              <template #header>
                <n-space align="center" :size="12">
                  <n-icon size="20" color="#18a058">
                    <CheckmarkCircle />
                  </n-icon>
                  <span>Live Auction</span>
                </n-space>
              </template>
              <n-space vertical :size="16">
                <div>
                  <h4>Vintage Watch - Rolex Submariner</h4>
                  <p style="color: var(--text-secondary);">Current Bid: $12,500</p>
                </div>
                <div>
                  <span style="color: var(--text-secondary); margin-right: 12px;">Auction ends in:</span>
                  <n-countdown 
                    :duration="30 * 60 * 1000" 
                    :active="active"
                    :render="renderAuctionTimer"
                  />
                </div>
                <n-space>
                  <n-button type="primary" size="large">Place Bid</n-button>
                </n-space>
              </n-space>
            </n-card>
          </div>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NCountdown, NSpace, NCard, NButton, NIcon } from 'naive-ui'
import { Time, CheckmarkCircle } from '@vicons/ionicons5'
import { h, ref } from 'vue'

const active = ref(true)
const eventActive = ref(true)
const finished = ref(false)

const restartCountdown = () => {
  active.value = false
  setTimeout(() => {
    active.value = true
  }, 100)
}

const resetEventCountdown = () => {
  finished.value = false
  eventActive.value = false
  setTimeout(() => {
    eventActive.value = true
  }, 100)
}

const handleFinish = () => {
  finished.value = true
}

const renderTime = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const renderWithLabels = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  return h('div', { style: 'display: flex; gap: 8px;' }, [
    h('div', { style: 'text-align: center;' }, [
      h('div', { style: 'font-size: 24px; font-weight: 600;' }, String(hours).padStart(2, '0')),
      h('div', { style: 'font-size: 12px; color: var(--text-secondary);' }, 'Hours')
    ]),
    h('div', { style: 'font-size: 24px; font-weight: 600; margin: 0 4px;' }, ':'),
    h('div', { style: 'text-align: center;' }, [
      h('div', { style: 'font-size: 24px; font-weight: 600;' }, String(minutes).padStart(2, '0')),
      h('div', { style: 'font-size: 12px; color: var(--text-secondary);' }, 'Minutes')
    ]),
    h('div', { style: 'font-size: 24px; font-weight: 600; margin: 0 4px;' }, ':'),
    h('div', { style: 'text-align: center;' }, [
      h('div', { style: 'font-size: 24px; font-weight: 600;' }, String(seconds).padStart(2, '0')),
      h('div', { style: 'font-size: 12px; color: var(--text-secondary);' }, 'Seconds')
    ])
  ])
}

const renderCompact = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}

const renderCardStyle = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  return h('div', { style: 'display: flex; gap: 8px;' }, [
    h('n-card', { size: 'small', style: 'min-width: 60px; text-align: center;' }, [
      h('div', { style: 'font-size: 20px; font-weight: 600;' }, String(hours).padStart(2, '0')),
      h('div', { style: 'font-size: 10px; color: var(--text-secondary);' }, 'HRS')
    ]),
    h('n-card', { size: 'small', style: 'min-width: 60px; text-align: center;' }, [
      h('div', { style: 'font-size: 20px; font-weight: 600;' }, String(minutes).padStart(2, '0')),
      h('div', { style: 'font-size: 10px; color: var(--text-secondary);' }, 'MIN')
    ]),
    h('n-card', { size: 'small', style: 'min-width: 60px; text-align: center;' }, [
      h('div', { style: 'font-size: 20px; font-weight: 600;' }, String(seconds).padStart(2, '0')),
      h('div', { style: 'font-size: 10px; color: var(--text-secondary);' }, 'SEC')
    ])
  ])
}

const renderProgressStyle = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  const total = hours * 3600 + minutes * 60 + seconds
  const progress = ((3600 - total) / 3600) * 100
  
  return h('div', { style: 'display: flex; align-items: center; gap: 12px;' }, [
    h('n-progress', { 
      percentage: progress, 
      style: 'width: 200px;',
      color: '#18a058'
    }),
    h('span', { style: 'font-weight: 600;' }, renderTime({ hours, minutes, seconds }))
  ])
}

const renderFlashSale = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  return h('div', { style: 'display: flex; gap: 12px; justify-content: center;' }, [
    h('div', { style: 'background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 4px; min-width: 60px; text-align: center;' }, [
      h('div', { style: 'font-size: 24px; font-weight: 700; color: white;' }, String(hours).padStart(2, '0')),
      h('div', { style: 'font-size: 10px; color: rgba(255,255,255,0.8);' }, 'HOURS')
    ]),
    h('div', { style: 'background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 4px; min-width: 60px; text-align: center;' }, [
      h('div', { style: 'font-size: 24px; font-weight: 700; color: white;' }, String(minutes).padStart(2, '0')),
      h('div', { style: 'font-size: 10px; color: rgba(255,255,255,0.8);' }, 'MINS')
    ]),
    h('div', { style: 'background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 4px; min-width: 60px; text-align: center;' }, [
      h('div', { style: 'font-size: 24px; font-weight: 700; color: white;' }, String(seconds).padStart(2, '0')),
      h('div', { style: 'font-size: 10px; color: rgba(255,255,255,0.8);' }, 'SECS')
    ])
  ])
}

const renderExamTimer = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  const total = hours * 3600 + minutes * 60 + seconds
  const isLowTime = total < 600 // Less than 10 minutes
  const color = isLowTime ? '#d03050' : '#18a058'
  
  return h('div', { style: `font-size: 20px; font-weight: 600; color: ${color};` }, renderTime({ hours, minutes, seconds }))
}

const renderResetTimer = ({ minutes, seconds }: { minutes: number; seconds: number }) => {
  return h('div', { style: 'font-size: 18px; font-weight: 600; color: var(--text-primary);' }, 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  )
}

const renderAuctionTimer = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  const total = hours * 3600 + minutes * 60 + seconds
  const isUrgent = total < 300 // Less than 5 minutes
  const color = isUrgent ? '#d03050' : '#f0a020'
  
  return h('div', { style: `font-size: 24px; font-weight: 700; color: ${color};` }, renderTime({ hours, minutes, seconds }))
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
</style>
