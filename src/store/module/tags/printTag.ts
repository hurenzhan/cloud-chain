import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { FormItemType, FORM_ITEM_ENUM } from '@/components/searchForm/types'
import { handleTableSearch } from '@/libs/utils'
// import { loginDispatch } from '@/service/login'

interface InitStateType {
    searchCondition: RecordType;
    tableData: any[];
    columns: any[];
    efficialSearchData: RecordType[];
    templateKey: string | null;
    importVisible: boolean;
    addItemVisible: boolean;
    formData: FormItemType[];
    itemList: RecordType[];
}

const defaultState: InitStateType = {
    searchCondition: {},
    columns: [
        {
            title: '测试1',
            dataIndex: '1',
        },
        {
            title: '测试2',
            dataIndex: '2',
        },
        {
            title: '测试3',
            dataIndex: '3',
        },
        {
            title: '测试4',
            dataIndex: '4',
        },
    ],
    tableData: [
        {
            id: 1,
            1: '随机啊大萨达无',
            2: '大萨达瓦尔大V修复',
            3: '偶偶跑43545东方闪电',
            4: '1方法水电费45发送到发送到一伙人',
        },
        {
            id: 2,
            1: '45大股东以后仍',
            2: '哦哦品牌如委任',
            3: '全校性',
            4: 'ofsjiodf9',
        },
        {
            id: 3,
            1: '后仍',
            2: '哦哦品牌如委任',
            3: 'err',
            4: 'ofsjiodf9',
        },
    ],
    efficialSearchData: [
        {
            key: '1',
            label: '测试1'
        },
        {
            key: '2',
            label: '测试2'
        },
    ],
    templateKey: null,
    importVisible: false,
    addItemVisible: false,
    formData: [],
    itemList: [
        { label: '测试1', value: '1' },
        { label: '测试2', value: '2' },
        { label: '测试3', value: '3' },
        { label: '测试4', value: '4' },
    ],
}

export default {
    namespaced: true,
    state: defaultState,
    mutations: {
        save(state: InitStateType, payload: RecordType) {
            Object.assign(state, payload)
        },
        handleAddSearchItem(state: InitStateType, payload: string[]) {
            // 获取选中项
            const options = state.itemList?.filter(({ value }) => payload?.includes(value))
            // 添加搜索项
            state.formData = options?.map(({ label, value }) => ({
                type: FORM_ITEM_ENUM.INPUT,
                key: value,
                label: label,
                widgetAttrs: {
                    placeholder: '请输入',
                },
            }))
        }
    },
    getters: {
        filterTableData(state: InitStateType) {
            return handleTableSearch(state.tableData, state.searchCondition)
        }
    },
    actions: {
        fetchPrintTagList({ state }, payload) {
            console.log(payload);
        }
    }
} as Module<any, any>