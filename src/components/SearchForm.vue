<template>
  <div class="search-form__content">
    <Form ref="formRef" :model="dynamicValidateForm">
      <FormItem
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :label="index === 0 ? 'Domains' : ''"
        :name="['domains', index, 'value']"
        :rules="{
          required: true,
          message: 'domain can not be null',
          trigger: 'change',
        }"
      >
        <Input
          v-model:value="domain.value"
          placeholder="please input domain"
          style="width: 60%; margin-right: 8px"
        />
        <MinusCircleOutlined
          v-if="dynamicValidateForm.domains.length > 1"
          class="dynamic-delete-button"
          :disabled="dynamicValidateForm.domains.length === 1"
          @click="removeDomain(domain)"
        />
      </FormItem>
      <FormItem>
        <Button type="dashed" style="width: 60%" @click="addDomain">
          <PlusOutlined /> Add field
        </Button>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          html-type="submit"
          @click="submitForm('dynamicValidateForm')"
        >
          Submit
        </Button>
        <Button
          style="margin-left: 10px"
          @click="resetForm('dynamicValidateForm')"
        >
          Reset
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, toRaw } from 'vue';
import { Form, Input, Button } from 'ant-design-vue';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';

const { Item: FormItem } = Form;

export default defineComponent({
  name: 'searchForm',

  components: {
    Form,
    FormItem,
    Input,
    Button,
    MinusCircleOutlined,
    PlusOutlined,
  },

  setup() {
    const formRef = ref(Form);
    const state: any = reactive({
      dynamicValidateForm: {
        domains: [],
      },
    });

    const submitForm = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', toRaw(state.dynamicValidateForm.domains));
        })
        .catch((error: any) => {
          console.log('error', error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const removeDomain = (item: any) => {
      const index = state.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        state.dynamicValidateForm.domains.splice(index, 1);
      }
    };
    const addDomain = () => {
      state.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
      });
    };

    return {
      formRef,
      ...toRefs(state),
      submitForm,
      resetForm,
      removeDomain,
      addDomain,
    };
  },
});
</script>
