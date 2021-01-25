import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { labelDispatch } from '@/service/index'

interface TableData {
    total: number;
    pageInfo: any[];
}

interface SearchConditionType {
    pageNo: number;
    pageSize: number;
}

interface InitStateType {
    searchCondition: SearchConditionType;
    tableData: TableData;
    loading: boolean;
}

const defaultState: InitStateType = {
    searchCondition: {
        pageNo: 1,
        pageSize: 10
    },
    tableData: {
        total: 35,
        pageInfo: [
            {
                id: '1',
                code: '1',
                createName: '1',
                createDate: '1',
                status: '1',
            },
            {
                id: '2',
                code: '2',
                createName: '2',
                createDate: '2',
                status: '2',
            },
        ]
    },
    loading: false,
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
        async fetchInvoicesList({ state }, payload) {
            state.loading = true
            const [err, res] = await labelDispatch.use('paginate', payload)
            if (err) return state.loading = false
            state.tableData = res.data
            state.loading = false
        },
    }
} as Module<any, any>