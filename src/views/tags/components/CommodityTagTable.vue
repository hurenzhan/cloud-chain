<template>
  <div>
    <Space direction="vertical" :size="20" class="ln-w-100">
      <!-- <Row type="flex" justify="start" align="middle">
        <Col>
          <Button type="primary" @click="visible = true">新增单据</Button>
        </Col>
      </Row> -->
      <Row class="ln-w-100">
        <Col span="24">
          <Table
            rowKey="id"
            :columns="columns"
            :loading="loading"
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
          >
            <template #status="{ text }">
              <span> {{ text }} </span>
            </template>
          </Table>
        </Col>
      </Row>
    </Space>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect, computed } from 'vue';
import { Row, Col, Table, Space } from 'ant-design-vue';
import mapStore from '@/libs/mapStore';
import { pageBack } from '@/libs/utils';
import { RecordType } from '@/types/common';
import { SearchConditionType } from '@/store/module/tags/tagTab';
import { LabePaginate } from '@/types/tagPackage';
import { FORM_ITEM_ENUM } from '@/components/searchForm/types';

interface StateType {
  visible: boolean;
  searchCondition: SearchConditionType;
  tableData: LabePaginate;
  columns: RecordType[];
}

interface ModelRefType {
  name: string;
}

// const initColumns: any[] = [
//   {
//     title: '是否装箱',
//     key: 'status',
//     dataIndex: 'status',
//     slots: { customRender: 'status' },
//   },
// ];

export default defineComponent({
  props: {
    tagId: {
      type: Number,
      required: true,
    },
  },

  inheritAttrs: false,

  components: {
    Row,
    Col,
    // Button,
    Table,
    Space,
  },

  setup(props) {
    // 数据流
    const { getState, getActions } = mapStore('tagTab');
    const {
      activeKey,
      searchConditions,
      tableDatas,
      loadings,
      formDatas,
    } = getState([
      'activeKey',
      'searchConditions',
      'tableDatas',
      'loadings',
      'formDatas',
    ]);
    const { fetchLabelList } = getActions(['fetchLabelList']);
    // 组件数据
    const state: StateType = reactive({
      visible: false,
      searchCondition: computed(() => searchConditions.value[props.tagId]),
      tableData: computed(() => tableDatas.value[props.tagId]),
      columns: [],
      loading: computed(() => loadings.value[props.tagId]),
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      state.searchCondition.pageNo = pagination.current;
      state.searchCondition.pageSize = pagination.pageSize;
      fetchLabelList(state.searchCondition);
    };

    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    watchEffect(() => {
      if (state.tableData && !state.columns.length) {
        const { headers } = state.tableData;
        state.columns = headers?.map((key) => ({
          title: key,
          dataIndex: key,
          key,
        }));
        formDatas.value[props.tagId] = headers?.map((key) => ({
          type: FORM_ITEM_ENUM.INPUT,
          key,
          label: key,
          widgetAttrs: {
            placeholder: '请输入',
          },
        }));
        // state.columns = (dynamicColumns || []).concat(initColumns);
      }
    });

    return {
      ...toRefs(state),
      activeKey,
      pageBack,
      handlePagination,
      handleTableChange,
    };
  },
});
</script>