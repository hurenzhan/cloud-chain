<template>
  <div class="login__input-pass">
    <Password :type="inputType" size="large" :="attrs" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { Input } from 'ant-design-vue';

const { Password } = Input;

interface StateType {
  visible: boolean;
  inputType: string;
}

export default defineComponent({
  name: 'passInput',
  inheritAttrs: false,
  components: {
    Password,
  },
  setup(props, { attrs }) {
    const state: StateType = reactive({
      visible: false,
      inputType: computed(() => (state.visible ? 'text' : 'password')),
    });

    const handleSwitchDisplay = () => {
      state.visible = !state.visible;
    };

    return {
      ...toRefs(state),
      attrs,
      handleSwitchDisplay,
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.login__input-pass {
  position: relative;
  width: @login-input-width;
  .ant-input-password {
    border: none;
  }
}
</style>
