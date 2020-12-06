<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/aboutTest">aboutTest</router-link>
  </div>
  <keep-alive>
    <router-view v-slot="{ Component }" v-if="routerConfig.meta.keepAlive">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </keep-alive>
  <router-view v-if="!routerConfig.meta.keepAlive" />
  {{ routerConfig.meta }}
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  setup(props, context) {
    const state = reactive({
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
