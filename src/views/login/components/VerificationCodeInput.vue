<template>
  <div class="login__input-verification_code">
    <Input size="large" :="attrs" />
    <Button size="large" @click="onClick" type="primary">获取验证码</Button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, PropType } from "vue";
import { Input, Button } from "ant-design-vue";

interface StateType {
  loading: boolean;
}

type HandleCountdownType = () => Promise<any> | (() => void);

export default defineComponent({
  name: "verificationCodeInput",
  inheritAttrs: false,
  components: {
    Input,
    Button,
  },
  // emits: ["handleCountdown"],
  props: {
    handleCountdown: {
      type: Function as PropType<HandleCountdownType>,
      required: true,
    },
  }, //   emits: {
  //     handleCountdown: (val) => {
  //       console.log(val, 'val');
  //       return true;
  //     },
  //   },
  setup(props, { attrs, emit }) {
    const state: StateType = reactive({
      loading: false,
    });
    const onClick = async () => {
      props?.handleCountdown;
      const isNext = await props.handleCountdown();
      if (isNext) {
        console.log(666);
      }
    };

    return {
      ...toRefs(state),
      attrs,
      onClick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "~@/styles/utils";
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
