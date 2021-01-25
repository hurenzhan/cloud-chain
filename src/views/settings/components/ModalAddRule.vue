<template>
  <Modal
    title="编码规则新增"
    v-model:visible="visible"
    @ok="handleAddDataItem"
    @cancel="handleCancel"
    :confirmLoading="loadingAction"
    destroyOnClose
  >
    <Form :label-col="labelCol" :wrapper-col="wrapperCol">
      <FormItem label="规则名称" :="validateInfos.name">
        <Input v-model:value="modelRef.name" placeholder="请输入" />
      </FormItem>
      <FormItem label="常量前缀" :="validateInfos.prefix">
        <Input v-model:value="modelRef.prefix" placeholder="请输入" />
      </FormItem>
      <FormItem label="日期">
        <Group name="radioGroup" v-model:value="modelRef.hasDate">
          <Radio
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.name }}
          </Radio>
        </Group>
      </FormItem>
      <FormItem label="单号">
        <Group name="radioGroup" v-model:value="modelRef.hasOrderId">
          <Radio
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.name }}
          </Radio>
        </Group>
      </FormItem>
      <FormItem label="流水号">
        <Group
          name="radioGroup"
          @change="(e) => handleRadioChange(e.target.value, 'serialIdSize')"
          v-model:value="modelRef.hasSerialId"
        >
          <Radio
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.name }}
          </Radio>
        </Group>
      </FormItem>
      <FormItem label="流水号长度" :="validateInfos.serialIdSize">
        <Input
          v-model:value="modelRef.serialIdSize"
          :disabled="!modelRef.hasSerialId"
          placeholder="请输入"
        />
      </FormItem>
      <FormItem label="随机码">
        <Group
          name="radioGroup"
          @change="(e) => handleRadioChange(e.target.value, 'randomIdSize')"
          v-model:value="modelRef.hasRandomId"
        >
          <Radio
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.name }}
          </Radio>
        </Group>
      </FormItem>
      <FormItem label="随机码长度" :="validateInfos.randomIdSize">
        <Input
          v-model:value="modelRef.randomIdSize"
          :disabled="!modelRef.hasRandomId"
          placeholder="请输入"
        />
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, toRefs, watchEffect } from 'vue';
import { Modal, Form, Input, Radio } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import { pageBack } from '@/libs/utils';
import mapStore from '@/libs/mapStore';

const { Item: FormItem } = Form;
const { Group } = Radio;

interface ModelRefType {
  id?: number | null;
  name: string;
  prefix: string;
  hasDate: number;
  hasOrderId: number;
  hasSerialId: number;
  serialIdSize: string;
  hasRandomId: number;
  randomIdSize: string;
}

interface StateType {
  visible: boolean;
  modelRef: ModelRefType;
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
    Radio,
    Group,
  },

  setup() {
    // 数据流
    const { getState, getMutations, getActions } = mapStore('settingsCodeRule');
    const { loadingAction, searchCondition, actionItem } = getState([
      'loadingAction',
      'searchCondition',
      'actionItem',
    ]);
    const { save } = getMutations(['save']);
    const { fetchCodeRuleAction, fetchCodeRuleList } = getActions([
      'fetchCodeRuleAction',
      'fetchCodeRuleList',
    ]);

    // 组件数据
    const state = reactive<StateType>({
      visible: false,
      modelRef: {
        id: null,
        name: '',
        prefix: '',
        hasDate: 1,
        hasOrderId: 1,
        hasSerialId: 1,
        serialIdSize: '',
        hasRandomId: 1,
        randomIdSize: '',
      },
    });

    watchEffect(() => {
      if (actionItem.value) {
        state.modelRef.id = actionItem.value.id;
        state.modelRef.name = actionItem.value.name;
        state.modelRef.prefix = actionItem.value.prefix;
        state.modelRef.hasDate = actionItem.value.hasDate;
        state.modelRef.hasOrderId = actionItem.value.hasOrderId;
        state.modelRef.hasSerialId = actionItem.value.hasSerialId;
        state.modelRef.serialIdSize = actionItem.value.serialIdSize;
        state.modelRef.hasRandomId = actionItem.value.hasRandomId;
        state.modelRef.randomIdSize = actionItem.value.randomIdSize;
      }
    });

    const validatorSerialNumber = async (rule: any, value: any) => {
      const isInput = state.modelRef.hasSerialId;
      if (!isInput) {
        return Promise.resolve();
      }
      if (value === '' || value === undefined) {
        return Promise.reject('流水号长度不能为空！');
      }
      if (!/^[0-9]+$/g.test(value)) {
        return Promise.reject('只能包含数字！');
      }
      return Promise.resolve();
    };

    const validatorRandomCode = async (rule: any, value: any) => {
      const isInput = state.modelRef.hasRandomId;
      if (!isInput) {
        return Promise.resolve();
      }
      if (value === '' || value === undefined) {
        return Promise.reject('随机码长度不能为空！');
      }
      if (!/^[0-9]+$/g.test(value)) {
        return Promise.reject('只能包含数字！');
      }
      return Promise.resolve();
    };

    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: '规则名称不能为空！',
        },
      ],
      prefix: [
        {
          required: true,
          message: '常量前缀不能为空！',
        },
        {
          pattern: /^[a-zA-Z]+$/g,
          message: '只能包含英文！',
        },
      ],
      serialIdSize: [
        {
          validator: validatorSerialNumber,
        },
      ],
      randomIdSize: [
        {
          validator: validatorRandomCode,
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      state.modelRef,
      rulesRef
    );

    const handleRadioChange = (
      value: string,
      cleanKey: 'serialIdSize' | 'randomIdSize'
    ) => {
      if (!value) {
        validate(cleanKey);
        state.modelRef[cleanKey] = '';
      }
    };

    // 处理数据项创建
    const handleAddDataItem = () => {
      validate().then(async () => {
        const isCreate = await fetchCodeRuleAction(toRaw(state.modelRef));
        if (isCreate) {
          resetFields();
          state.visible = false;
          fetchCodeRuleList(searchCondition.value);
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
      validateInfos,
      handleAddDataItem,
      handleRadioChange,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      options,
      loadingAction,
      handleCancel,
      actionItem,
    };
  },
});
</script>