import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Impressum from '@/views/Impressum.vue'
import Table from '@/views/seasons/Table.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Table',
    component: Table
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: Impressum
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
