import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'
const Home: Component = () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
const About: Component = () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
const AboutTest: Component = () => import(/* webpackChunkName: "about" */ '@/views/AboutTest.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/aboutTest',
        name: 'aboutTest',
        component: AboutTest,
        meta: {
            keepAlive: true
        },
        beforeEnter: (to, { name }, next) => {
            to.meta.keepAlive = true
            if (name === 'home') {
                to.meta.keepAlive = false
            }
            if (name === 'about') {
                to.meta.keepAlive = true
            }
            next()
        }
    }
]

export default routes
