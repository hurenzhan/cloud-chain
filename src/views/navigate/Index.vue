<template>
  <div class="navigate__content">
    <Layout>
      <NavHeader />
      <Layout class="ln-mt-40">
        <Sider>
          <Menu v-model:selectedKeys="selectedKeys" mode="vertical">
            <MenuItem key="tag">
              <TagsOutlined />
              我的标签
            </MenuItem>
          </Menu>
        </Sider>
        <Content class="ln-px-40">
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
    </Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import NavHeader from '@/components/NavHeader.vue';
import { Layout, Menu } from 'ant-design-vue';
import { TagsOutlined } from '@ant-design/icons-vue';
const { Header, Content, Sider } = Layout;
const { Item: MenuItem } = Menu;

interface State {
  routerConfig: RouteLocationNormalizedLoaded;
  selectedKeys: string[];
}

export default defineComponent({
  name: 'navigate',
  components: {
    NavHeader,
    Layout,
    Header,
    Content,
    Sider,
    Menu,
    MenuItem,
    TagsOutlined,
  },
  setup() {
    const state = reactive<State>({
      routerConfig: useRoute(),
      selectedKeys: ['tag'],
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.navigate__content {
  .ant-layout {
    background: @white;
  }
  .ant-layout-sider {
    background: @white;
    flex: none !important;
    max-width: none !important;
    min-width: initial !important;
    width: initial !important;
    padding: 0 40px !important;
    .ant-menu-light {
      border: none;
    }
  }
}
</style>
