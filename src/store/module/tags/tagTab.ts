import { Module } from 'vuex'
import { RecordkeyType, RecordType } from '@/types/common'
import { LabePaginate, PackageRuleInfo } from '@/types/tagPackage'
import { labelDispatch, tagPackageDispatch } from '@/service'
// import { loginDispatch } from '@/service/login'

export interface SearchConditionType {
    pageNo: number;
    pageSize: number;
}

interface InitStateType {
    activeKey: string | null;
    initCondition: SearchConditionType;
    searchConditions: Record<RecordkeyType, SearchConditionType>;
    packageTabList: PackageRuleInfo[];
    tableDatas: Record<RecordkeyType, LabePaginate | {}>;
    loadings: RecordType;
    columnsList: RecordType;
    formDatas: RecordType;
}

const defaultState: InitStateType = {
    activeKey: null,
    initCondition: { pageNo: 1, pageSize: 20 },
    searchConditions: {},
    packageTabList: [],
    tableDatas: {},
    loadings: {},
    columnsList: {},
    formDatas: {},
}

export default {
    namespaced: true,
    state: defaultState,
    mutations: {
        save(state: InitStateType, payload: RecordType) {
            Object.assign(state, payload)
        },
        updateSearchCondition(state: InitStateType, payload: SearchConditionType) {
            const { activeKey, searchConditions } = state
            if (activeKey) searchConditions[activeKey] = { ...payload }
        }
    },
    getters: {
    },
    actions: {
        async fetchLabelList({ state, commit }, payload) {
            const { activeKey } = state
            state.loadings[activeKey] = true
            const [err, res] = await labelDispatch.use('paginate', payload)
            if (err) return state.loadings[activeKey] = false
            state.tableDatas[activeKey] = res.data
            commit('updateSearchCondition', payload)
            state.loadings[activeKey] = false
        },
        async fetchPackageTabList({ state }, payload) {
            const [err, res] = await tagPackageDispatch.use('packageRuleAll', payload)
            if (err) return
            state.packageTabList = res.data
        },
    }
} as Module<any, any>