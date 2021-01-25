import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { TagDataItemPage } from '@/types/tagDataItem';
import { tagDataItemDispatch } from '@/service';

interface SearchConditionType {
  pageNo: number;
  pageSize: number;
}

interface InitStateType {
  searchCondition: SearchConditionType;
  tagDataItemPage: TagDataItemPage | {};
  loading: boolean;
  loadingAction: boolean;
  actionItem: undefined | {};
}

const defaultState: InitStateType = {
  searchCondition: {
    pageNo: 1,
    pageSize: 10
  },
  tagDataItemPage: {},
  loading: false,
  loadingAction: false,
  actionItem: undefined,
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
    async fetchTagDataItemPage({ state }, payload) {
      state.loading = true
      const [err, res] = await tagDataItemDispatch.use('page', payload)
      if (err) return state.loading = false
      state.tagDataItemPage = res.data
      state.loading = false
    },
    async fetchAction({ state }, payload) {
      state.loadingAction = true
      const actionType = payload.id ? 'update' : 'create'
      const [err] = await tagDataItemDispatch.use(actionType, payload)
      if (err) return state.loadingAction = false
      state.loadingAction = false
      return true
    },
  }
} as Module<any, any>