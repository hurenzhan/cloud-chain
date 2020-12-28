<template>
  <div class="ln-position-absolute-center">
    <h2 class="ln-mb-20">云标签</h2>
    <Form>
      <FormItem v-bind="validateInfos.phoneNo">
        <TextInput
          v-model:value="modelRef.phoneNo"
          @blur="validate('phoneNo', { trigger: 'blur' }).catch(() => {})"
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
      <FormItem v-bind="validateInfos.newPwd">
        <PassInput
          v-model:value="modelRef.newPwd"
          @blur="validate('newPwd', { trigger: 'blur' }).catch(() => {})"
          placeholder="请输入密码"
          autocomplete="off"
        />
      </FormItem>
      <FormItem v-bind="validateInfos.password">
        <PassInput
          v-model:value="modelRef.password"
          @blur="validate('password', { trigger: 'blur' }).catch(() => {})"
          placeholder="请确认密码"
          autocomplete="off"
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
import { defineComponent, reactive } from 'vue';
import { Form, Button, notification } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import PassInput from './components/PassInput.vue';
import TextInput from './components/TextInput.vue';
import VerificationCodeInput from './components/VerificationCodeInput.vue';
import SubmitButton from './components/SubmitButton.vue';
import { regs } from '@/libs/utils';
import { RecordType } from '@/types/common';
import { fetchCaptcha, loginDispatch } from '@/service/login';
import { useRouter } from 'vue-router';

const { Item: FormItem } = Form;

interface StateType {
  phoneNo: string;
  name: string | number;
  newPwd: string | number;
  password: string | number;
  captcha: number | null;
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
    // 组件数据
    const modelRef: StateType = reactive({
      phoneNo: '',
      name: '',
      newPwd: '',
      password: '',
      captcha: null,
    });
    const router = useRouter();

    const validatePass = async (rule: RecordType, value: any) => {
      if (modelRef.newPwd !== value) {
        return Promise.reject('两次输入密码不一致');
      }
      return Promise.resolve();
    };

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
      name: [
        {
          required: true,
          message: '用户名不能为空',
        },
      ],
      newPwd: [
        {
          required: true,
          message: '密码不能为空',
        },
      ],
      password: [
        {
          required: true,
          message: '确认密码不能为空',
        },
        {
          trigger: 'blur',
          validator: validatePass,
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
      validate()
        .then(async () => {
          loginDispatch.use('register', { ...modelRef }).then(() => {
            notification.success({
              message: '注册成功',
            });
            router.push('/login');
          });
        })
        .catch((err) => {
          console.log('error', err);
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
        fetchCaptcha({ phoneNo });
        return true;
      }
      return false;
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
