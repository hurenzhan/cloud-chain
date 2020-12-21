<template>
  <div class="create-enterprise__content ln-vh-100 ln-vw-100 ln-d-flex ln-flex-xy-center">
    <div>
      <h2 class="ln-mb-20">云标签</h2>
      <h1 class="ln-mb-20">创建并进入企业</h1>
      <Form>
        <FormItem v-bind="validateInfos.name">
          <Input
            v-model:value="modelRef.name"
            @blur="validate('name', { trigger: 'blur' }).catch(() => {})"
            placeholder="企业名称"
            size="large"
          />
        </FormItem>
        <FormItem>
          <SubmitButton size="large" type="primary" @click="onSubmit"
            >进入企业</SubmitButton
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from "vue";
import { Form, Input } from "ant-design-vue";
import { useForm } from "@ant-design-vue/use";
import SubmitButton from "./components/SubmitButton.vue";

const { Item: FormItem } = Form;

interface StateType {
  name: string;
}

export default defineComponent({
  name: "createEnterprise",
  components: {
    Form,
    FormItem,
    Input,
    SubmitButton,
  },
  setup() {
    const modelRef: StateType = reactive({
      name: "",
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: "企业不能为空！",
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
          console.log("error", err);
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

<style lang="less" scoped>
@import "~@/styles/utils";
.create-enterprise__content {
  background: @white;
  .ant-input {
    width: @login-input-width;
  }
}
</style>
