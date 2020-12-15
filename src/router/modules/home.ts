import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const Home: Component = () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
const Login: Component = () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/home',
                name: '/home',
                meta: {
                    title: '社区信息'
                },
                component: Login
            },
            {
                path: '/home2',
                name: '/home2',
                meta: {
                    title: '社区信息'
                },
                component: Home
            }
        ]
    },
]

export default routes
