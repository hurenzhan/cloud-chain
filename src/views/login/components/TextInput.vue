<template>
  <div class="login__input-text">
    <Input size="large" :="attrs" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Input } from 'ant-design-vue';

export default defineComponent({
  name: 'textInput',
  inheritAttrs: false,
  components: {
    Input,
  },
  setup(props, { attrs }) {
    return {
      attrs,
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.login__input-text {
  width: @login-input-width;
  .ant-input {
    border: none;
  }
}
</style>
