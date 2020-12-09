import { ActionContext } from 'vuex'
import { RecordType } from '@/types/common'
// import {
//   getUserInfo
//   // logout,
//   // getMessage,
//   // getContentByMsgId,
//   // hasRead,
//   // removeReaded,
//   // restoreTrash,
//   // getUnreadCount
// } from '@/api/user'
// import { login } from '@/api/login'
import { getToken } from '@/libs/util'

interface InitState {
  token: string;
  loginTest: string;
  [propName: string]: any;
}

const defaultState: InitState = {
  token: getToken() || '666',
  loginTest: 'loginTest',
}

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    save(state: InitState, payload: RecordType) {
      console.log(payload, 'payload')
      // for (const key in payload) {
      //   state[key] = payload[key]
      // }
      state.token = '33336669999'
    },
  },
  getters: {
    loginTestGetters: (state: InitState) => {
      console.log(state, 'loginTestGetters');

      return 1
    },
  },
  actions: {
    // 登录
    handleLogin<S, R>({ commit, state }: ActionContext<S, R>, loginInfo: any) {
      console.log(loginInfo, 'handleLogin');
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
    // // 退出登录
    // handleLogOut({ state, commit }) {
    // },
    // // 获取用户相关信息
    // getUserInfo({ state, commit }) {
    // }
  }
}
