import { Module } from 'vuex'
import { RecordType } from '@/types/common'
// import { loginDispatch } from '@/service/login'

interface BasicInfoType {
    name: string;
    dataSources: string;
    labelCollection: number;
    labelVerify: number;
}

interface InitStateType {
    basicInfo: BasicInfoType;
}

const defaultState: InitStateType = {
    basicInfo: {
        name: '测试公司',
        dataSources: 'Excel',
        labelCollection: 0,
        labelVerify: 0,
    }
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
        fetchBasicInfo({ state }, payload) {
            console.log(payload);
        }
    }
} as Module<any, any>