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
        tagName: 'John Brown',
        createTime: 32,
        createName: 'New York No. 1 Lake Park',
        status: '启用',
      },
      {
        id: '12',
        tagName: 'John Brown',
        createTime: 32,
        createName: 'New York No. 1 Lake Park',
        status: '启用',
      },
      {
        id: '13',
        tagName: 'John Brown',
        createTime: 32,
        createName: 'New York No. 1 Lake Park',
        status: '启用',
      },
    ]
  }
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
    fetchTagList({ commit }, payload) {
      commit('save', { searchCondition: payload })
    }
  }
} as Module<any, any>