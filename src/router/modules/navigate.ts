import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const Navigate: Component = () => import(/* webpackChunkName: "about" */ '@/views/navigate/Index.vue')
const Tags: Component = () => import(/* webpackChunkName: "about" */ '@/views/tags/Index.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/navigate',
        name: 'navigate',
        redirect: '/tags',
        component: Navigate,
        children: [
            {
                path: '/tags',
                name: 'tags',
                component: Tags,
                meta: {
                    keepAlive: true
                }
            },
        ]
    },

]

export default routes
