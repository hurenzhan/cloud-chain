// import { getToken } from '@/libs/utils'
import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const Login: Component = () => import(/* webpackChunkName: "about" */ '@/views/login/Login.vue')
const Create: Component = () => import(/* webpackChunkName: "about" */ '@/views/login/Create.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    // beforeEnter: (to, { fullPath }, next) => {
    //   const token = getToken()
    //   if (token) {
    //     return next(fullPath)
    //   }
    //   next()
    // }
  },
  {
    path: '/createEnterprise',
    name: 'createEnterprise',
    component: Create,
  },
]

export default routes
