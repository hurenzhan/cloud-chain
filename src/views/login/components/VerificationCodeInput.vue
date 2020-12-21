<template>
  <div class="login__input-verification_code">
    <Input size="large" :="attrs" />
    <Button :disabled="loading" size="large" @click="onClick" type="primary">
      {{ btnName }}</Button
    >
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  toRefs,
  PropType,
  onUnmounted,
} from 'vue';
import { Input, Button } from 'ant-design-vue';

interface StateType {
  loading: boolean;
  count: number;
  btnName: string;
}

type HandleCountdownType = () => Promise<any> | (() => void);

const INIT_COUNT = 60;

let timer: number;

export default defineComponent({
  name: 'verificationCodeInput',

  inheritAttrs: false,

  components: {
    Input,
    Button,
  },

  props: {
    handleCountdown: {
      type: Function as PropType<HandleCountdownType>,
      required: true,
    },
  },

  setup(props, { attrs }) {
    const state: StateType = reactive({
      loading: false,
      count: INIT_COUNT,
      btnName: computed(() =>
        state.loading ? state.count + 's' : '获取验证码'
      ),
    });

    const setCountdown = () => {
      state.loading = true;
      timer = setInterval(() => {
        state.count--;
        if (state.count <= 0) {
          clearInterval(timer);
          state.loading = false;
          state.count = INIT_COUNT;
        }
      }, 1000);
    };

    const onClick = async () => {
      const isNext = await props.handleCountdown();
      if (isNext) setCountdown();
    };

    onUnmounted(() => {
      clearInterval(timer);
    });

    return {
      ...toRefs(state),
      attrs,
      onClick,
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
    width: 112px;
    height: 38px;
    border-radius: 0 2px 2px 0;
  }
}
</style>
