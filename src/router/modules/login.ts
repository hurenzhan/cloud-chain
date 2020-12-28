// import { getToken } from '@/libs/utils'
import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const Login: Component = () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue')
const Create: Component = () => import(/* webpackChunkName: "about" */ '@/views/login/Create.vue')
const Reg: Component = () => import(/* webpackChunkName: "about" */ '@/views/login/Reg.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/createEnterprise',
    name: 'createEnterprise',
    component: Create,
  },
  {
    path: '/userReg',
    name: 'userReg',
    component: Reg,
  },
]

export default routes
