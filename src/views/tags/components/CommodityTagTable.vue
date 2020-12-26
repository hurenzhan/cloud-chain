<template>
  <div>
    <Space direction="vertical" :size="20" class="ln-w-100">
      <Row type="flex" justify="start" align="middle">
        <Col>
          <Button type="primary" @click="visible = true">新增单据</Button>
        </Col>
      </Row>
      <Row class="ln-w-100">
        <Col span="24">
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
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { Row, Col, Button, Table, Space } from 'ant-design-vue';
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
    title: '标签',
    dataIndex: 'tagId',
    key: 'tagId',
  },
  {
    title: 'partID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '客户名称',
    dataIndex: 'name',
    key: 'name',
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
    title: '商品编码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    slots: { customRender: 'status' },
  },
];

export default defineComponent({
  components: {
    Row,
    Col,
    Button,
    Table,
    Space,
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('tagTab');
    const { activeKey, searchConditions, tableDatas } = getState([
      'activeKey',
      'searchConditions',
      'tableDatas',
    ]);
    const { fetchCommodityList } = getActions(['fetchCommodityList']);
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
      fetchCommodityList(state.searchCondition);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 生命周期
    onMounted(() => {
      fetchCommodityList(state.searchCondition);
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