<template>
  <div class="max-w-3xl w-full mx-auto animate-fade-in px-4 sm:px-6 lg:px-8 py-6">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">Edit Task</h1>
    <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <TaskForm
        v-if="task"
        :initialTitle="task.title"
        :initialDescription="task.description || ''"
        :initialStatus="task.status"
        @submit="onUpdate"
      />
      <p v-else class="text-red-500 text-center">Task not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TaskForm from '../components/TaskForm.vue'
import type { TaskStatus } from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const store = useTaskStore()

const id = route.params.id as string
const task = computed(() => store.getTaskById(id))

function onUpdate({
  title,
  description,
  status,
}: {
  title: string
  description: string
  status: TaskStatus
}) {
  store.updateTask(id, { title, description, status })
  router.push('/')
}
</script>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
