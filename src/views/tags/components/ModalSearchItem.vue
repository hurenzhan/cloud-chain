<template>
  <Modal
    :visible="addItemVisible"
    title="添加查询条件"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
  >
    <Group class="ln-w-100" v-model:value="value">
      <Row :gutter="[8, 16]">
        <Col v-for="item in itemList" :key="item.value" :span="8">
          <Checkbox :value="item.value">{{ item.label }}</Checkbox>
        </Col>
      </Row>
    </Group>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { Modal, Checkbox, Row, Col } from 'ant-design-vue';
import mapStore from '@/libs/mapStore';

const { Group } = Checkbox;

interface StateType {
  value: string[];
}

export default defineComponent({
  components: {
    Modal,
    Checkbox,
    Group,
    Row,
    Col,
  },

  setup() {
    // 数据流
    const { getState, getMutations } = mapStore('printTag');
    const { addItemVisible, itemList, formData } = getState([
      'addItemVisible',
      'itemList',
      'formData',
    ]);
    const { save, handleAddSearchItem } = getMutations([
      'save',
      'handleAddSearchItem',
    ]);
    // 组件状态
    const state = reactive<StateType>({
      value: [],
    });

    const handleOk = () => {
      handleAddSearchItem(state.value);
      save({ addItemVisible: false });
    };

    const handleCancel = () => {
      state.value = formData.value.map(({ key }) => key);
      save({ addItemVisible: false });
    };

    return {
      ...toRefs(state),
      addItemVisible,
      handleOk,
      handleCancel,
      itemList,
      formData,
    };
  },
});
</script>