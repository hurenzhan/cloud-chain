import { getToken } from '@/libs/utils'
import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const Login: Component = () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, { fullPath }, next) => {
      const token = getToken()
      if (token) {
        return next(fullPath)
      }
      next()
    }
  },
]

export default routes
