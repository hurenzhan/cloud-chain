<template>
  <div class="ln-position-absolute-center">
    <h2 class="ln-mb-20">云标签</h2>
    <PassLogin v-if="loginType === LOGIN_TYPE.PASS" />
    <VerificationLogin v-else />
    <Row type="flex" justify="space-between">
      <Button type="link" class="ln-p-0" @click="handleSwitchLogin">{{
        switchName
      }}</Button>
      <Button type="link" class="ln-p-0"
        ><router-link to="/userReg">注册</router-link></Button
      >
    </Row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { Row, Button } from 'ant-design-vue';
import PassLogin from './components/PassLogin.vue';
import VerificationLogin from './components/VerificationLogin.vue';

enum LOGIN_TYPE {
  PASS,
  DPHONE,
}

interface StateType {
  loginType: number;
  switchName: string;
}

export default defineComponent({
  name: 'login',
  components: {
    PassLogin,
    Row,
    Button,
    VerificationLogin,
  },
  setup() {
    const state: StateType = reactive({
      loginType: LOGIN_TYPE.PASS,
      switchName: computed(() =>
        state.loginType === LOGIN_TYPE.PASS ? '验证码登录' : '账号密码登录'
      ),
    });

    const handleSwitchLogin = () => {
      state.loginType = state.loginType ^ 1;
    };

    return {
      ...toRefs(state),
      handleSwitchLogin,
      LOGIN_TYPE,
    };
  },
});
</script>
