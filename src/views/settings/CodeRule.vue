<template>
  <SettingsHeader> 成员管理 </SettingsHeader>
  <Content>
    <Space direction="vertical" :size="20" class="ln-w-100">
      <Row type="flex" justify="end" align="middle">
        <Col>
          <Button type="primary" @click="visible = true">新增</Button>
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
  </Content>
  <ModalAddRule v-model:visible="visible" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { Row, Col, Button, Table, Space, Layout } from 'ant-design-vue';
import mapStore from '@/libs/mapStore';
import { pageBack } from '@/libs/utils';
import { RecordType } from '@/types/common';
import SettingsHeader from './components/SettingsHeader.vue';
import ModalAddRule from './components/ModalAddRule.vue';

interface StateType {
  visible: boolean;
}

interface ModelRefType {
  name: string;
}

const { Content } = Layout;

const columns: RecordType[] = [
  {
    title: '规则名称',
    dataIndex: 'ruleName',
    key: 'ruleName',
  },
  {
    title: '常量前缀',
    dataIndex: 'prefix',
    key: 'prefix',
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    slots: { customRender: 'date' },
  },
  {
    title: '单号',
    dataIndex: 'order',
    key: 'order',
    slots: { customRender: 'order' },
  },
  {
    title: '流水号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
    slots: { customRender: 'serialNumber' },
  },
  {
    title: '流水号长度',
    dataIndex: 'serialNumberLength',
    key: 'serialNumberLength',
  },
  {
    title: '随机码',
    dataIndex: 'randomCode',
    key: 'randomCode',
    slots: { customRender: 'randomCode' },
  },
  {
    title: '随机码长度',
    dataIndex: 'randomCodeLength',
    key: 'randomCode',
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
  name: 'settingCodeRule',

  components: {
    Row,
    Col,
    Button,
    Table,
    Space,
    ModalAddRule,
    Content,
    SettingsHeader
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('settingsCodeRule');
    const { searchCondition, tableData } = getState([
      'searchCondition',
      'tableData',
    ]);
    const { fetchCodeRuleList } = getActions(['fetchCodeRuleList']);
    // 组件数据
    const state: StateType = reactive({
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
      fetchCodeRuleList(searchCondition.value);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 生命周期
    onMounted(() => {
      fetchCodeRuleList();
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
