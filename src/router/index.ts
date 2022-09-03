import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/workspace/Index.vue')
  },
  {
    path: '/display',
    name: 'Display',
    component: () => import('../views/screening/Index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
