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
          <FormItem v-bind="validateInfos.pass">
            <VerificationCodeInput
              v-model:value="modelRef.verificationCode"
              @blur="validate('pass', { trigger: 'blur' }).catch(() => {})"
              @handleCountdown="getVerificationCode"
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
    });
    const rulesRef = reactive({
      phone: [
        {
          required: true,
          message: 'Please input Activity phone',
        },
        {
          min: 3,
          max: 5,
          message: 'Length should be 3 to 5',
          trigger: 'blur',
        },
      ],
      verificationCode: [
        {
          required: true,
          message: 'Please select berificationCode',
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

    const getVerificationCode = () => {
      console.log(1);
      return 2;
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
