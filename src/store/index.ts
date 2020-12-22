import { createStore } from 'vuex'
import login from './module/login'
import home from './module/home/index'
import tagSet from './module/tagSet/index'
import settings from './module/settings/index'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    ...home,
    ...tagSet,
    ...settings
  }
})
