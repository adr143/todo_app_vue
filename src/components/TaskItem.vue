<template>
  <transition name="fade-item" mode="out-in">
    <div class="bg-white rounded-lg shadow p-4 mb-3 flex flex-col space-y-2">
      <div>
        <h3 class="text-lg font-semibold break-words">
          {{ task.title }}
        </h3>
        <p v-if="task.description" class="text-gray-600 break-words whitespace-pre-line">
          {{ isExpanded ? task.description : truncatedDescription }}
        </p>
        <button
          v-if="task.description && task.description.length > 80"
          @click="isExpanded = !isExpanded"
          class="text-blue-500 text-sm hover:underline focus:outline-none"
        >
          {{ isExpanded ? 'Show less' : 'Show more' }}
        </button>
        <p class="text-xs text-gray-400 mt-1">
          Status: <span class="capitalize">{{ task.status.replace('_', ' ') }}</span> |
          Created: {{ formattedDate }}
        </p>
      </div>
      <div class="flex justify-end space-x-4 text-sm">
        <router-link
          :to="`/task/${task.id}`"
          class="text-blue-600 hover:underline"
        >Edit</router-link>
        <button
          @click="$emit('delete', task.id)"
          class="text-red-600 hover:underline"
        >Delete</button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Task } from '../stores/taskStore'

const props = defineProps<{ task: Task }>()
const isExpanded = ref(false)

const formattedDate = computed(() =>
  new Date(props.task.createdAt).toLocaleString()
)

const truncatedDescription = computed(() => {
  const desc = props.task.description || ''
  return desc.length > 80 ? desc.slice(0, 77) + '...' : desc
})
</script>

<style scoped>
.fade-item-enter-active,
.fade-item-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-item-enter-from,
.fade-item-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
