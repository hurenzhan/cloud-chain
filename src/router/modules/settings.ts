import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const TagList: Component = () => import(/* webpackChunkName: "about" */ '@/views/tagList/Index.vue')
const Settings: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/Index.vue')
const SettingBasic: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/Basic.vue')
const User: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/User.vue')
const CodeRule: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/CodeRule.vue')
const BasicTagRule: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/BasicTagRule.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/settings',
        name: 'settings',
        redirect: '/settings/basic',
        component: Settings,
        children: [
            {
                path: '/settings/basic',
                name: 'settingsBasic',
                component: SettingBasic,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/settings/user',
                name: 'settingsUser',
                component: User,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/settings/codeRule',
                name: 'settingsCodeRule',
                component: CodeRule,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/settings/basicTagRule',
                name: 'settingsBasicTagRule',
                component: BasicTagRule,
                meta: {
                    keepAlive: true
                }
            },
        ]
    },

]

export default routes
