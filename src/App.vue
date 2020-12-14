<template>
  <Layout>
    <Header>
      <UserHeader />
    </Header>
    <Content>
      <router-view #="{ Component }">
        <keep-alive>
          <component v-if="routerConfig.meta.keepAlive" :is="Component" />
        </keep-alive>
        <component v-if="!routerConfig.meta.keepAlive" :is="Component" />
      </router-view>
    </Content>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import UserHeader from "./views/UserHeader.vue";
import { Layout } from "ant-design-vue";
const { Header, Content } = Layout;
// import "ant-design-vue/dist/antd.css";
// import 'ant-design-vue/components/style.js';

interface State {
  routerConfig: RouteLocationNormalizedLoaded;
}

export default defineComponent({
  components: {
    UserHeader,
    Layout,
    Header,
    Content,
  },
  setup() {
    const state = reactive<State>({
      routerConfig: useRoute(),
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped>
@import "~@/styles/utils";
.ant-layout-header {
  background: @white;
}
</style>
