import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskView from '@/views/TaskView.vue'
import CalendarView from '@/views/CalendarView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: TaskView
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView
  },
 
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
