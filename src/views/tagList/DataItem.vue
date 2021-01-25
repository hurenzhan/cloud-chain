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
          <Button type="link" @click="handleAdd">+ 添加数据项</Button>
        </Col>
      </Row>
      <Row class="ln-w-100">
        <Col span="24">
          <Table
            rowKey="id"
            :columns="columns"
            @change="handleTableChange"
            :data-source="tagDataItemPage.pageInfo"
            :loading="loading"
            :pagination="{
              current: searchCondition.pageNo,
              pageSize: searchCondition.pageSize,
              change: handlePagination,
              total: tagDataItemPage.total,
              showTotal: () => `共 ${tagDataItemPage.total} 条`,
              showSizeChanger: true,
              showQuickJumper: true,
            }"
          >
            <template #isPrimaryKey="{ text }">
              {{ findDict(IS_DICT, text) }}
            </template>
            <template #isEdit="{ text }">
              {{ findDict(IS_DICT, text) }}
            </template>
            <template #isRequired="{ text }">
              {{ findDict(IS_DICT, text) }}
            </template>
            <template #isItemReceipt="{ text }">
              {{ findDict(IS_DICT, text) }}
            </template>
            <template #isItemDetail="{ text }">
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
    <ModalAddItem ref="modelRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { Row, Col, Button, Table, Space } from 'ant-design-vue';
import { LeftOutlined } from '@ant-design/icons-vue';
import mapStore from '@/libs/mapStore';
import { pageBack, findDict } from '@/libs/utils';
import { RecordType } from '@/types/common';
import ModalAddItem from './components/ModalAddItem.vue';
import { TagDataItemInfo } from '@/types/tagDataItem';
import { IS_DICT, ACTIVE_DICT } from '@/libs/dicts';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

interface StateType {
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
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '是否是主键',
    dataIndex: 'isPrimaryKey',
    key: 'isPrimaryKey',
    slots: { customRender: 'isPrimaryKey' },
  },
  {
    title: '允许编辑',
    dataIndex: 'isEdit',
    key: 'isEdit',
    slots: { customRender: 'isEdit' },
  },
  {
    title: '必填',
    dataIndex: 'isRequired',
    key: 'isRequired',
    slots: { customRender: 'isRequired' },
  },
  {
    title: '是否单据项',
    dataIndex: 'isItemReceipt',
    key: 'isItemReceipt',
    slots: { customRender: 'isItemReceipt' },
  },
  {
    title: '是否明细项',
    dataIndex: 'isItemDetail',
    key: 'isItemDetail',
    slots: { customRender: 'isItemDetail' },
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
    const modelRef: any = ref(null);
    const {
      query: { tagId },
    }: RouteLocationNormalizedLoaded = useRoute();
    // 数据流
    const { getState, getMutations, getActions } = mapStore('dataItem');
    const { searchCondition, tagDataItemPage, loading } = getState([
      'searchCondition',
      'tagDataItemPage',
      'loading',
      'actionItem',
    ]);
    const { save } = getMutations(['save']);
    const { fetchAction, fetchTagDataItemPage } = getActions([
      'fetchAction',
      'fetchTagDataItemPage',
    ]);

    searchCondition.value.tagId = tagId;
    //表格方法
    const tableAction = reactive({
      edit(record: TagDataItemInfo) {
        const {
          id,
          name,
          isPrimaryKey,
          isEdit,
          isRequired,
          isItemReceipt,
          isItemDetail,
          status,
        } = record;
        save({
          actionItem: {
            id,
            name,
            isPrimaryKey,
            isEdit,
            isRequired,
            isItemReceipt,
            isItemDetail,
            status,
          },
        });
        modelRef.value.visible = true;
      },
      async handleStatus(record: TagDataItemInfo) {
        const { id, status } = record;
        await fetchAction({ id, status: 1 ^ status });
        fetchTagDataItemPage(searchCondition.value);
      },
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      searchCondition.value.pageNo = pagination.current;
      searchCondition.value.pageSize = pagination.pageSize;
      fetchTagDataItemPage(searchCondition.value);
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
      fetchTagDataItemPage(searchCondition.value);
    });

    return {
      columns,
      tagDataItemPage,
      pageBack,
      searchCondition,
      handlePagination,
      tableAction,
      handleTableChange,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      handleAdd,
      modelRef,
      findDict,
      IS_DICT,
      ACTIVE_DICT,
      loading,
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
