<template>
  <div class="tag-list__content">
    <Space direction="vertical" :size="20" class="ln-w-100">
      <Row type="flex" justify="space-between" align="middle">
        <Col
          ><Button @click="pageBack">
            <template #icon><LeftOutlined /></template>返回
          </Button>
        </Col>
      </Row>
      <Row class="ln-w-100">
        <Col span="24">
          <Table
            rowKey="id"
            :columns="columns"
            @change="handleTableChange"
            :data-source="tableData.pageInfo"
            :loading="loading"
            :pagination="{
              current: searchCondition.pageNo,
              pageSize: searchCondition.pageSize,
              change: handlePagination,
              total: tableData.total,
              showTotal: () => `共 ${tableData.total} 条`,
              showSizeChanger: true,
              showQuickJumper: true,
            }"
          >
            <template #id="{ index }">
              {{ index + 1 }}
            </template>
          </Table>
        </Col>
      </Row>
    </Space>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue';
import { Row, Col, Button, Table, Space } from 'ant-design-vue';
import { LeftOutlined } from '@ant-design/icons-vue';
import { pageBack } from '@/libs/utils';
import { RecordType } from '@/types/common';
import {
  LocationQueryValue,
  RouteLocationNormalizedLoaded,
  useRoute,
} from 'vue-router';

const columns: RecordType[] = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    slots: { customRender: 'id' },
  },
  {
    title: '客户名称',
    dataIndex: 'numberName',
    key: 'numberName',
  },
  {
    title: '商品名称',
    dataIndex: 'commodityName',
    key: 'commodityName',
  },
  {
    title: '商品编码',
    dataIndex: 'commodityCode',
    key: 'commodityCode',
  },
  {
    title: '数量',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: '最小包装数量',
    dataIndex: 'minNum',
    key: 'minNum',
  },
  {
    title: '下单时间',
    dataIndex: 'buyTime',
    key: 'buyTime',
  },
  {
    title: '出库时间',
    key: 'outTime',
    dataIndex: 'outTime',
  },
];

interface SearchConditionType {
  pageNo: number;
  pageSize: number;
  id: string | LocationQueryValue[] | null;
}

interface StateType {
  searchCondition: SearchConditionType;
  tableData: any;
}

export default defineComponent({
  name: 'invoicesDetail',

  components: {
    Row,
    Col,
    Button,
    LeftOutlined,
    Table,
    Space,
  },

  setup() {
    const {
      query: { id },
    }: RouteLocationNormalizedLoaded = useRoute();

    // 组件数据
    const state = reactive<StateType>({
      searchCondition: {
        pageNo: 1,
        pageSize: 10,
        id,
      },
      tableData: {
        total: 35,
        pageInfo: [
          {
            id: '1',
            code: '1',
            createName: '1',
            createDate: '1',
            status: '1',
          },
          {
            id: '2',
            code: '2',
            createName: '2',
            createDate: '2',
            status: '2',
          },
        ],
      },
    });

    console.log(state);

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      state.searchCondition.pageNo = pagination.current;
      state.searchCondition.pageSize = pagination.pageSize;
      // fetchTagDataItemPage(state.searchCondition);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 生命周期
    // onMounted(() => {});

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

<style lang="less" scoped>
@import '~@/styles/utils';
.tag-list__content {
  padding: 50px;
  background: @white;
}
</style>
