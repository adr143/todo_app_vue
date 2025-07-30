import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import TaskEdit from '../pages/TaskEdit.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/task/:id', component: TaskEdit, props: true },
  ],
})
