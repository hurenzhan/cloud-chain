<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    {{ token }}{{ loginTest }}{{ loginTestGetters }}{{ ttt }}
    <div class="ln-mt-10">
      <img :src="a" />
    </div>
    <Button
      >You are using a whole package of antd, please use
      https://www.npmjs.com/package/babel-plugin-import to reduce app bundle
      size.</Button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import mapStore from '@/libs/mapStore.ts' // @ is an alias to /src
import { Button } from 'ant-design-vue'
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
    Button,
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

    const loginStore = mapStore('home')
    const { getState, getMutations, getActions, getGetters } = loginStore
    const { handleLogin } = getActions(['handleLogin'])
    const { save } = getMutations(['save'])
    const { loginTestGetters } = getGetters(['loginTestGetters'])

    const { token, loginTest, ttt, a } = getState([
      'token',
      'loginTest',
      'ttt',
      'a',
    ])
    // const { token, loginTest } = mapState(['token', 'loginTest'])
    // const { token, loginTest } = mapState(['token', 'loginTest'])

    save({
      token: 9909,
      loginTest: 'sssss',
    })

    // handleLogin({ token, loginTest })

    setTimeout(() => {
      save({
        token: 996,
        loginTest: '1',
        ttt: 666,
      })
      handleLogin({ token, loginTest })
      // console.log(getToken(), "getToken()");
    }, 5000)
    handleLogin({ token, loginTest })
    const state = reactive({
      token,
      loginTest,
      loginTestGetters,
      ttt,
      a,
    })
    return {
      ...toRefs(state),
    }
  },
})
</script>
