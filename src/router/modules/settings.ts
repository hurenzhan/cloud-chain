import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const Settings: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/Index.vue')
const SettingBasic: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/Basic.vue')
const User: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/User.vue')
const CodeRule: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/CodeRule.vue')
const BasicTagRule: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/BasicTagRule.vue')
const BarcodeRule: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/BarcodeRule.vue')
const BarcodeDataItem: Component = () => import(/* webpackChunkName: "about" */ '@/views/settings/BarcodeDataItem.vue')

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
            {
                path: '/settings/basicTagRule/barcodeRule',
                name: 'settingsBarcodeRule',
                component: BarcodeRule,
            },
            {
                path: '/settings/basicTagRule/barcodeRule/dataItem',
                name: 'settingsBarcodeDataItem',
                component: BarcodeDataItem,
            },
        ]
    },

]

export default routes
