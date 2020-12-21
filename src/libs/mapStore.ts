import { RecordType } from '@/types/common'
import { computed } from 'vue'
import { useStore, createNamespacedHelpers } from 'vuex'

enum TYPES {
    STATE,
    MUTATIONS,
    GETTERS,
    ACTIONS
}

const mapStore = (namespaced: string) => {
    const { mapState, mapMutations, mapGetters, mapActions } = createNamespacedHelpers(namespaced)
    
    const handlePerform = (maps: RecordType, type: TYPES) => {
        const store = useStore()
        const COMPUTED_COLLECTION = [TYPES.STATE, TYPES.GETTERS]
        const METHOD_COLLECTION = [TYPES.MUTATIONS, TYPES.ACTIONS]
        for (const key in maps) {
            const val = maps[key]
            if (COMPUTED_COLLECTION.includes(type)) maps[key] = computed(val.bind({ $store: store }))
            if (METHOD_COLLECTION.includes(type)) maps[key] = val.bind({ $store: store })
        }
        return maps
    }

    const getState = (map: string[]): RecordType => handlePerform(mapState(map), TYPES.STATE)

    const getMutations = (map: string[]): RecordType => handlePerform(mapMutations(map), TYPES.MUTATIONS)

    const getGetters = (map: string[]): RecordType => handlePerform(mapGetters(map), TYPES.GETTERS)

    const getActions = (map: string[]): RecordType => handlePerform(mapActions(map), TYPES.ACTIONS)

    return {
        getState,
        getMutations,
        getGetters,
        getActions
    }
}

export default mapStore