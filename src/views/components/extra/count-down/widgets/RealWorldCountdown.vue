<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NButton, NSpace, NIcon } from 'naive-ui'
import { ChevronDownOutline, Time, CheckmarkCircle } from '@vicons/ionicons5'
import { h } from 'vue'

import { COUNTDOWN_PRESETS } from '../constants'

const active = ref(true)
const selectedPreset = ref('2 hours')

const handlePresetSelect = (key: string) => {
  const preset = COUNTDOWN_PRESETS.find(p => p.label === key)
  if (preset) {
    selectedPreset.value = preset.label
  }
}

const getCurrentDuration = () => {
  const preset = COUNTDOWN_PRESETS.find(p => p.label === selectedPreset.value)
  return preset?.value || 2 * 60 * 60 * 1000
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

  return h('div', { style: `font-size: 20px; font-weight: 600; color: ${color};` }, 
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  )
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

  return h('div', { style: `font-size: 24px; font-weight: 700; color: ${color};` }, 
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  )
}
</script>
<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Real-world Examples</h2>
      <n-dropdown :options="COUNTDOWN_PRESETS.map(p => ({ label: p.label, key: p.label }))" @select="handlePresetSelect" trigger="click">
        <n-button class="period-button" type="primary" strong size="small">
          {{ selectedPreset }}
          <template #icon>
            <n-icon :component="ChevronDownOutline" />
          </template>
        </n-button>
      </n-dropdown>
    </div>
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Flash Sale Timer</h3>
        <n-card style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
          <div style="text-align: center; padding: 20px;">
            <h3 style="color: white; margin-bottom: 16px;">⚡ Flash Sale Ends In:</h3>
            <n-countdown :duration="getCurrentDuration()" :active="active" :render="renderFlashSale" />
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
              <n-countdown :duration="getCurrentDuration()" :active="active" :render="renderExamTimer" />
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
            <n-countdown :duration="5 * 60 * 1000" :active="active" :render="renderResetTimer" />
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
              <n-countdown :duration="getCurrentDuration()" :active="active" :render="renderAuctionTimer" />
            </div>
            <n-space>
              <n-button type="primary" size="large">Place Bid</n-button>
            </n-space>
          </n-space>
        </n-card>
      </div>
    </n-space>
  </n-card>
</template>
