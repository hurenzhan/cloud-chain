<template>
  <div class="invoices__content">
    <Space direction="vertical" :size="20" class="ln-w-100">
      <Row type="flex" justify="end" align="middle">
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
            :data-source="tableData.pageInfo"
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
            <template #action="{}">
              <Space :size="8">
                <a @click="tableAction.make"> 制作标签 </a>
                <a @click="tableAction.reset"> 重制标签 </a>
                <a @click="tableAction.print"> 打印标签 </a>
                <a @click="tableAction.boxes"> 装箱 </a>
              </Space>
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

interface StateType {
  visible: boolean;
}

interface ModelRefType {
  name: string;
}

const columns: RecordType[] = [
  {
    title: '单据号',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '创建人',
    dataIndex: 'createName',
    key: 'createName',
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '操作',
    key: 'action',
    width: 260,
    slots: { customRender: 'action' },
  },
];

export default defineComponent({
  name: 'InvoicesList',

  components: {
    Row,
    Col,
    Button,
    Table,
    Space,
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('invoicesList');
    const { searchCondition, tableData } = getState([
      'searchCondition',
      'tableData',
    ]);
    const { fetchInvoicesList } = getActions(['fetchInvoicesList']);
    // 组件数据
    const state: StateType = reactive({
      visible: false,
    });
    //表格方法
    const tableAction = reactive({
      make() {
        console.log('make');
      },
      reset() {
        console.log('reset');
      },
      print() {
        console.log('edit');
      },
      boxes() {
        console.log('boxes');
      },
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      searchCondition.value.pageNo = pagination.current;
      fetchInvoicesList(searchCondition.value);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 生命周期
    onMounted(() => {
      console.log('tab 1');
      fetchInvoicesList();
    });

    return {
      ...toRefs(state),
      columns,
      tableData,
      pageBack,
      searchCondition,
      handlePagination,
      tableAction,
      handleTableChange,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
  },
});
</script>