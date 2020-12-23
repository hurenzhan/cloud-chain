<template>
  <Header><slot /></Header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';

const { Header } = Layout;

export default defineComponent({
  name: 'settingsHeader',

  components: {
    Header,
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.ant-layout-header {
  background: @white;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 0 24px;
  font-size: 18px;
  .anticon {
    font-size: 16px;
  }
}
</style>

