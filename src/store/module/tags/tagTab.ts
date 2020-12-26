import { Module } from 'vuex'
import { RecordkeyType, RecordType } from '@/types/common'
// import { loginDispatch } from '@/service/login'

export interface TableData {
    total: number;
    pageInfo: any[];
}

export interface SearchConditionType {
    pageNo: number;
    pageSize: number;
}

interface InitStateType {
    activeKey: string;
    searchConditions: Record<RecordkeyType, SearchConditionType>;
    tableDatas: Record<RecordkeyType, TableData>;
}

const defaultState: InitStateType = {
    activeKey: 'commodity',
    searchConditions: {
        commodity: {
            pageNo: 1,
            pageSize: 10
        },
        box1: {
            pageNo: 1,
            pageSize: 10
        },
        box2: {
            pageNo: 1,
            pageSize: 10
        },
    },
    tableDatas: {
        commodity: {
            total: 35,
            pageInfo: [
                {
                    tagId: '1',
                    id: '1',
                    name: '1',
                    order: '1',
                    number: '1',
                    code: '1',
                    status: '1',
                },
                {
                    tagId: '2',
                    id: '2',
                    name: '2',
                    order: '2',
                    number: '2',
                    code: '2',
                    status: '2',
                }
            ]
        },
        box1: {
            total: 35,
            pageInfo: [
                {
                    code: 'box1',
                    order: 'box1',
                    number: 'box1',
                    name: 'box1',
                    date: 'box1',
                    id: 'box1',
                },
                {
                    code: '3',
                    order: '3',
                    number: '3',
                    name: '3',
                    date: '3',
                    id: '3',
                }
            ]
        },
        box2: {
            total: 35,
            pageInfo: [
                {
                    code: 'box2',
                    order: 'box2',
                    number: 'box2',
                    name: 'box2',
                    date: 'box2',
                    id: 'box2',
                },
                {
                    code: '3',
                    order: '3',
                    number: '3',
                    name: '3',
                    date: '3',
                    id: '3',
                }
            ]
        },
    }
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
            searchConditions[activeKey] = { ...payload }
        }
    },
    getters: {
    },
    actions: {
        fetchCommodityList({ state, commit }, payload) {
            commit('updateSearchCondition', payload)
        },
        fetchBoxList({ state, commit }, payload) {
            commit('updateSearchCondition', payload)
        }
    }
} as Module<any, any>