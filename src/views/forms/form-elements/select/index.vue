<template>
  <div class="select-demo">
    <n-space vertical :size="24">
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <n-card title="Basic Select">
            <n-space vertical :size="16">
              <n-select v-model:value="selectedValue" :options="options" placeholder="Select an option" clearable />
              <n-p>Selected value: {{ selectedValue || 'None' }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Multiple Select">
            <n-space vertical :size="16">
              <n-select v-model:value="multipleValues" :options="options" multiple placeholder="Select multiple options"
                clearable />
              <n-p>Selected values: {{ multipleValues.length > 0 ? multipleValues.join(', ') : 'None' }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Searchable Select">
            <n-space vertical :size="16">
              <n-select v-model:value="searchValue" :options="searchOptions" filterable placeholder="Search and select"
                clearable />
              <n-p>Selected value: {{ searchValue || 'None' }}</n-p>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Disabled Select">
            <n-space vertical :size="16">
              <n-select v-model:value="disabledValue" :options="options" placeholder="This is disabled" disabled />
              <n-select v-model:value="readonlyValue" :options="options" placeholder="This is readonly" readonly />
            </n-space>
          </n-card>

          <n-card title="Select with Tags">
            <n-space vertical :size="16">
              <n-select v-model:value="tagValues" :options="tagOptions" multiple placeholder="Select with tags"
                :tag="true" />
            </n-space>
          </n-card>

          <n-card title="Grouped Select">
            <n-space vertical :size="16">
              <n-select v-model:value="groupedValue" :options="groupedOptions" placeholder="Select from groups" />
              <n-p>Selected value: {{ groupedValue || 'None' }}</n-p>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedValue = ref(null)
const multipleValues = ref([])
const searchValue = ref(null)
const disabledValue = ref('option1')
const readonlyValue = ref('option2')
const tagValues = ref([])
const groupedValue = ref(null)

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' }
]

const searchOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' }
]

const tagOptions = [
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' }
]

const groupedOptions = [
  {
    type: 'group',
    label: 'Fruits',
    key: 'fruits',
    children: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' }
    ]
  },
  {
    type: 'group',
    label: 'Vegetables',
    key: 'vegetables',
    children: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Spinach', value: 'spinach' }
    ]
  }
]
</script>

<style scoped>
.select-demo {
  padding: 0;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}
</style>
