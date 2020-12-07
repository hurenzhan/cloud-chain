<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/aboutTest">aboutTest</router-link>
  </div>
  <router-view #="{ Component }">
    <keep-alive>
      <component v-if="routerConfig.meta.keepAlive" :is="Component" />
    </keep-alive>
    <component v-if="!routerConfig.meta.keepAlive" :is="Component" />
  </router-view>
  {{ routerConfig.meta }}
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";

interface State {
  routerConfig: RouteLocationNormalizedLoaded;
}

export default defineComponent({
  setup(props, context) {
    const state = reactive<State>({
      routerConfig: useRoute(),
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
