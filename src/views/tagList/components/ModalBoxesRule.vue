<template>
  <Modal title="添加数据项" @ok="handleAddDataItem" @cancel="resetFields">
    <Form :label-col="labelCol" :wrapper-col="wrapperCol">
      <FormItem label="数据项名称" :="validateInfos.name">
        <Input v-model:value="modelRef.name" placeholder="请输入" />
      </FormItem>
      <FormItem label="箱码规则" :="validateInfos.boxesRule">
        <Select v-model:value="modelRef.boxesRule" placeholder="请选择">
          <Option :value="1">1</Option>
          <Option :value="2">2</Option>
        </Select>
      </FormItem>
      <FormItem label="装箱条件" :="validateInfos.boxesCondition">
        <Select
          mode="multiple"
          v-model:value="modelRef.boxesCondition"
          placeholder="请选择"
        >
          <Option :value="1">1</Option>
          <Option :value="2">2</Option>
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
  boxesRule: string | null;
  boxesCondition: string[];
}

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
      boxesRule: null,
      boxesCondition: [],
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: '数据项名称不能为空！',
        },
      ],
      boxesRule: [
        {
          required: true,
          message: '箱码规则不能为空！',
        },
      ],
      boxesCondition: [
        {
          required: true,
          message: '装箱条件不能为空！',
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
