import { createStore } from 'vuex'
import login from './module/login'

export default createStore({
  state: {
    test: 'test'
  },
  mutations: {
    trrr(state) {
      state.test = '423432'
    }
  },
  actions: {
    handleLogin() {
      console.log('?/??', 'state');

      // return new Promise((resolve, reject) => {
      //   login({
      //     ...loginInfo
      //   })
      //     .then((res) => {
      //       // console.log('TCL: handleLogin -> res', res)
      //       if (res.code === 200) {
      //         const data = res.data
      //         commit('setToken', res.token)
      //         commit('setAvatar', data.pic)
      //         commit('setUserName', data.name)
      //         commit('setUserId', data._id)
      //         commit('setAccess', data.roles)
      //         commit('setHasGetInfo', true)
      //       }
      //       resolve(res)
      //     })
      //     .catch((err) => {
      //       reject(err)
      //     })
      // })
    },
  },
  modules: {
    login
  }
})
