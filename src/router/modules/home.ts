import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import tagSet from './tagSet'
import settings from './settings'

const Home: Component = () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
const Invoices: Component = () => import(/* webpackChunkName: "about" */ '@/views/invoices/Index.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/home',
                name: 'home',
                component: Invoices,
                meta: {
                    keepAlive: true
                },
            },
            ...tagSet,
            ...settings
        ]
    },
]

export default routes
