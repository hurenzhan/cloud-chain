import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import tagSetting from './tagSetting'
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
            ...tagSetting,
            ...settings
        ]
    },
]

export default routes
