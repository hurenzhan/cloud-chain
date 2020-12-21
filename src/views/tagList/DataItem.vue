<template>
  <div class="tag-list__content">
    <Space direction="vertical" :size="20" class="ln-w-100">
      <Row type="flex" justify="space-between" align="middle">
        <Col
          ><Button @click="pageBack">
            <template #icon><LeftOutlined /></template>返回
          </Button>
        </Col>
        <Col>
          <Button type="link" @click="visible = true">+ 添加数据项</Button>
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
            <template #action="{ record }">
              <Space :size="8">
                <a @click="tableAction.edit"> 编辑 </a>
                <a @click="tableAction.handleStatus(record.id, record.status)">
                  {{ record.status ? '启用' : '禁用' }}
                </a>
              </Space>
            </template>
          </Table>
        </Col>
      </Row>
    </Space>
    <ModalAddItem v-model:visible="visible" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { Row, Col, Button, Table, Space } from 'ant-design-vue';
import { LeftOutlined } from '@ant-design/icons-vue';
import mapStore from '@/libs/mapStore';
import { pageBack } from '@/libs/utils';
import { RecordType } from '@/types/common';
import ModalAddItem from './components/ModalAddItem.vue';

interface StateType {
  editingKey: string;
  visible: boolean;
}

interface ModelRefType {
  name: string;
}

const columns: RecordType[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '数据项名称',
    dataIndex: 'dataItemName',
    key: 'dataItemName',
  },
  {
    title: '允许编辑',
    dataIndex: 'edit',
    key: 'edit',
    slots: { customRender: 'edit' },
  },
  {
    title: '必填',
    dataIndex: 'required',
    key: 'required',
    slots: { customRender: 'required' },
  },
  {
    title: '字段类型',
    dataIndex: 'keyType',
    key: 'keyType',
  },
  {
    title: '是否单据项',
    dataIndex: 'invoicesItem',
    key: 'invoicesItem',
    slots: { customRender: 'invoicesItem' },
  },
  {
    title: '是否明细项',
    dataIndex: 'detailsItem',
    key: 'detailsItem',
    slots: { customRender: 'detailsItem' },
  },
  {
    title: '是否标签项',
    dataIndex: 'tagItem',
    key: 'tagItem',
    slots: { customRender: 'tagItem' },
  },
  {
    title: '是否单据号',
    dataIndex: 'invoicesCode',
    key: 'invoicesCode',
    slots: { customRender: 'invoicesCode' },
  },
  {
    title: '原厂料号',
    dataIndex: 'code',
    key: 'code',
    slots: { customRender: 'code' },
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
];

export default defineComponent({
  name: 'dataItem',

  components: {
    Row,
    Col,
    Button,
    LeftOutlined,
    Table,
    Space,
    ModalAddItem,
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('dataItem');
    const { searchCondition, tableData } = getState([
      'searchCondition',
      'tableData',
    ]);
    const { fetchDataItemList } = getActions(['fetchDataItemList']);
    // 组件数据
    const state: StateType = reactive({
      editingKey: '',
      visible: false,
    });
    //表格方法
    const tableAction = reactive({
      edit() {
        console.log('edit');
      },
      handleStatus(id: number, status: number) {
        console.log(id, status);
      },
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      searchCondition.value.pageNo = pagination.current;
      fetchDataItemList(searchCondition.value);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 生命周期
    onMounted(() => {
      fetchDataItemList();
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

<style lang="less" scoped>
@import '~@/styles/utils';
.tag-list__content {
  padding: 50px;
  background: @white;
}
</style>
