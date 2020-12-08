<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore, mapState, mapActions } from "vuex";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    const store = useStore();
    console.log(store.state.login.token, "store");
    const a = {
      ...mapActions("login", ["handleLogin"]),
    };
    console.log(a, "a");

    a.handleLogin()
    store.dispatch("login/handleLogin");
  },
});
</script>
