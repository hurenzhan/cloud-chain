<template>
  <Layout>
    <Header class="ln-border-top">
      <NavHeader />
    </Header>
    <Content> 1 </Content>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavHeader from '@/components/NavHeader.vue';
import { Layout } from 'ant-design-vue';
const { Header, Content } = Layout;

export default defineComponent({
  name: 'invoices',
  components: {
    NavHeader,
    Layout,
    Header,
    Content,
  },
  //   setup() {},
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.ant-layout-header {
  background: @white;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
}
.ant-layout-content {
  background: @white;
  padding: 0 50px;
}
</style>
