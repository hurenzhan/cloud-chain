<template>
  <div class="login__input-verification_code">
    <Input size="large" :="attrs" />
    <Button size="large" @click="handleCountdown" type="primary"
      >获取验证码</Button
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { Input, Button } from 'ant-design-vue';

interface StateType {
  loading: boolean;
}

export default defineComponent({
  name: 'verificationCodeInput',
  inheritAttrs: false,
  components: {
    Input,
    Button,
  },
  emits: ['handleCountdown'],
  //   emits: {
  //     handleCountdown: (val) => {
  //       console.log(val, 'val');
  //       return true;
  //     },
  //   },
  setup(props, { attrs, emit }) {
    const state: StateType = reactive({
      loading: false,
    });

    const handleCountdown = (): void => {
      emit('handleCountdown', true);
      console.log(emit('handleCountdown', true));
    };

    return {
      ...toRefs(state),
      attrs,
      handleCountdown,
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.login__input-verification_code {
  position: relative;
  width: @login-input-width;
  .ant-input {
    border: none;
    width: 208px;
  }
  .ant-btn {
    height: 38px;
    border-radius: 0 2px 2px 0;
  }
}
</style>
