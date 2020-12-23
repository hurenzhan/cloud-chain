<template>
  <Modal title="添加数据项" @ok="handleAddDataItem" @cancel="resetFields">
    <Form :label-col="labelCol" :wrapper-col="wrapperCol">
      <FormItem label="规则名称" :="validateInfos.name">
        <Input v-model:value="modelRef.name" placeholder="请输入" />
      </FormItem>
      <FormItem label="常量前缀" :="validateInfos.prefix">
        <Input v-model:value="modelRef.prefix" placeholder="请输入" />
      </FormItem>
      <FormItem label="常量前缀">
        <Group name="radioGroup" v-model:value="modelRef.date">
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
        <Group name="radioGroup" v-model:value="modelRef.order">
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
          @change="
            (e) => handleRadioChange(e.target.value, 'serialNumberLength')
          "
          v-model:value="modelRef.serialNumber"
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
      <FormItem label="流水号长度" :="validateInfos.serialNumberLength">
        <Input
          v-model:value="modelRef.serialNumberLength"
          :disabled="!modelRef.serialNumber"
          placeholder="请输入"
        />
      </FormItem>
      <FormItem label="随机码">
        <Group
          name="radioGroup"
          @change="(e) => handleRadioChange(e.target.value, 'randomCodeLength')"
          v-model:value="modelRef.randomCode"
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
      <FormItem label="随机码长度" :="validateInfos.randomCodeLength">
        <Input
          v-model:value="modelRef.randomCodeLength"
          :disabled="!modelRef.randomCode"
          placeholder="请输入"
        />
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue';
import { Modal, Form, Input, Radio } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import { pageBack } from '@/libs/utils';

const { Item: FormItem } = Form;
const { Group } = Radio;

interface ModelRefType {
  name: string;
  prefix: string;
  date: number;
  order: number;
  serialNumber: number;
  serialNumberLength: string;
  randomCode: number;
  randomCodeLength: string;
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
    // 表单
    const modelRef: ModelRefType = reactive({
      name: '',
      prefix: '',
      date: 1,
      order: 1,
      serialNumber: 1,
      serialNumberLength: '',
      randomCode: 1,
      randomCodeLength: '',
    });

    const validatorSerialNumber = async (rule: any, value: any) => {
      const isInput = modelRef.serialNumber;
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
      const isInput = modelRef.randomCode;
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
      serialNumberLength: [
        {
          validator: validatorSerialNumber,
        },
      ],
      randomCodeLength: [
        {
          validator: validatorRandomCode,
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );

    const handleRadioChange = (
      value: string,
      cleanKey: 'serialNumberLength' | 'randomCodeLength'
    ) => {
      if (!value) {
        validate(cleanKey);
        modelRef[cleanKey] = '';
      }
    };

    // 处理数据项创建
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
      resetFields,
      validateInfos,
      handleAddDataItem,
      handleRadioChange,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      options,
    };
  },
});
</script>