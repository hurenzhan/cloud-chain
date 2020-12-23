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
        type: '1',
        brandName: '品牌1',
        status: '1',
      },
      {
        id: '2',
        type: '2',
        brandName: '品牌2',
        status: '2',
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
    fetchBasicTagRuleList({ state }, payload) {
      console.log(payload);
    }
  }
} as Module<any, any>