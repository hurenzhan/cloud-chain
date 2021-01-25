import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { PackageRulePage } from '@/types/tagPackage';
import { codeRuleDispatch, tagDataItemDispatch, tagPackageDispatch } from '@/service';
import { PackageCodeRuleInfo } from '@/types/codeRule';
import { TagDataItemInfo } from '@/types/tagDataItem';

interface SearchConditionType {
  pageNo: number;
  pageSize: number;
}

interface InitStateType {
  searchCondition: SearchConditionType;
  packageRulePageData: PackageRulePage | {};
  loading: boolean;
  loadingAction: boolean;
  actionItem: undefined;
  packageCodeRulePageData: PackageCodeRuleInfo[] | [];
  tagDataItemList: TagDataItemInfo[];
}

const defaultState: InitStateType = {
  searchCondition: {
    pageNo: 1,
    pageSize: 10
  },
  packageRulePageData: {},
  loading: false,
  loadingAction: false,
  actionItem: undefined,
  packageCodeRulePageData: [],
  tagDataItemList: []
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
    async fetchPackageRulePage({ state }, payload) {
      state.loading = true
      const [err, res] = await tagPackageDispatch.use('packageRulePage', payload)
      if (err) return state.loading = false
      state.packageRulePageData = res.data
      state.loading = false
    },
    async fetchAction({ state }, payload) {
      state.loadingAction = true
      const actionType = payload.id ? 'update' : 'createPackageRule'
      const [err] = await tagPackageDispatch.use(actionType, payload)
      if (err) return state.loadingAction = false
      state.loadingAction = false
      return true
    },
    async fetchPackageCodeRulePage({ state }, payload) {
      const [err, res] = await codeRuleDispatch.use('select', payload)
      if (err) return
      state.packageCodeRulePageData = res.data
    },
    async fetchTagDataItemList({ state }, payload) {
      const [err, res] = await tagDataItemDispatch.use('select', payload)
      if (err) return
      state.tagDataItemList = res.data
    },
  }
} as Module<any, any>