import { RouteRecordRaw } from 'vue-router'
import home from './modules/home'
import login from './modules/login'

const routers: Array<RouteRecordRaw> = [
  ...home,
  ...login
]

export default routers
