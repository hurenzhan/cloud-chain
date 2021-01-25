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
          <FormItem v-bind="validateInfos.captcha">
            <VerificationCodeInput
              v-model:value="modelRef.captcha"
              @blur="
                validate('captcha', {
                  trigger: 'blur',
                }).catch(() => {})
              "
              :handleCountdown="getVerificationCode"
              placeholder="请输入验证码"
            />
          </FormItem>
          <FormItem>
            <SubmitButton
              size="large"
              type="primary"
              @click="onSubmit"
              :loading="loading"
              >登录</SubmitButton
            >
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
import TextInput from './TextInput.vue';
import VerificationCodeInput from './VerificationCodeInput.vue';
import SubmitButton from './SubmitButton.vue';
import { regs } from '@/libs/utils';
import { fetchCaptcha } from '@/service/login';
import mapStore from '@/libs/mapStore';
import { useRouter } from 'vue-router';

const { Item: FormItem } = Form;

interface StateType {
  phoneNo: number | null;
  captcha: number | null;
}

export default defineComponent({
  name: 'verificationLogin',

  components: {
    Row,
    Col,
    Form,
    FormItem,
    TextInput,
    VerificationCodeInput,
    SubmitButton,
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('login');
    const { loading } = getState(['loading']);
    const { fetchLogin } = getActions(['fetchLogin']);
    // 组件数据
    const modelRef: StateType = reactive({
      phoneNo: null,
      captcha: null,
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
      captcha: [
        {
          required: true,
          message: '验证码不能为空',
        },
      ],
    });

    const { validate, validateInfos } = useForm(modelRef, rulesRef);

    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate().then(async () => {
        const isLogin = fetchLogin({
          ...modelRef,
        });
        if (isLogin) router.push('/home');
      });
    };

    const checkPhone = async () => {
      return new Promise((resolve) => {
        validate('phoneNo')
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      });
    };

    const getVerificationCode = async () => {
      if (await checkPhone()) {
        const { phoneNo } = modelRef;
        const [err] = await fetchCaptcha({ phoneNo });
        return !err;
      }
      return false;
    };

    return {
      validate,
      validateInfos,
      modelRef,
      onSubmit,
      getVerificationCode,
      loading,
    };
  },
});
</script>
