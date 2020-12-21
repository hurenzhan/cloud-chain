import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const TagList: Component = () => import(/* webpackChunkName: "about" */ '@/views/tagList/Index.vue')
const DataItem: Component = () => import(/* webpackChunkName: "about" */ '@/views/tagList/DataItem.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/tagList',
        name: 'tagList',
        component: TagList,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/tagList/dataItem',
        name: 'dataItem',
        component: DataItem,
    },

]

export default routes
