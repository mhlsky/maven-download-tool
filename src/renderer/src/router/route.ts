import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    // 将总是把/users/123/posts重定向到/users/123/profile。
    path: '',
    redirect: () => {
      return 'home'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/config',
    name: 'config',
    component: () => import('../views/config/Config.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})
export default router
