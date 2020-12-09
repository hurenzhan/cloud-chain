<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    {{ token }}{{ loginTest }}{{ loginTestGetters }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue'
import { useStore, createNamespacedHelpers } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import mapStore from '@/libs/mapStore.ts' // @ is an alias to /src
// const {
//   mapState,
//   mapActions,
//   mapMutations,
//   mapGetters,
// } = createNamespacedHelpers('login')

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    // const store = useStore()
    // console.log(store.state.login.token, 'store')
    // const a = mapActions('login', ['handleLogin'])
    // console.log(a, 'a')
    // console.log(useActions);

    // const { handleLogin } = mapActions(['handleLogin'])
    // handleLogin.call({ $store: store })
    // const { token } = mapState(['token'])
    // console.log(token.call({ $store: store }))

    // const usesState = useState(['token'])
    // console.log(useState(['token']))
    // a.handleLogin.call({ $store: store })
    // store.dispatch("login/handleLogin");
    // handleLogin()

    const loginStore = mapStore('login')
    const { getState, getMutations, getActions, getGetters } = loginStore
    const { handleLogin } = getActions(['handleLogin'])
    const { save } = getMutations(['save'])
    const { loginTestGetters } = getGetters(['loginTestGetters'])

    const { token, loginTest } = getState(['token', 'loginTest'])
    // const { token, loginTest } = mapState(['token', 'loginTest'])
    // const { token, loginTest } = mapState(['token', 'loginTest'])

    save({
      token: 9909,
      loginTest: 'sssss',
    })

    handleLogin({ token, loginTest })

    console.log(token.value, loginTest.value, 'token, loginTest')
    // console.log(token.call({ $store: store }))

    console.log(loginTestGetters, 'loginTestGetters')

    setTimeout(() => {
      save({
        token: 1,
        loginTest: '1',
      })
      handleLogin({ token, loginTest })
    }, 2000)

    const state = reactive({
      token,
      loginTest,
      loginTestGetters,
    })
    return {
      ...toRefs(state),
    }
  },
})
</script>
