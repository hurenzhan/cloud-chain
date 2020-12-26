<template>
  <div class="tag-list__content">
    <Space direction="vertical" :size="24" class="ln-w-100">
      <SearchForm
        :onSearch="handleSearch"
        :onReset="handleReset"
        :formData="formData"
      />
      <Tabs @change="handleTabChange">
        <TabPane key="commodity" tab="商品标签">
          <CommodityTagTable />
        </TabPane>
        <TabPane key="box1" tab="装箱标签">
          <BoxTagTable />
        </TabPane>
        <TabPane key="box2" tab="装箱标签">
          <BoxTagTable />
        </TabPane>
      </Tabs>
    </Space>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue';
import mapStore from '@/libs/mapStore';
import { Space, Tabs } from 'ant-design-vue';
import SearchForm from '@/components/searchForm/SearchForm.vue';
import { FormItemType, FORM_ITEM_ENUM } from '@/components/searchForm/types';
import { RecordType } from '@/types/common';
import CommodityTagTable from './components/CommodityTagTable.vue';
import BoxTagTable from './components/BoxTagTable.vue';

const { TabPane } = Tabs;

interface FormStateType {
  formData: FormItemType[];
}

export default defineComponent({
  name: 'tagList',

  components: {
    SearchForm,
    Tabs,
    TabPane,
    Space,
    CommodityTagTable,
    BoxTagTable,
  },

  setup() {
    // 数据流
    const { getMutations } = mapStore('tagTab');
    const { save } = getMutations(['save']);
    // 组件数据
    const formState = reactive<FormStateType>({
      formData: [
        {
          type: FORM_ITEM_ENUM.INPUT,
          key: 'id',
          label: '商品',
          widgetAttrs: {
            placeholder: '请输入',
          },
        },
        {
          type: FORM_ITEM_ENUM.INPUT,
          key: 'order',
          label: '单号',
          widgetAttrs: {
            placeholder: '请输入',
          },
        },
      ],
    });

    // 表格
    const handleSearch = (modelRef: RecordType) => {
      console.log(modelRef, 'handleSearch');
    };

    const handleReset = (modelRef: RecordType) => {
      console.log(modelRef, 'handleReset');
    };

    const handleTabChange = (key: string) => {
      save({ activeKey: key });
    };

    // 生命周期
    onMounted(() => {
      console.log('tab 2');
    });

    return {
      ...toRefs(formState),
      handleSearch,
      handleReset,
      handleTabChange,
    };
  },
});
</script>
