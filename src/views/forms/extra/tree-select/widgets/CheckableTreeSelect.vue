<template>
  <n-card title="Checkable Tree Select">
    <n-space vertical :size="16">
      <n-tree-select v-model:value="checkableValue" :options="basicOptions" checkable
        placeholder="Checkable selection" />
      <n-p>Selected: {{ JSON.stringify(checkableValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkableValue = ref(['report', 'photo1'])
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
