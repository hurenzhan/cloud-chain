<template>
  <Button :="attrs" class="login__input-submit_btn" type="primary">
    <slot />
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';

export default defineComponent({
  name: 'submitButton',
  inheritAttrs: false,
  components: {
    Button,
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
.login__input-submit_btn {
  width: @login-input-width;
}
</style>
