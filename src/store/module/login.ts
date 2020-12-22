import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { getToken } from '@/libs/utils'
import { loginDispatch } from '@/service/login'

interface InitStateType {
  token: string | null;
  userInfo: object;
  loading: boolean;
}

const defaultState: InitStateType = {
  token: getToken(),
  userInfo: {},
  loading: false
}

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    save(state: InitStateType, payload: RecordType) {
      Object.assign(state, payload)
    }
  },
  getters: {
  },
  actions: {
    // 登录
    async handleLogin({ commit }, payload: any) {
      const login = await loginDispatch.use('login')
    },
    // // 退出登录
    // handleLogOut() {
    // },
    // // 获取用户相关信息
    // getUserInfo() {
    // }
  }
} as Module<any, any>