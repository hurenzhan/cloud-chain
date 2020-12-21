<template>
  <div>
    <Row>
      <Col>
        <Form>
          <FormItem v-bind="validateInfos.phone">
            <TextInput
              v-model:value="modelRef.phone"
              @blur="validate('phone', { trigger: 'blur' }).catch(() => {})"
              placeholder="请输入手机号"
            />
          </FormItem>
          <FormItem v-bind="validateInfos.verificationCode">
            <VerificationCodeInput
              v-model:value="modelRef.verificationCode"
              @blur="
                validate('verificationCode', {
                  trigger: 'blur',
                }).catch(() => {})
              "
              :handleCountdown="getVerificationCode"
              placeholder="请输入验证码"
            />
          </FormItem>
          <FormItem>
            <SubmitButton size="large" type="primary" @click="onSubmit"
              >登录</SubmitButton
            >
          </FormItem>
        </Form></Col
      >
    </Row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue';
import { Row, Col, Form } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import TextInput from './TextInput.vue';
import VerificationCodeInput from './VerificationCodeInput.vue';
import SubmitButton from './SubmitButton.vue';
import { regs } from '@/libs/utils';

const { Item: FormItem } = Form;

interface StateType {
  phone: number | null;
  verificationCode: number | null;
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
    const modelRef: StateType = reactive({
      phone: null,
      verificationCode: null,
      isErrPhone: false,
    });

    const rulesRef = reactive({
      phone: [
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
      verificationCode: [
        {
          required: true,
          message: '验证码不能为空',
        },
      ],
    });

    const { validate, validateInfos } = useForm(modelRef, rulesRef);

    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .catch((err) => {
          console.log('error', err);
        });
    };

    const checkPhone = async () => {
      return new Promise((resolve, reject) => {
        validate('phone')
          .then(() => {
            resolve(true);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    const getVerificationCode = async () => {
      const isPhoneFormat = await checkPhone();
      return isPhoneFormat;
    };

    return {
      validate,
      validateInfos,
      modelRef,
      onSubmit,
      getVerificationCode,
    };
  },
});
</script>
