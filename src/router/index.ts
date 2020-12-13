import { getToken } from '@/libs/util'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routers'
import config from '@/config'
const { homeName } = config

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const LOGIN_PAGE_NAME = 'login'

// router.beforeEach((to, from, next) => {
//   const token = getToken()
//   if (!token && to.name !== LOGIN_PAGE_NAME) {
//     // 未登录且要跳转的页面不是登录页
//     next({
//       name: LOGIN_PAGE_NAME // 跳转到登录页
//     })
//   } else if (!token && to.name === LOGIN_PAGE_NAME) {
//     // 未登陆且要跳转的页面是登录页
//     next() // 跳转
//   } else if (token && to.name === LOGIN_PAGE_NAME) {
//     // 已登录且要跳转的页面是登录页
//     next({
//       name: homeName // 跳转到homeName页
//     })
//   } else {
//     next()
//   }
// })

export default router
