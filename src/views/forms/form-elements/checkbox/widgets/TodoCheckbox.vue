<script setup lang="ts">
import { ref, computed } from 'vue'

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

<template>
  <n-card title="Real World Example - Todo List">
    <n-space vertical :size="16">
      <div class="todo-list">
        <n-space vertical :size="8">
          <n-checkbox v-for="todo in todos" :key="todo.id" v-model:value="todo.completed"
            @update:value="updateTodo(todo)">
            <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
              {{ todo.text }}
            </span>
          </n-checkbox>
        </n-space>
        <n-space :size="8">
          <n-input v-model:value="newTodo" placeholder="Add new todo..." @keyup.enter="addTodo" />
          <n-button @click="addTodo">Add</n-button>
        </n-space>
      </div>
      <n-p>Completed: {{ completedCount }} / {{ todos.length }}</n-p>
    </n-space>
  </n-card>
</template>

<style scoped>
.todo-list {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}
</style>
