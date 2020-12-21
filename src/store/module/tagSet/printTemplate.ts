import { Module } from 'vuex'
import { RecordType } from '@/types/common'
// import { getToken } from '@/libs/utils'
// import { loginDispatch } from '@/service/login'

interface TableData {
  total: number;
  pageInfo: any[];
}

interface SearchConditionType {
  pageNo: number;
  pageSize: number;
}

interface InitState {
  searchCondition: SearchConditionType;
  tableData: TableData;
}

const defaultState: InitState = {
  searchCondition: {
    pageNo: 1,
    pageSize: 10
  },
  tableData: {
    total: 35,
    pageInfo: [
      {
        id: '1',
        name: '1',
        createTime: '1',
        status: '1',
      },
      {
        id: '1',
        name: '1',
        createTime: '1',
        status: '1',
      },
    ]
  },
}

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    save(state: InitState, payload: RecordType) {
      // Object.assign(state, payload)
    }
  },
  getters: {
  },
  actions: {
    fetchPrintTemplateList({ state }, payload) {
      console.log(payload);

    }
  }
} as Module<any, any>