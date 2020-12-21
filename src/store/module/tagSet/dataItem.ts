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
  cacheData: RecordType[];
  columns: RecordType[];
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
        dataItemName: 1,
        edit: 1,
        required: 1,
        keyType: 1,
        invoicesItem: 1,
        detailsItem: 1,
        tagItem: 1,
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
        code: 1,
        status: 1,
      },
    ]
  },
  cacheData: [],
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '数据项名称',
      dataIndex: 'dataItemName',
      key: 'dataItemName',
    },
    {
      title: '允许编辑',
      dataIndex: 'edit',
      key: 'edit',
      slots: { customRender: 'edit' },
      isModify: true
    },
    {
      title: '必填',
      dataIndex: 'required',
      key: 'required',
      slots: { customRender: 'required' },
      isModify: true
    },
    {
      title: '字段类型',
      dataIndex: 'keyType',
      key: 'keyType',
    },
    {
      title: '是否单据项',
      dataIndex: 'invoicesItem',
      key: 'invoicesItem',
      slots: { customRender: 'invoicesItem' },
      isModify: true
    },
    {
      title: '是否明细项',
      dataIndex: 'detailsItem',
      key: 'detailsItem',
      slots: { customRender: 'detailsItem' },
      isModify: true
    },
    {
      title: '是否标签项',
      dataIndex: 'tagItem',
      key: 'tagItem',
      slots: { customRender: 'tagItem' },
      isModify: true
    },
    {
      title: '原厂料号',
      dataIndex: 'code',
      key: 'code',
      slots: { customRender: 'code' },
      isModify: true
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: '操作',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ],
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
    commonColumns: (state: InitState) => {
      return state.columns.filter((item: RecordType) => item.key !== 'action');
    },
  },
  actions: {
    fetchTagList({ state }, payload) {
      state.cacheData = state.tableData.pageInfo.map((item: RecordType) => ({
        ...item,
      }))
    }
  }
} as Module<any, any>