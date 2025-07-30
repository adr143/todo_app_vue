<template>
  <div class="max-w-6xl mx-auto animate-fade-in py-6 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-700">Task Manager</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex flex-col">
        <TaskForm @submit="addTask" />
      </div>
      <div class="flex flex-col h-[500px] bg-white rounded-lg shadow p-4 overflow-hidden">
        <div class="flex items-center mb-4 space-x-2">
          <label class="font-semibold">Filter:</label>
          <select
            v-model="filter"
            class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <transition-group
          name="list"
          tag="div"
          class="flex-1 overflow-y-auto pr-2 space-y-2"
        >
          <TaskItem
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @delete="deleteTask"
          />
        </transition-group>

        <p v-if="filteredTasks.length === 0" class="text-gray-500 mt-4 text-center">
          No tasks to show.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TaskForm from '../components/TaskForm.vue'
import TaskItem from '../components/TaskItem.vue'

const store = useTaskStore()
const filter = ref<'all' | 'todo' | 'in_progress' | 'done'>('all')

const filteredTasks = computed(() => {
  return filter.value === 'all'
    ? store.tasks
    : store.filterByStatus(filter.value)
})

function addTask({ title, description, status }: { title: string; description: string; status: any }) {
  store.addTask(title, description, status)
}

function deleteTask(id: string) {
  store.deleteTask(id)
}
</script>

<style scoped>
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>