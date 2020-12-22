import { Module } from 'vuex'
import { RecordType } from '@/types/common'
// import { loginDispatch } from '@/service/login'

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
        ruleName: 1,
        prefix: 1,
        date: 1,
        order: 1,
        serialNumber: 1,
        serialNumberLength: 1,
        randomCode: 1,
        randomCodeLength: 1,
        status: 1,
      },
      {
        id: '2',
        ruleName: 2,
        prefix: 2,
        date: 2,
        order: 2,
        serialNumber: 2,
        serialNumberLength: 2,
        randomCode: 2,
        randomCodeLength: 2,
        status: 2,
      },
    ]
  },
}

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    save(state: InitStateType, payload: RecordType) {
      // Object.assign(state, payload)
    }
  },
  getters: {
  },
  actions: {
    fetchCodeRuleList({ state }, payload) {
      console.log(payload);
    }
  }
} as Module<any, any>