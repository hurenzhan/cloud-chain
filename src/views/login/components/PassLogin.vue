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
            <PassInput
              v-model:value="modelRef.pass"
              @blur="validate('pass', { trigger: 'blur' }).catch(() => {})"
              placeholder="请输入密码"
              autocomplete="off"
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
import PassInput from './PassInput.vue';
import TextInput from './TextInput.vue';
import SubmitButton from './SubmitButton.vue';
import { regs } from '@/libs/utils';

const { Item: FormItem } = Form;

interface StateType {
  phone: number | null;
  pass: string | number;
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
    const modelRef: StateType = reactive({
      phone: null,
      pass: '',
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
      pass: [
        {
          required: true,
          message: '密码不能为空',
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

    return {
      validate,
      validateInfos,
      modelRef,
      onSubmit,
    };
  },
});
</script>
