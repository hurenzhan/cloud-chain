<template>
  <Modal
    :title="`装箱规则${modelRef.id ? '编辑' : '新增'}`"
    v-model:visible="visible"
    @ok="handleAddDataItem"
    @cancel="handleCancel"
    :confirmLoading="loadingAction"
  >
    <Form :label-col="labelCol" :wrapper-col="wrapperCol">
      <FormItem label="规则名称" :="validateInfos.name">
        <Input v-model:value="modelRef.name" placeholder="请输入" />
      </FormItem>
      <FormItem label="箱码规则" :="validateInfos.packageRuleId">
        <Select v-model:value="modelRef.packageRuleId" placeholder="请选择">
          <Option
            v-for="{ id, name } in packageCodeRulePageData"
            :key="id"
            :value="id"
            >{{ name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="装箱条件" :="validateInfos.tagItemIdList">
        <Select
          mode="multiple"
          v-model:value="modelRef.tagItemIdList"
          placeholder="请选择"
        >
          <Option
            v-for="{ id, name } in tagDataItemList"
            :key="id"
            :value="id"
            >{{ name }}</Option
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
  packageRuleId: number | null;
  tagItemIdList: number[];
  packageRuleName?: string;
  type?: number;
  status?: number;
}

interface StateType {
  visible: boolean;
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
    const {
      query: { tagId, parentTagId },
    }: RouteLocationNormalizedLoaded = useRoute();
    // 数据流
    const { getState, getMutations, getActions } = mapStore('boxesRule');
    const {
      loadingAction,
      searchCondition,
      actionItem,
      packageCodeRulePageData,
      tagDataItemList,
    } = getState([
      'loadingAction',
      'searchCondition',
      'actionItem',
      'packageCodeRulePageData',
      'tagDataItemList',
    ]);
    const { save } = getMutations(['save']);
    const { fetchAction, fetchPackageRulePage } = getActions([
      'fetchAction',
      'fetchPackageRulePage',
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
      packageRuleId: null,
      tagItemIdList: [],
    });

    watchEffect(() => {
      if (actionItem.value) Object.assign(modelRef, actionItem.value);
    });

    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: '数据项名称不能为空！',
        },
      ],
      packageRuleId: [
        {
          required: true,
          message: '箱码规则不能为空！',
          type: 'number',
        },
      ],
      tagItemIdList: [
        {
          required: true,
          message: '装箱条件不能为空！',
          type: 'array',
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
        const params = toRaw(modelRef);
        params.packageRuleName = packageCodeRulePageData?.value?.find(
          ({ id }) => id === params.packageRuleId
        )?.name;
        params.type = 1;
        params.status = 1;
        const isCreate = await fetchAction(toRaw(modelRef));
        if (isCreate) {
          resetFields();
          state.visible = false;
          fetchPackageRulePage(searchCondition.value);
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
      handleCancel,
      loadingAction,
      packageCodeRulePageData,
      tagDataItemList,
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
