import { RecordType } from '@/types/common'
// import store from '@/store'
import { useStore, createNamespacedHelpers } from 'vuex'

enum TYPES {
    STATE,
    MUTATIONS,
    GETTERS,
    ACTIONS
}

const storeDispatch = (namespaced: string) => {
    const { mapState, mapMutations, mapGetters, mapActions } = createNamespacedHelpers(namespaced)
    const handlePerform = (maps: RecordType, type: TYPES) => {
        const store = useStore()
        const CALL_COLLECTION = [TYPES.STATE, TYPES.GETTERS]
        const BIND_COLLECTION = [TYPES.MUTATIONS, TYPES.ACTIONS]
        for (const key in maps) {
            const val = maps[key]
            if (CALL_COLLECTION.includes(type)) maps[key] = val.call({ $store: store })
            if (BIND_COLLECTION.includes(type)) maps[key] = val.bind({ $store: store })
        }

        return maps

    }

    const getState = (map: string[]): RecordType => {
        return handlePerform(mapState(map), TYPES.STATE)
    }
    const getMutations = (map: string[]): RecordType => {
        return handlePerform(mapMutations(map), TYPES.MUTATIONS)
    }
    const getGetters = (map: string[]): RecordType => {
        return handlePerform(mapGetters(map), TYPES.GETTERS)
    }
    const getActions = (map: string[]): RecordType => {
        return handlePerform(mapActions(map), TYPES.ACTIONS)
    }
    return {
        getState,
        getMutations,
        getGetters,
        getActions
    }
}

export default storeDispatch