import { getToken } from '@/libs/utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routers'
import config from '@/config'
const { homeName } = config

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

const LOGIN_PAGE_NAME = 'login'
const REG_PAGE_NAME = 'userReg'

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token && ![LOGIN_PAGE_NAME, REG_PAGE_NAME].includes(to.name as string)) {
    // 未登录跳转的不是登录页或者注册页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && [LOGIN_PAGE_NAME, REG_PAGE_NAME].includes(to.name as string)) {
    // 未登陆跳转的是登录页或者注册页
    next()
  } else if (token && [LOGIN_PAGE_NAME, REG_PAGE_NAME].includes(to.name as string)) {
    // 已登录跳转的是登录页或者注册页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    next()
  }
})

export default router
