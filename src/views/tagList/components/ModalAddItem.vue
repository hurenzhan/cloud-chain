<template>
  <Modal title="添加数据项" @ok="handleAddDataItem" @cancel="resetFields">
    <Form :label-col="labelCol" :wrapper-col="wrapperCol">
      <FormItem label="数据项名称" :="validateInfos.name">
        <Input v-model:value="modelRef.name" placeholder="请输入" />
      </FormItem>
      <FormItem label="字段类型">
        <Input disabled v-model:value="modelRef.keyType" />
      </FormItem>
      <FormItem label="允许编辑">
        <Select v-model:value="modelRef.modify" placeholder="请选择">
          <Option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="必填">
        <Select v-model:value="modelRef.required" placeholder="请选择">
          <Option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="是否明细项">
        <Select v-model:value="modelRef.invoicesItem" placeholder="请选择">
          <Option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="是否标签项">
        <Select v-model:value="modelRef.tagItem" placeholder="请选择">
          <Option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="是否单据号">
        <Select v-model:value="modelRef.invoicesCode" placeholder="请选择">
          <Option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="原厂料号">
        <Select v-model:value="modelRef.code" placeholder="请选择">
          <Option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.name }}</Option
          >
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue';
import { Modal, Form, Input, Select } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import { pageBack } from '@/libs/utils';

const { Item: FormItem } = Form;
const { Option } = Select;

interface ModelRefType {
  name: string;
  keyType: string;
  modify: number;
  required: number;
  invoicesItem: number;
  detailsItem: number;
  tagItem: number;
  invoicesCode: number;
  code: number;
}

const options = [
  {
    value: 1,
    name: '是',
  },
  {
    value: 0,
    name: '否',
  },
];

export default defineComponent({
  name: 'addDataItemModal',

  components: {
    Modal,
    Form,
    FormItem,
    Input,
    Select,
    Option,
  },

  setup() {
    // 表单
    const modelRef: ModelRefType = reactive({
      name: '',
      keyType: '测试',
      modify: 1,
      required: 1,
      invoicesItem: 1,
      detailsItem: 1,
      tagItem: 1,
      invoicesCode: 0,
      code: 0,
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: '数据项名称不能为空！',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );

    // 处理标签创建
    const handleAddDataItem = () => {
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .catch((err) => {
          console.log('error', err);
        });
    };

    return {
      pageBack,
      modelRef,
      validate,
      resetFields,
      validateInfos,
      handleAddDataItem,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      options,
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.tag-list__content {
  padding: 50px;
  background: @white;
}
</style>
