import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { getUserInfo } from '@/libs/utils';
// import { loginDispatch } from '@/service/login'

interface BasicInfoType {
    name: string;
    dataSources: string;
    labelCollection: number;
    labelVerify: number;
}

interface InitStateType {
    basicInfo: BasicInfoType | null;
}

const defaultState: InitStateType = {
    basicInfo: null,
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
            state.basicInfo = getUserInfo()
        }
    }
} as Module<any, any>