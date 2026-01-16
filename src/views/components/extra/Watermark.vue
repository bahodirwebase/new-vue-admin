<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Watermark</h1>
        <p class="page-subtitle">Overlay watermarks for content protection and branding</p>
      </div>

      <n-card title="Basic Watermarks">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Simple Text Watermark</h3>
            <n-watermark content="CONFIDENTIAL" :cross="true">
              <n-card style="height: 200px; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center;">
                  <h3>Protected Content</h3>
                  <p>This content is protected with a watermark</p>
                </div>
              </n-card>
            </n-watermark>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Single Direction Watermark</h3>
            <n-watermark content="DRAFT" :cross="false">
              <n-card style="height: 200px; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center;">
                  <h3>Draft Document</h3>
                  <p>This is a draft version with single-direction watermark</p>
                </div>
              </n-card>
            </n-watermark>
          </div>
        </n-space>
      </n-card>

      <n-card title="Custom Styling">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Colors</h3>
            <n-space vertical :size="12">
              <n-watermark content="CONFIDENTIAL" font-color="#d03050">
                <n-card style="height: 150px; display: flex; align-items: center; justify-content: center;">
                  <span>Red Watermark</span>
                </n-card>
              </n-watermark>
              <n-watermark content="SAMPLE" font-color="#18a058">
                <n-card style="height: 150px; display: flex; align-items: center; justify-content: center;">
                  <span>Green Watermark</span>
                </n-card>
              </n-watermark>
              <n-watermark content="DEMO" font-color="#2080f0">
                <n-card style="height: 150px; display: flex; align-items: center; justify-content: center;">
                  <span>Blue Watermark</span>
                </n-card>
              </n-watermark>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Font Sizes</h3>
            <n-space vertical :size="12">
              <n-watermark content="SMALL" :font-size="12">
                <n-card style="height: 120px; display: flex; align-items: center; justify-content: center;">
                  <span>Small Font Watermark</span>
                </n-card>
              </n-watermark>
              <n-watermark content="MEDIUM" :font-size="16">
                <n-card style="height: 120px; display: flex; align-items: center; justify-content: center;">
                  <span>Medium Font Watermark</span>
                </n-card>
              </n-watermark>
              <n-watermark content="LARGE" :font-size="24">
                <n-card style="height: 120px; display: flex; align-items: center; justify-content: center;">
                  <span>Large Font Watermark</span>
                </n-card>
              </n-watermark>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Rotations</h3>
            <n-space vertical :size="12">
              <n-watermark content="HORIZONTAL" :rotate="0">
                <n-card style="height: 120px; display: flex; align-items: center; justify-content: center;">
                  <span>Horizontal Watermark</span>
                </n-card>
              </n-watermark>
              <n-watermark content="DIAGONAL" :rotate="45">
                <n-card style="height: 120px; display: flex; align-items: center; justify-content: center;">
                  <span>45° Diagonal Watermark</span>
                </n-card>
              </n-watermark>
              <n-watermark content="STEEP" :rotate="-45">
                <n-card style="height: 120px; display: flex; align-items: center; justify-content: center;">
                  <span>-45° Diagonal Watermark</span>
                </n-card>
              </n-watermark>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Spacing and Positioning">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Gaps</h3>
            <n-space vertical :size="12">
              <n-watermark content="TIGHT" :x-gap="50" :y-gap="100">
                <n-card style="height: 150px; display: flex; align-items: center; justify-content: center;">
                  <span>Tight Spacing</span>
                </n-card>
              </n-watermark>
              <n-watermark content="NORMAL" :x-gap="100" :y-gap="200">
                <n-card style="height: 150px; display: flex; align-items: center; justify-content: center;">
                  <span>Normal Spacing</span>
                </n-card>
              </n-watermark>
              <n-watermark content="LOOSE" :x-gap="200" :y-gap="300">
                <n-card style="height: 150px; display: flex; align-items: center; justify-content: center;">
                  <span>Loose Spacing</span>
                </n-card>
              </n-watermark>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Custom Offset</h3>
            <n-watermark content="OFFSET" :offset="[50, 50]">
              <n-card style="height: 150px; display: flex; align-items: center; justify-content: center;">
                <span>Watermark with Custom Offset</span>
              </n-card>
            </n-watermark>
          </div>
        </n-space>
      </n-card>

      <n-card title="Real-world Examples">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Confidential Document</h3>
            <n-watermark content="CONFIDENTIAL" font-color="#d03050" :font-size="20" :rotate="-22">
              <n-card>
                <template #header>
                  <h3>Financial Report Q4 2024</h3>
                </template>
                <div style="height: 300px; padding: 16px;">
                  <h4>Executive Summary</h4>
                  <p>This document contains confidential financial information and is intended for internal use only.</p>
                  <br>
                  <h4>Key Metrics</h4>
                  <ul>
                    <li>Revenue: $2.5M (+15% YoY)</li>
                    <li>Profit Margin: 18.5%</li>
                    <li>Customer Growth: 23%</li>
                  </ul>
                  <br>
                  <p><strong>Notice:</strong> This document is confidential and proprietary. Do not distribute without authorization.</p>
                </div>
              </n-card>
            </n-watermark>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Draft Proposal</h3>
            <n-watermark content="DRAFT" font-color="#f0a020" :font-size="32" :rotate="-15" :cross="false">
              <n-card>
                <template #header>
                  <h4>Project Proposal: Website Redesign</h4>
                </template>
                <div style="height: 250px; padding: 16px;">
                  <h5>Project Overview</h5>
                  <p>This proposal outlines the comprehensive redesign of our company website to improve user experience and modernize the interface.</p>
                  <br>
                  <h5>Scope of Work</h5>
                  <ul>
                    <li>UI/UX Design refresh</li>
                    <li>Mobile responsiveness improvements</li>
                    <li>Performance optimization</li>
                    <li>Content management system integration</li>
                  </ul>
                  <br>
                  <p><em>This is a draft version subject to changes and review.</em></p>
                </div>
              </n-card>
            </n-watermark>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Brand Watermark</h3>
            <n-watermark content="MyCompany™" font-color="#2080f0" :font-size="14" font-family="Arial, sans-serif">
              <n-card>
                <template #header>
                  <h4>Marketing Materials</h4>
                </template>
                <div style="height: 200px; padding: 16px;">
                  <h5>Product Brochure Content</h5>
                  <p>This content represents our official marketing materials and is protected under our brand guidelines.</p>
                  <br>
                  <p>All materials are copyrighted © 2024 MyCompany. All rights reserved.</p>
                </div>
              </n-card>
            </n-watermark>
          </div>
        </n-space>
      </n-card>

      <n-card title="Advanced Usage">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Multiple Watermarks</h3>
            <n-watermark content="COPYRIGHTED" font-color="#909399" :font-size="12">
              <n-watermark content="DO NOT SHARE" font-color="#f0a020" :font-size="16" :rotate="-45">
                <n-card style="height: 200px; display: flex; align-items: center; justify-content: center;">
                  <div style="text-align: center;">
                    <h4>Protected Content</h4>
                    <p>This content has multiple watermark layers</p>
                  </div>
                </n-card>
              </n-watermark>
            </n-watermark>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Subtle Watermark</h3>
            <n-watermark 
              content="INTERNAL USE" 
              font-color="rgba(0, 0, 0, 0.05)" 
              :font-size="10"
              :x-gap="150"
              :y-gap="250"
            >
              <n-card style="height: 180px; display: flex; align-items: center; justify-content: center;">
                <div style="text-align: center;">
                  <h4>Internal Document</h4>
                  <p>Very subtle watermark for internal documents</p>
                </div>
              </n-card>
            </n-watermark>
          </div>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NWatermark, NSpace, NCard } from 'naive-ui'
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
