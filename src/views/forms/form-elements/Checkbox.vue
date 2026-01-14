<template>
  <div class="checkbox-demo">
    <n-space vertical :size="24">
      <n-card title="Basic Checkbox">
        <n-space vertical :size="16">
          <n-checkbox v-model:value="basicValue">
            Basic checkbox
          </n-checkbox>
          <n-p>Checkbox state: {{ basicValue ? 'Checked' : 'Unchecked' }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Checkbox Group">
        <n-space vertical :size="16">
          <n-checkbox-group v-model:value="groupValue">
            <n-space vertical :size="8">
              <n-checkbox value="vue">Vue.js</n-checkbox>
              <n-checkbox value="react">React</n-checkbox>
              <n-checkbox value="angular">Angular</n-checkbox>
              <n-checkbox value="svelte">Svelte</n-checkbox>
            </n-space>
          </n-checkbox-group>
          <n-p>Selected: {{ JSON.stringify(groupValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Checkbox Sizes">
        <n-space vertical :size="16">
          <n-space align="center" :size="12">
            <span>Small:</span>
            <n-checkbox v-model:value="smallValue" size="small">Small</n-checkbox>
          </n-space>
          <n-space align="center" :size="12">
            <span>Medium:</span>
            <n-checkbox v-model:value="mediumValue" size="medium">Medium</n-checkbox>
          </n-space>
          <n-space align="center" :size="12">
            <span>Large:</span>
            <n-checkbox v-model:value="largeValue" size="large">Large</n-checkbox>
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Checkbox States">
        <n-space vertical :size="16">
          <n-space align="center" :size="12">
            <span>Normal:</span>
            <n-checkbox v-model:value="normalValue">Normal</n-checkbox>
          </n-space>
          <n-space align="center" :size="12">
            <span>Disabled:</span>
            <n-checkbox v-model:value="disabledValue" disabled>Disabled</n-checkbox>
          </n-space>
          <n-space align="center" :size="12">
            <span>Indeterminate:</span>
            <n-checkbox v-model:value="indeterminateValue" :indeterminate="true">
              Indeterminate
            </n-checkbox>
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Custom Colors">
        <n-space vertical :size="16">
          <n-space vertical :size="8">
            <n-checkbox v-model:value="primaryValue" color="#6366f1">
              Primary color
            </n-checkbox>
            <n-checkbox v-model:value="successValue" color="#18a058">
              Success color
            </n-checkbox>
            <n-checkbox v-model:value="warningValue" color="#f0a020">
              Warning color
            </n-checkbox>
            <n-checkbox v-model:value="errorValue" color="#d03050">
              Error color
            </n-checkbox>
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Checkbox with Events">
        <n-space vertical :size="16">
          <n-checkbox
            v-model:value="eventValue"
            @update:value="handleCheckboxChange"
          >
            Click me to see events
          </n-checkbox>
          <n-p>Last change: {{ lastChange || 'No changes yet' }}</n-p>
          <n-p>Change count: {{ changeCount }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Real World Example - Todo List">
        <n-space vertical :size="16">
          <div class="todo-list">
            <n-space vertical :size="8">
              <n-checkbox
                v-for="todo in todos"
                :key="todo.id"
                v-model:value="todo.completed"
                @update:value="updateTodo(todo)"
              >
                <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
                  {{ todo.text }}
                </span>
              </n-checkbox>
            </n-space>
            <n-space :size="8">
              <n-input
                v-model:value="newTodo"
                placeholder="Add new todo..."
                @keyup.enter="addTodo"
              />
              <n-button @click="addTodo">Add</n-button>
            </n-space>
          </div>
          <n-p>Completed: {{ completedCount }} / {{ todos.length }}</n-p>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Basic Checkbox
const basicValue = ref(false)

// Checkbox Group
const groupValue = ref(['vue', 'react'])

// Checkbox Sizes
const smallValue = ref(false)
const mediumValue = ref(false)
const largeValue = ref(false)

// Checkbox States
const normalValue = ref(false)
const disabledValue = ref(true)
const indeterminateValue = ref(false)

// Custom Colors
const primaryValue = ref(false)
const successValue = ref(false)
const warningValue = ref(false)
const errorValue = ref(false)

// Checkbox with Events
const eventValue = ref(false)
const lastChange = ref('')
const changeCount = ref(0)

const handleCheckboxChange = (value: boolean) => {
  lastChange.value = `Checkbox ${value ? 'checked' : 'unchecked'} at ${new Date().toLocaleTimeString()}`
  changeCount.value++
}

// Real World Example - Todo List
const newTodo = ref('')
const todos = ref([
  { id: 1, text: 'Learn Vue.js', completed: true },
  { id: 2, text: 'Build a project', completed: false },
  { id: 3, text: 'Deploy to production', completed: false }
])

const completedCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length
})

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value,
      completed: false
    })
    newTodo.value = ''
  }
}

const updateTodo = (todo: any) => {
  // Todo is updated automatically via v-model
  console.log('Todo updated:', todo)
}
</script>

<style scoped>
.checkbox-demo {
  padding: 0;
}

.n-card {
  margin-bottom: 16px;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.todo-list {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}
</style>
