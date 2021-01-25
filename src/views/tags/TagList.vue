<template>
  <div class="tag-list__content">
    <Space direction="vertical" :size="24" class="ln-w-100">
      <SearchForm
        :onSearch="handleSearch"
        :onReset="handleReset"
        :formData="formData"
      />
      <Tabs @change="handleTabChange">
        <TabPane :key="activeTagItem.id" tab="商品标签">
          <CommodityTagTable :tagId="activeTagItem.id" />
        </TabPane>
        <TabPane v-for="{ id, name } in packageTabList" :key="id" :tab="name">
          <CommodityTagTable :tagId="id" />
        </TabPane>
      </Tabs>
    </Space>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  watchEffect,
  computed,
  watch,
} from 'vue';
import mapStore from '@/libs/mapStore';
import { Space, Tabs } from 'ant-design-vue';
import SearchForm from '@/components/searchForm/SearchForm.vue';
import { FormItemType } from '@/components/searchForm/types';
import { RecordType } from '@/types/common';
import CommodityTagTable from './components/CommodityTagTable.vue';
import { SearchConditionType } from '@/store/module/tags/tagTab';

const { TabPane } = Tabs;

type FormDataType = FormItemType | {};

interface StateType {
  formData: FormItemType | [];
  searchCondition: SearchConditionType;
}

export default defineComponent({
  name: 'tagList',

  components: {
    SearchForm,
    Tabs,
    TabPane,
    Space,
    CommodityTagTable,
  },

  setup() {
    // 数据流
    const { getState, getMutations, getActions } = mapStore('tagTab');
    const {
      activeKey,
      initCondition,
      formDatas,
      searchConditions,
      packageTabList,
    } = getState([
      'activeKey',
      'initCondition',
      'formDatas',
      'searchConditions',
      'packageTabList',
    ]);
    const { save } = getMutations(['save']);
    const { fetchLabelList, fetchPackageTabList } = getActions([
      'fetchLabelList',
      'fetchPackageTabList',
    ]);
    const { getState: navGetState } = mapStore('navigate');
    const { activeTagItem } = navGetState(['activeTagItem']);

    // 组建数据
    const state: StateType = reactive({
      formData: [],
      searchCondition: computed(() => searchConditions.value[activeKey.value]),
    });

    // 表格
    const handleSearch = (modelRef: RecordType) => {
      fetchLabelList({ ...state.searchCondition, ...modelRef, pageNo: 1 });
    };

    const handleReset = (modelRef: RecordType) => {
      fetchLabelList({ ...state.searchCondition, ...modelRef, pageNo: 1 });
    };

    // 切换标签
    const handleTabChange = (key: string) => {
      save({ activeKey: key });
      if (!state.searchCondition)
        fetchLabelList({ ...initCondition.value, tagId: key });
    };

    // 更新搜索栏
    watchEffect(() => {
      if (activeKey.value && formDatas.value[activeKey.value]) {
        const formData = formDatas.value[activeKey.value];
        state.formData = formData;
      } else {
        state.formData = [];
      }
    });

    const handleInitData = () => {
      save({ activeKey: activeTagItem.value.id });
      fetchLabelList({ ...initCondition.value, tagId: activeTagItem.value.id });
      fetchPackageTabList({ parentTagId: activeTagItem.value.id });
    };

    watch(
      () => activeTagItem.value.id,
      () => {
        save({
          searchConditions: {},
          packageTabList: [],
          tableDatas: {},
          loadings: {},
          columnsList: {},
          formDatas: {},
        });
        handleInitData();
      }
    );

    // 生命周期
    onMounted(() => {
      handleInitData();
    });

    return {
      ...toRefs(state),
      handleSearch,
      handleReset,
      handleTabChange,
      activeTagItem,
      packageTabList,
    };
  },
});
</script>
