<template>
  <Layout>
    <Header>
      <UserHeader />
    </Header>
    <Content>
      <router-view #="{ Component }">
        <keep-alive>
          <component
            v-if="routerConfig.meta.keepAlive"
            :key="routerConfig.name"
            :is="Component"
          />
        </keep-alive>
        <component v-if="!routerConfig.meta.keepAlive" :is="Component" />
      </router-view>
    </Content>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import UserHeader from '@/components/UserHeader.vue';
import { Layout } from 'ant-design-vue';
const { Header, Content } = Layout;

interface State {
  routerConfig: RouteLocationNormalizedLoaded;
}

export default defineComponent({
  name: 'home',
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
@import '~@/styles/utils';
.ant-layout-header {
  background: @white;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>
