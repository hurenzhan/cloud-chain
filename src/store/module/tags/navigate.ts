import { Module } from 'vuex'
import { RecordType } from '@/types/common'
import { TagInfo } from '@/types/tagPackage'

interface InitStateType {
  activeTagItem: TagInfo | null;
}

const defaultState: InitStateType = {
  activeTagItem: null
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
  }
} as Module<any, any>