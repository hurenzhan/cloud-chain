<template>
  <div class="search-form__content">
    <Form ref="formRef" :model="modelRef" layout="inline">
      <Row :gutter="[24, 24]">
        <Col v-for="item in formData" :key="item.key" v-bind="colLayout">
          <FormItem
            :key="item.key"
            :name="item.key"
            :label="item.label"
            :rules="item.options && item.options.rules"
            v-bind="formItemLayout"
          >
            <ItemWidget
              :type="item.type"
              v-model:value="modelRef[item.key]"
              v-bind="item.widgetAttrs"
            />
          </FormItem>
        </Col>
        <Col class="ln-d-flex ln-align-i-center" v-bind="colLayout">
          <Space :size="8">
            <Button type="primary" html-type="submit" @click="submitForm">
              查询
            </Button>
            <Button type="primary" html-type="submit" @click="resetForm">
              重置
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, PropType } from 'vue';
import { Form, Button, Row, Col, Space } from 'ant-design-vue';
import { RecordType } from '@/types/common';
import {
  FormItemType,
  FORM_ITEM_ENUM,
  SearchFunction,
  ResetFunction,
} from './types';
import ItemWidget from './ItemWidget.vue';

const { Item: FormItem } = Form;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const colLayout = {
  xs: 24,
  md: 12,
  xl: 8,
  xxl: 6,
};

export default defineComponent({
  name: 'searchForm',

  props: {
    formData: {
      type: Array as PropType<FormItemType[]>,
      required: true,
    },
    onSearch: {
      type: Function as PropType<SearchFunction>,
    },
    onReset: {
      type: Function as PropType<ResetFunction>,
    },
  },

  inheritAttrs: false,

  components: {
    Form,
    FormItem,
    ItemWidget,
    Button,
    Row,
    Col,
    Space,
  },

  setup(props) {
    // 组件数据库
    const formRef = ref(Form);
    const modelRef = reactive<RecordType>({});

    // 初始化
    const initModel = (formData: FormItemType[]) => {
      formData.forEach((item: FormItemType) => {
        const initialValue = item?.options?.initialValue;
        modelRef[item.key] = initialValue || null;
      });
    };
    initModel(props.formData);

    const submitForm = () => {
      formRef.value
        .validate()
        .then(() => {
          props.onSearch && props.onSearch(toRaw(modelRef));
        })
        .catch((error: any) => {
          console.log('error', error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
      props.onReset && props.onReset(toRaw(modelRef));
    };

    return {
      formRef,
      modelRef,
      submitForm,
      resetForm,
      FORM_ITEM_ENUM,
      formItemLayout,
      colLayout,
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.search-form__content {
  .ant-form-item {
    display: flex;
    .ant-form-item-control {
      flex: 1;
    }
  }
}
</style>
