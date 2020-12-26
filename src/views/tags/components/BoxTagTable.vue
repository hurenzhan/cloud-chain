<template>
  <div>
    <Table
      rowKey="id"
      :columns="columns"
      @change="handleTableChange"
      :data-source="tableData && tableData.pageInfo"
      :pagination="{
        current: searchCondition && searchCondition.pageNo,
        pageSize: searchCondition && searchCondition.pageSize,
        change: handlePagination,
        total: tableData && tableData.total,
        showTotal: () => `共 ${tableData && tableData.total} 条`,
        showSizeChanger: true,
        showQuickJumper: true,
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { Table } from 'ant-design-vue';
import mapStore from '@/libs/mapStore';
import { pageBack } from '@/libs/utils';
import { RecordType } from '@/types/common';
import { SearchConditionType, TableData } from '@/store/module/tags/tagTab';

interface StateType {
  visible: boolean;
  searchCondition: SearchConditionType;
  tableData: TableData;
}

interface ModelRefType {
  name: string;
}

const columns: RecordType[] = [
  {
    title: '箱码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '客户订单号',
    dataIndex: 'order',
    key: 'order',
  },
  {
    title: '批次号',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '装箱人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '装箱时间',
    dataIndex: 'date',
    key: 'date',
  },
];

export default defineComponent({
  components: {
    Table,
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('tagTab');
    const { activeKey, searchConditions, tableDatas } = getState([
      'activeKey',
      'searchConditions',
      'tableDatas',
    ]);

    const { fetchBoxList } = getActions(['fetchBoxList']);
    // 组件数据
    const state: StateType = reactive({
      visible: false,
      searchCondition: searchConditions.value[activeKey.value],
      tableData: tableDatas.value[activeKey.value],
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      state.searchCondition.pageNo = pagination.current;
      state.searchCondition.pageSize = pagination.pageSize;
      fetchBoxList(state.searchCondition);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 生命周期
    onMounted(() => {
      console.log(activeKey.value, 'BoxTagTable');
      fetchBoxList(state.searchCondition);
    });

    return {
      ...toRefs(state),
      columns,
      pageBack,
      handlePagination,
      handleTableChange,
    };
  },
});
</script>