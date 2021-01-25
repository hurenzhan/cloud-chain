import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { UserPageDispatch, roleInfoDispatch } from '@/service/index';
import { RoleList } from '@/types/roleInfo';
import { UserPage } from '@/types/user';

interface SearchConditionType {
  pageNo: number;
  pageSize: number;
}

interface InitStateType {
  searchCondition: SearchConditionType;
  UserPageData: UserPage | {};
  loading: boolean;
  loadingAction: boolean;
  roleList: RoleList;
}

const defaultState: InitStateType = {
  searchCondition: {
    pageNo: 1,
    pageSize: 10
  },
  UserPageData: {},
  loading: false,
  loadingAction: false,
  roleList: []
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
    async fetchUserList({ state }, payload) {
      state.loading = true
      const [err, res] = await UserPageDispatch.use('page', payload)
      if (err) return state.loading = false
      state.UserPageData = res.data
      state.loading = false
    },
    async fetchUserAction({ state }, payload) {
      state.loadingAction = true
      const [err] = await UserPageDispatch.use('modify', payload)
      if (err) return state.loadingAction = false
      state.loadingAction = false
      return true
    },
    async fetchRoleInfo({ state }, payload) {
      const [err, res] = await roleInfoDispatch.use('list', payload)
      if (err) return
      state.roleList = res.data
      return true
    }
  }
} as Module<any, any>