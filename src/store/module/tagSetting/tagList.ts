import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { tagPackageDispatch } from '@/service'
import { TagPage } from '@/types/tagPackage'

interface SearchConditionType {
  pageNo: number;
  pageSize: number;
}

interface InitStateType {
  searchCondition: SearchConditionType;
  tagPageData: TagPage | {};
  loading: boolean;
  loadingAction: boolean;
  actionItem: undefined;
}

const defaultState: InitStateType = {
  searchCondition: {
    pageNo: 1,
    pageSize: 10
  },
  tagPageData: {},
  loading: false,
  loadingAction: false,
  actionItem: undefined
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
    async fetchTagPage({ state }, payload) {
      state.loading = true
      const [err, res] = await tagPackageDispatch.use('tagPage', payload)
      if (err) return state.loading = false
      state.tagPageData = res.data
      state.loading = false
    },
    async fetchAction({ state }, payload) {
      state.loadingAction = true
      const actionType = payload.id ? 'update' : 'createTag'
      const [err] = await tagPackageDispatch.use(actionType, payload)
      if (err) return state.loadingAction = false
      state.loadingAction = false
      return true
    }
  }
} as Module<any, any>