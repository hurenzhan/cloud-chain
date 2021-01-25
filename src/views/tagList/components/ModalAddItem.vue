<template>
  <Modal
    :title="`${modelRef.id ? '编辑' : '添加'}数据项`"
    v-model:visible="visible"
    @ok="handleAddDataItem"
    @cancel="handleCancel"
    :confirmLoading="loadingAction"
  >
    <Form :label-col="labelCol" :wrapper-col="wrapperCol">
      <FormItem label="数据项名称" :="validateInfos.name">
        <Input v-model:value="modelRef.name" placeholder="请输入" />
      </FormItem>
      <FormItem label="是否是主键">
        <Select v-model:value="modelRef.isPrimaryKey" placeholder="请选择">
          <Option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="允许编辑">
        <Select v-model:value="modelRef.isEdit" placeholder="请选择">
          <Option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="必填">
        <Select v-model:value="modelRef.isRequired" placeholder="请选择">
          <Option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="是单据细项">
        <Select v-model:value="modelRef.isItemReceipt" placeholder="请选择">
          <Option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="是否明细项">
        <Select v-model:value="modelRef.isItemDetail" placeholder="请选择">
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
import { defineComponent, reactive, toRaw, toRefs, watchEffect } from 'vue';
import { Modal, Form, Input, Select } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import { pageBack } from '@/libs/utils';
import mapStore from '@/libs/mapStore';
import {
  LocationQueryValue,
  RouteLocationNormalizedLoaded,
  useRoute,
} from 'vue-router';

const { Item: FormItem } = Form;
const { Option } = Select;

interface ModelRefType {
  tagId: string | LocationQueryValue[] | null;
  parentTagId: string | LocationQueryValue[] | null;
  id: number | null;
  name: string;
  isPrimaryKey: number;
  isEdit: number;
  isRequired: number;
  isItemReceipt: number;
  isItemDetail: number;
  status: number;
}

interface StateType {
  visible: boolean;
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
    const {
      query: { tagId, parentTagId },
    }: RouteLocationNormalizedLoaded = useRoute();
    // 数据流
    const { getState, getMutations, getActions } = mapStore('dataItem');
    const { loadingAction, searchCondition, actionItem } = getState([
      'loadingAction',
      'searchCondition',
      'actionItem',
    ]);
    const { save } = getMutations(['save']);
    const { fetchAction, fetchTagDataItemPage } = getActions([
      'fetchAction',
      'fetchTagDataItemPage',
    ]);
    // 组件数据
    const state = reactive<StateType>({
      visible: false,
    });
    // 表单
    const modelRef: ModelRefType = reactive({
      tagId,
      parentTagId,
      id: null,
      name: '',
      isPrimaryKey: 1,
      isEdit: 1,
      isRequired: 1,
      isItemReceipt: 1,
      isItemDetail: 1,
      status: 1,
    });

    watchEffect(() => {
      if (actionItem.value) Object.assign(modelRef, actionItem.value);
    });

    const rulesRef = reactive({
      name: [
        {
          isRequired: true,
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
      validate().then(async () => {
        const isCreate = await fetchAction(toRaw(modelRef));
        if (isCreate) {
          resetFields();
          state.visible = false;
          fetchTagDataItemPage(searchCondition.value);
        }
      });
    };

    const handleCancel = () => {
      if (actionItem) save({ actionItem: undefined });
      resetFields();
    };

    return {
      ...toRefs(state),
      pageBack,
      modelRef,
      validate,
      resetFields,
      validateInfos,
      handleAddDataItem,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      options,
      handleCancel,
      loadingAction,
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
