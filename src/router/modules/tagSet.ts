import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const TagList: Component = () => import(/* webpackChunkName: "about" */ '@/views/tagList/Index.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/tagList',
        name: 'tagList',
        component: TagList,
    },
]

export default routes
