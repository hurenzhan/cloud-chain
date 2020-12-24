<template>
  <div class="search-form__content">
    <Form ref="formRef" :model="domains">
      <FormItem
        v-for="(value, key, index) in domains"
        :key="key"
        :label="index === 0 ? 'Domains' : ''"
        :name="key"
        :rules="[
          {
            required: true,
            message: 'domain can not be null',
            trigger: 'change',
          },
        ]"
      >
        <Input
          v-model:value="domains[key]"
          placeholder="please input domain"
          style="width: 60%; margin-right: 8px"
        />
        <MinusCircleOutlined
          v-if="domains.length > 1"
          class="dynamic-delete-button"
          :disabled="domains.length === 1"
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
        <Button style="margin-left: 10px" @click="resetForm('dynamicValidateForm')">
          Reset
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, toRaw } from "vue";
import { Form, Input, Button } from "ant-design-vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";

const { Item: FormItem } = Form;

export default defineComponent({
  name: "searchForm",

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
      domains: {},
    });

    const submitForm = () => {
      console.log(formRef, "formRef");

      formRef.value
        .validate()
        .then(() => {
          console.log("values", toRaw(state.domains));
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const removeDomain = (item: any) => {
      const index = state.domains.indexOf(item);
      if (index !== -1) {
        state.domains.splice(index, 1);
      }
    };
    const addDomain = () => {
      // state.domains.push({
      //   value: '',
      //   key: Date.now(),
      // });
      state.domains[Date.now()] = null;
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
