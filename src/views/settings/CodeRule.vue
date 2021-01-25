<template>
  <SettingsHeader>编码规则</SettingsHeader>
  <Content>
    <Space direction="vertical" :size="20" class="ln-w-100">
      <Row type="flex" justify="end" align="middle">
        <Col>
          <Button type="primary" @click="handleAdd">新增</Button>
        </Col>
      </Row>
      <Row class="ln-w-100">
        <Col span="24">
          <Table
            rowKey="id"
            :columns="columns"
            @change="handleTableChange"
            :data-source="codeRuleData.pageInfo"
            :loading="loading"
            :pagination="{
              current: searchCondition.pageNo,
              pageSize: searchCondition.pageSize,
              change: handlePagination,
              total: codeRuleData.total,
              showTotal: () => `共 ${codeRuleData.total} 条`,
              showSizeChanger: true,
              showQuickJumper: true,
            }"
          >
            <template #name="{ text }">
              <span class="name-color">{{ text }}</span>
            </template>
            <template #hasDate="{ text }">
              {{ findDict(IS_DICT, text) }}
            </template>
            <template #hasOrderId="{ text }">
              {{ findDict(IS_DICT, text) }}
            </template>
            <template #hasSerialId="{ text }">
              {{ findDict(IS_DICT, text) }}
            </template>
            <template #hasRandomId="{ text }">
              {{ findDict(IS_DICT, text) }}
            </template>
            <template #status="{ text }">
              <span :class="`active-status-${text}`">{{
                findDict(ACTIVE_DICT, text)
              }}</span>
            </template>
            <template #action="{ record }">
              <Space :size="8">
                <a @click="tableAction.edit(record)"> 编辑 </a>
                <a @click="tableAction.handleStatus(record)">
                  {{ record.status ? '禁用' : '启用' }}
                </a>
              </Space>
            </template>
          </Table>
        </Col>
      </Row>
    </Space>
    <ModalAddRule ref="modelRef" />
  </Content>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { Row, Col, Button, Table, Space, Layout } from 'ant-design-vue';
import mapStore from '@/libs/mapStore';
import { pageBack, findDict } from '@/libs/utils';
import { RecordType } from '@/types/common';
import SettingsHeader from './components/SettingsHeader.vue';
import ModalAddRule from './components/ModalAddRule.vue';
import { IS_DICT, ACTIVE_DICT } from '@/libs/dicts';
import { CodeRuleInfo } from '@/types/codeRule';

const { Content } = Layout;

const columns: RecordType[] = [
  {
    title: '规则名称',
    dataIndex: 'name',
    key: 'name',
    slots: { customRender: 'name' },
  },
  {
    title: '常量前缀',
    dataIndex: 'prefix',
    key: 'prefix',
  },
  {
    title: '日期',
    dataIndex: 'hasDate',
    key: 'hasDate',
    slots: { customRender: 'hasDate' },
  },
  {
    title: '单号',
    dataIndex: 'hasOrderId',
    key: 'hasOrderId',
    slots: { customRender: 'hasOrderId' },
  },
  {
    title: '流水号',
    dataIndex: 'hasSerialId',
    key: 'hasSerialId',
    slots: { customRender: 'hasSerialId' },
  },
  {
    title: '流水号长度',
    dataIndex: 'serialIdSize',
    key: 'serialIdSize',
  },
  {
    title: '随机码',
    dataIndex: 'hasRandomId',
    key: 'hasRandomId',
    slots: { customRender: 'hasRandomId' },
  },
  {
    title: '随机码长度',
    dataIndex: 'randomIdSize',
    key: 'randomIdSize',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    slots: { customRender: 'status' },
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
    SettingsHeader,
  },

  setup() {
    const modelRef: any = ref(null);
    // 数据流
    const { getState, getMutations, getActions } = mapStore('settingsCodeRule');
    const { searchCondition, codeRuleData, loading } = getState([
      'searchCondition',
      'codeRuleData',
      'loading',
    ]);
    const { save } = getMutations(['save']);
    const { fetchCodeRuleList, fetchCodeRuleAction } = getActions([
      'fetchCodeRuleList',
      'fetchCodeRuleAction',
    ]);

    //表格方法
    const tableAction = reactive({
      edit(record: CodeRuleInfo) {
        save({ actionItem: record });
        modelRef.value.visible = true;
      },
      async handleStatus(record: CodeRuleInfo) {
        const { id, status } = record;
        await fetchCodeRuleAction({ id, status: 1 ^ status });
        fetchCodeRuleList(searchCondition.value);
      },
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      searchCondition.value.pageNo = pagination.current;
      searchCondition.value.pageSize = pagination.pageSize;
      fetchCodeRuleList(searchCondition.value);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 处理新增
    const handleAdd = () => {
      modelRef.value.visible = true;
    };
    // 生命周期
    onMounted(() => {
      fetchCodeRuleList(searchCondition.value);
    });

    return {
      columns,
      codeRuleData,
      loading,
      pageBack,
      searchCondition,
      handlePagination,
      tableAction,
      handleTableChange,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      modelRef,
      handleAdd,
      findDict,
      IS_DICT,
      ACTIVE_DICT,
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.name-color {
  color: @primary-color;
}
</style>
