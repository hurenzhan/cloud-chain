import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import tagSet from './tagSet'
import settings from './settings'
import navigate from './navigate'

const Home: Component = () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'home',
        redirect: '/tags',
        component: Home,
        children: [
            ...navigate,
            ...tagSet,
            ...settings
        ]
    },
]

export default routes
