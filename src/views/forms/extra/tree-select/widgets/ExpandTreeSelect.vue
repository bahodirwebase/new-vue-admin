<script setup lang="ts">
import { ref } from 'vue'

const expandValue = ref('documents')
const basicOptions = [
  {
    label: 'Documents',
    value: 'documents',
    children: [
      {
        label: 'Work',
        value: 'work',
        children: [
          { label: 'Report.pdf', value: 'report' },
          { label: 'Presentation.pptx', value: 'presentation' }
        ]
      },
      {
        label: 'Personal',
        value: 'personal',
        children: [
          { label: 'Resume.docx', value: 'resume' },
          { label: 'Cover Letter.docx', value: 'cover' }
        ]
      }
    ]
  },
  {
    label: 'Media',
    value: 'media',
    children: [
      {
        label: 'Images',
        value: 'images',
        children: [
          { label: 'Photo1.jpg', value: 'photo1' },
          { label: 'Photo2.jpg', value: 'photo2' }
        ]
      },
      {
        label: 'Videos',
        value: 'videos',
        children: [
          { label: 'Tutorial.mp4', value: 'tutorial' },
          { label: 'Movie.avi', value: 'movie' }
        ]
      }
    ]
  }
]
</script>

<template>
  <n-card title="Tree Select with Expand All">
    <n-space vertical :size="16">
      <n-tree-select v-model:value="expandValue" :options="basicOptions" :default-expand-all="true"
        placeholder="All expanded by default" />
      <n-p>Selected: {{ JSON.stringify(expandValue) }}</n-p>
    </n-space>
  </n-card>
</template>