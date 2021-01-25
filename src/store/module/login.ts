import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { setToken, setUserInfo } from '@/libs/utils'
import { loginDispatch } from '@/service/login'
import { UserInfoType } from '@/types/userInfo'

interface InitStateType {
  userInfo: UserInfoType;
  loading: boolean;
}

const defaultState: InitStateType = {
  userInfo: {},
  loading: false
}



export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    save(state: InitStateType, payload: RecordType) {
      Object.assign(state, payload)
    },
  },
  getters: {
  },
  actions: {
    // 密码登录
    async fetchLogin({ state }, payload: any) {
      state.loading = true
      const url = payload.password ? 'loginPassword' : 'loginCaptcha'
      const [err, res] = await loginDispatch.use(url, payload)
      if (err) {
        state.loading = false
        return false
      }
      state.userInfo = res?.data
      setToken(state.userInfo.token)
      setUserInfo(state.userInfo)
      state.loading = false
      return true
    }
  }
} as Module<any, any>