import { RouteRecordRaw } from 'vue-router'
import home from './modules/home'
import login from './modules/login'

const routers: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  ...home,
  ...login
]

export default routers
