import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Impressum from '@/views/Impressum.vue'
import SeasonsTable from '@/views/seasons/SeasonsTable.vue'
import PlayersTable from '@/views/players/PlayersTable.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'SeasonsTable',
    component: SeasonsTable
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: Impressum
  },
  {
    path: '/players',
    name: 'PlayersTable',
    component: PlayersTable
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
