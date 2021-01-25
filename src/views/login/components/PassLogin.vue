<template>
  <div>
    <Row>
      <Col>
        <Form>
          <FormItem v-bind="validateInfos.phoneNo">
            <TextInput
              v-model:value="modelRef.phoneNo"
              @blur="validate('phoneNo', { trigger: 'blur' }).catch(() => {})"
              placeholder="请输入手机号"
            />
          </FormItem>
          <FormItem v-bind="validateInfos.password">
            <PassInput
              v-model:value="modelRef.password"
              @blur="validate('password', { trigger: 'blur' }).catch(() => {})"
              @keyup.enter.prevent="onSubmit"
              placeholder="请输入密码"
              autocomplete="off"
            />
          </FormItem>
          <FormItem>
            <SubmitButton
              size="large"
              type="primary"
              @click="onSubmit"
              :loading="loading"
            >
              登录
            </SubmitButton>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Row, Col, Form } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import PassInput from './PassInput.vue';
import TextInput from './TextInput.vue';
import SubmitButton from './SubmitButton.vue';
import mapStore from '@/libs/mapStore';
import { regs } from '@/libs/utils';
import { RSA } from '@/libs/rsa.js';
import { useRouter } from 'vue-router';

const { Item: FormItem } = Form;

interface StateType {
  phoneNo: string;
  password: string | number;
}

export default defineComponent({
  name: 'passLogin',
  components: {
    Row,
    Col,
    Form,
    FormItem,
    TextInput,
    PassInput,
    SubmitButton,
  },
  setup() {
    // 数据流
    const { getState, getActions } = mapStore('login');
    const { loading } = getState(['loading']);
    const { fetchLogin } = getActions(['fetchLogin']);
    // 组件数据
    const modelRef: StateType = reactive({
      phoneNo: '',
      password: '',
    });
    const router = useRouter();
    const rulesRef = reactive({
      phoneNo: [
        {
          required: true,
          message: '手机号不能为空',
        },
        {
          trigger: 'blur',
          pattern: regs.phone,
          message: '请输入正确的手机格式',
        },
      ],
      password: [
        {
          required: true,
          message: '密码不能为空',
        },
      ],
    });
    const { validate, validateInfos } = useForm(modelRef, rulesRef);
    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate().then(async () => {
        const isLogin = await fetchLogin({
          ...modelRef,
          password: RSA.encrypt(modelRef.password),
        });
        if (isLogin) router.push('/home');
      });
    };

    return {
      validate,
      validateInfos,
      modelRef,
      onSubmit,
      loading,
    };
  },
});
</script>
