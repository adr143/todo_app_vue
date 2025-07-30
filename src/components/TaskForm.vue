<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 mb-6 animate-fade-in bg-white p-6 rounded-lg shadow-md">
    <input
      v-model="title"
      type="text"
      placeholder="Task Title"
      class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
      required
    />
    <textarea
      v-model="description"
      placeholder="Task Description (optional)"
      class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
    />
    <select v-model="status" class="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500">
      <option value="todo">To Do</option>
      <option value="in_progress">In Progress</option>
      <option value="done">Done</option>
    </select>
    <button
      type="submit"
      class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
    >
      {{ isEditing ? 'Update Task' : 'Add Task' }}
    </button>
  </form>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TaskStatus } from '../stores/taskStore'

const props = defineProps<{
  initialTitle?: string
  initialDescription?: string
  initialStatus?: TaskStatus
}>()
const emit = defineEmits<{
  (e: 'submit', data: { title: string; description: string; status: TaskStatus }): void
}>()

const title = ref(props.initialTitle ?? '')
const description = ref(props.initialDescription ?? '')
const status = ref<TaskStatus>(props.initialStatus ?? 'todo')

const isEditing = computed(() => !!props.initialTitle)

function handleSubmit() {
  if (!title.value.trim()) return
  emit('submit', {
    title: title.value.trim(),
    description: description.value.trim(),
    status: status.value,
  })
  if (!isEditing.value) {
    title.value = ''
    description.value = ''
    status.value = 'todo'
  }
}
</script>

<style scoped>
@import "tailwindcss";
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}
</style>
