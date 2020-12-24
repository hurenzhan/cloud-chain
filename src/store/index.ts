import { createStore } from 'vuex'
import login from './module/login'
import home from './module/home/index'
import tags from './module/tags/index'
import tagSetting from './module/tagSetting/index'
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
    ...tags,
    ...tagSetting,
    ...settings,
  }
})
