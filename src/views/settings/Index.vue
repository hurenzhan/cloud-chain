<template>
  <div class="settings__content">
    <Layout class="ln-p-20">
      <Sider class="ln-mr-20">
        <Space direction="vertical" :size="20">
          <div
            :class="[
              'settings__content-menu_item',
              { active_menu: routerConfig.name === 'settingsBasic' },
            ]"
          >
            <HomeOutlined class="ln-mr-10" />企业信息
          </div>
          <div
            :class="[
              'settings__content-menu_item',
              'ln-ml-28',
              { active_menu: routerConfig.name === 'settingsBasic' },
            ]"
          >
            <router-link to="/settings/basic">基本信息</router-link>
          </div>
          <div
            :class="[
              'settings__content-menu_item',
              { active_menu: routerConfig.name === 'settingsUser' },
            ]"
          >
            <UsergroupAddOutlined class="ln-mr-10" />
            <router-link to="/settings/user">成员管理</router-link>
          </div>
          <div
            :class="[
              'settings__content-menu_item',
              { active_menu: routerConfig.name === 'settingsCodeRule' },
            ]"
          >
            <BarcodeOutlined class="ln-mr-10" />
            <router-link to="/settings/codeRule">编码规则</router-link>
          </div>
          <div
            :class="[
              'settings__content-menu_item',
              { active_menu: routerConfig.name === 'settingsBasicTagRule' },
            ]"
          >
            <TagOutlined class="ln-mr-10" />
            <router-link to="/settings/basicTagRule">原厂标签规则</router-link>
          </div>
        </Space>
      </Sider>
      <Layout>
        <Header> 基本信息 </Header>
        <Content>
          <router-view #="{ Component }">
            <keep-alive>
              <component v-if="routerConfig.meta.keepAlive" :is="Component" />
            </keep-alive>
            <component v-if="!routerConfig.meta.keepAlive" :is="Component" />
          </router-view>
        </Content>
      </Layout>
    </Layout>
    {{ routerConfig.meta.keepAlive }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import { Layout, Space } from 'ant-design-vue';
import {
  HomeOutlined,
  UsergroupAddOutlined,
  BarcodeOutlined,
  TagOutlined,
} from '@ant-design/icons-vue';
const { Header, Content, Sider } = Layout;

interface State {
  routerConfig: RouteLocationNormalizedLoaded;
}

const menuList = [
  {
    name: '基本设置',
    path: '/settings/basic',
    pathName: 'basic',
  },
];

export default defineComponent({
  name: 'settings',
  components: {
    Layout,
    Header,
    Content,
    Sider,
    Space,
    HomeOutlined,
    UsergroupAddOutlined,
    BarcodeOutlined,
    TagOutlined,
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
.settings__content {
  .ant-layout-header {
    background: @white;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .ant-layout-sider {
    background: @white;
    flex: none !important;
    max-width: none !important;
    min-width: initial !important;
    width: initial !important;
    padding: 40px !important;
  }
  &-menu_item {
    font-size: 18px;
    a {
      color: @0-0-0_65;
    }
  }
  .active_menu {
    color: @black;
    a {
      color: @black;
    }
  }
}
</style>
