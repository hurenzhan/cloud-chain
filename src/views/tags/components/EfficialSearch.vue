<template>
  <div class="efficial-search__content">
    <Space direction="vertical" :size="10" class="ln-w-100">
      <Row
        v-for="item in data"
        :key="item.key"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <Col class="ln-font-large">{{ item.label }}</Col>
        <Col class="input__content">
          <Input
            placeholder="请输入"
            v-model:value="modelRef[item.key]"
            @change="onInput"
          />
        </Col>
      </Row>
    </Space>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, PropType } from 'vue';
import { Row, Col, Input, Space } from 'ant-design-vue';
import { RecordType } from '@/types/common';

interface DataType {
  key: string;
  label: string;
}

export type SearchFunction = (modelRef: RecordType) => void;

export default defineComponent({
  name: 'searchForm',

  props: {
    data: {
      type: Array as PropType<DataType[]>,
      required: true,
    },
    onSearch: {
      type: Function as PropType<SearchFunction>,
    },
  },

  inheritAttrs: false,

  components: {
    Row,
    Col,
    Input,
    Space,
  },

  setup(props) {
    // 组件数据库
    const modelRef = reactive<RecordType>({});

    // 初始化
    const initModel = (dataType: DataType[]) => {
      dataType.forEach((item: DataType) => {
        modelRef[item.key] = null;
      });
    };
    initModel(props.data);

    const onInput = () => {
      props.onSearch && props.onSearch(toRaw(modelRef));
    };

    return {
      modelRef,
      onInput,
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.efficial-search__content {
  .input__content {
    margin-left: 20px;
    .ant-input {
      border: none;
      outline: none;
      box-shadow: none;
      border-bottom: 1px solid #d4dae0;
    }
  }
}
</style>
