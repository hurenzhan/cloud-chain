import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { CodeRulePage } from '@/types/codeRule'
import { codeRuleDispatch } from '@/service/index'

interface SearchConditionType {
  pageNo: number;
  pageSize: number;
}

interface InitStateType {
  searchCondition: SearchConditionType;
  codeRuleData: CodeRulePage | {};
  loading: boolean;
  loadingAction: boolean;
  actionItem: undefined;
}

const defaultState: InitStateType = {
  searchCondition: {
    pageNo: 1,
    pageSize: 10
  },
  codeRuleData: {},
  loading: false,
  loadingAction: false,
  actionItem: undefined
}

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    save(state: InitStateType, payload: RecordType) {
      Object.assign(state, { ...payload })
    }
  },
  getters: {
  },
  actions: {
    async fetchCodeRuleList({ state }, payload) {
      state.loading = true
      const [err, res] = await codeRuleDispatch.use('page', payload)
      if (err) return state.loading = false
      state.codeRuleData = res.data
      state.loading = false
    },
    async fetchCodeRuleAction({ state }, payload) {
      state.loadingAction = true
      const actionType = payload.id ? 'update' : 'create'
      const [err] = await codeRuleDispatch.use(actionType, payload)
      if (err) return state.loadingAction = false
      state.loadingAction = false
      return true
    }
  }
} as Module<any, any>