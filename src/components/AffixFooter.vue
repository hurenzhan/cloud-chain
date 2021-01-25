<template>
  <Footer class="affix-footer__content"><slot /></Footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';

const { Footer } = Layout;

export default defineComponent({
  components: {
    Footer,
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.affix-footer__content {
  position: fixed;
  background: @white;
  right: 0;
  bottom: 0;
  box-shadow: 0px 3px 11px 0px rgba(0, 0, 0, 0.1);
  z-index: 10;
  text-align: center;
  width: 100%;
}
</style>

