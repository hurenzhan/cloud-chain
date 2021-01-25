import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { OriginTagPage } from '@/types/originTag';
import { originTagDispatch } from '@/service';

interface SearchConditionType {
  pageNo: number;
  pageSize: number;
}

interface InitStateType {
  searchCondition: SearchConditionType;
  originTagPage: OriginTagPage | {};
  loading: boolean;
  loadingAction: boolean;
  actionItem: undefined;
}

const defaultState: InitStateType = {
  searchCondition: {
    pageNo: 1,
    pageSize: 10
  },
  originTagPage: {},
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
    async fetchOriginTagPage({ state }, payload) {
      state.loading = true
      const [err, res] = await originTagDispatch.use('page', payload)
      if (err) return state.loading = false
      state.originTagPage = res.data
      state.loading = false
    },
    async fetchAction({ state }, payload) {
      state.loadingAction = true
      const actionType = payload.id ? 'update' : 'create'
      const [err] = await originTagDispatch.use(actionType, payload)
      if (err) return state.loadingAction = false
      state.loadingAction = false
      return true
    }
  }
} as Module<any, any>