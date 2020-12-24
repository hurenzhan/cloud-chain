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
        dataItemName: 1,
        edit: 1,
        required: 1,
        keyType: 1,
        invoicesItem: 1,
        detailsItem: 1,
        tagItem: 1,
        invoicesCode: 1,
        code: 1,
        status: 1,
      },
      {
        id: '2',
        dataItemName: 2,
        edit: 1,
        required: 1,
        keyType: 2,
        invoicesItem: 1,
        detailsItem: 1,
        tagItem: 1,
        invoicesCode: 1,
        code: 1,
        status: 1,
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
    fetchDataItemList({ state }, payload) {
      console.log(payload);

    }
  }
} as Module<any, any>