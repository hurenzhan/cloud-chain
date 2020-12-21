<template>
  <div class="login__input-pass">
    <Input :type="inputType" size="large" :="attrs" />
    <div class="login__input-pass-icon ln-cursor-pointer">
      <EyeOutlined v-if="visible" @click="handleSwitchDisplay" />
      <EyeInvisibleOutlined v-else @click="handleSwitchDisplay" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { Input } from 'ant-design-vue';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue';

interface StateType {
  visible: boolean;
  inputType: string;
}

export default defineComponent({
  name: 'passInput',
  inheritAttrs: false,
  components: {
    Input,
    EyeOutlined,
    EyeInvisibleOutlined,
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
  .ant-input {
    border: none;
    padding-right: 32px;
  }
  &-icon {
    position: absolute;
    top: 0;
    right: 14px;
  }
}
</style>
