<script setup lang="ts">
import { NWatermark, NCard, NSpace } from 'naive-ui'
import { WATERMARK_CONTENT, WATERMARK_COLORS, WATERMARK_FONTS, WATERMARK_ROTATIONS } from '../constants'
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Confidential Document</h3>
      <n-watermark 
        :content="WATERMARK_CONTENT.confidential" 
        :font-color="WATERMARK_COLORS[1].value" 
        :font-size="WATERMARK_FONTS[2].value" 
        :rotate="WATERMARK_ROTATIONS[3].value"
      >
        <n-card>
          <template #header>
            <h3>Financial Report Q4 2024</h3>
          </template>
          <div class="document-content" style="height: 300px;">
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

    <div class="example-section">
      <h3>Draft Proposal</h3>
      <n-watermark 
        :content="WATERMARK_CONTENT.draft" 
        :font-color="WATERMARK_COLORS[4].value" 
        :font-size="WATERMARK_FONTS[4].value" 
        :rotate="WATERMARK_ROTATIONS[3].value" 
        :cross="false"
      >
        <n-card>
          <template #header>
            <h4>Project Proposal: Website Redesign</h4>
          </template>
          <div class="document-content" style="height: 250px;">
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

    <div class="example-section">
      <h3>Brand Watermark</h3>
      <n-watermark 
        :content="WATERMARK_CONTENT.brand" 
        :font-color="WATERMARK_COLORS[3].value" 
        :font-size="WATERMARK_FONTS[1].value" 
        font-family="Arial, sans-serif"
      >
        <n-card>
          <template #header>
            <h4>Marketing Materials</h4>
          </template>
          <div class="document-content" style="height: 200px;">
            <h5>Product Brochure Content</h5>
            <p>This content represents our official marketing materials and is protected under our brand guidelines.</p>
            <br>
            <p>All materials are copyrighted © 2024 MyCompany. All rights reserved.</p>
          </div>
        </n-card>
      </n-watermark>
    </div>
  </n-space>
</template>
