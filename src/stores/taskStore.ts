import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  createdAt: string
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
  }),
  getters: {
    getTaskById: (state) => (id: string) => state.tasks.find(t => t.id === id),
    filterByStatus: (state) => (status: TaskStatus) => state.tasks.filter(t => t.status === status),
  },
  actions: {
    addTask(title: string, description: string, status: TaskStatus = 'todo') {
      const task: Task = {
        id: uuidv4(),
        title,
        description,
        status,
        createdAt: new Date().toISOString(),
      }
      this.tasks.push(task)
    },
    updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) {
      const task = this.tasks.find(t => t.id === id)
      if (task) Object.assign(task, updates)
    },
    deleteTask(id: string) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    },
  },
})