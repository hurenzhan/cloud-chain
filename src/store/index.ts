import { createStore } from 'vuex'
import login from './module/login'
import home from './module/home/index'
import tagSet from './module/tagSet/index'

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
    ...tagSet
  }
})
