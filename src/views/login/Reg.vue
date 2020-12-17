<template>
  <div class="ln-position-absolute-center">
    <h2 class="ln-mb-20">云标签</h2>
    <Form>
      <FormItem v-bind="validateInfos.phone">
        <TextInput
          v-model:value="modelRef.phone"
          @blur="validate('phone', { trigger: 'blur' }).catch(() => {})"
          placeholder="请输入手机号"
        />
      </FormItem>
      <FormItem v-bind="validateInfos.name">
        <TextInput
          v-model:value="modelRef.name"
          @blur="validate('name', { trigger: 'blur' }).catch(() => {})"
          placeholder="请输入用户名"
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
      <FormItem v-bind="validateInfos.checkPass">
        <PassInput
          v-model:value="modelRef.checkPass"
          @blur="validate('checkPass', { trigger: 'blur' }).catch(() => {})"
          placeholder="请确认密码"
          autocomplete="off"
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
          >注册</SubmitButton
        >
      </FormItem>
    </Form>
    <Button type="link" class="ln-p-0"
      ><router-link to="/login">账号密码登录</router-link></Button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue';
import { Form, Button } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import PassInput from './components/PassInput.vue';
import TextInput from './components/TextInput.vue';
import VerificationCodeInput from './components/VerificationCodeInput.vue';
import SubmitButton from './components/SubmitButton.vue';
import { regs } from '@/libs/utils';
import { RecordType } from '@/types/common';

const { Item: FormItem } = Form;

interface StateType {
  phone: number | null;
  name: string | number;
  pass: string | number;
  checkPass: string | number;
  verificationCode: number | null;
}

export default defineComponent({
  name: 'userReg',

  components: {
    Form,
    FormItem,
    TextInput,
    PassInput,
    SubmitButton,
    VerificationCodeInput,
    Button,
  },

  setup() {
    const modelRef: StateType = reactive({
      phone: null,
      name: '',
      pass: '',
      checkPass: '',
      verificationCode: null,
    });

    const validatePass = async (rule: RecordType, value: any) => {
      if (modelRef.pass !== value) {
        return Promise.reject('两次输入密码不一致');
      }
      return Promise.resolve();
    };

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
      name: [
        {
          required: true,
          message: '用户名不能为空',
        },
      ],
      pass: [
        {
          required: true,
          message: '密码不能为空',
        },
      ],
      checkPass: [
        {
          required: true,
          message: '确认密码不能为空',
        },
        {
          trigger: 'blur',
          validator: validatePass,
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
