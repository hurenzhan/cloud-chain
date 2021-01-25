<template>
  <div class="boxes-rule__content">
    <Space direction="vertical" :size="20" class="ln-w-100">
      <Row type="flex" justify="space-between" align="middle">
        <Col
          ><Button @click="pageBack">
            <template #icon><LeftOutlined /></template>返回
          </Button>
        </Col>
        <Col>
          <Button type="primary" @click="handleAdd">新增</Button>
        </Col>
      </Row>
      <Row class="ln-w-100">
        <Col span="24">
          <Table
            rowKey="id"
            :loading="loading"
            :columns="columns"
            @change="handleTableChange"
            :data-source="packageRulePageData.pageInfo"
            :pagination="{
              current: searchCondition.pageNo,
              pageSize: searchCondition.pageSize,
              change: handlePagination,
              total: packageRulePageData.total,
              showTotal: () => `共 ${packageRulePageData.total} 条`,
              showSizeChanger: true,
              showQuickJumper: true,
            }"
          >
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
    <ModalBoxesRule ref="modelRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { Row, Col, Button, Table, Space } from 'ant-design-vue';
import { LeftOutlined } from '@ant-design/icons-vue';
import mapStore from '@/libs/mapStore';
import { pageBack, findDict } from '@/libs/utils';
import { RecordType } from '@/types/common';
import ModalBoxesRule from './components/ModalBoxesRule.vue';
import { PackageRuleInfo } from '@/types/tagPackage';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import { ACTIVE_DICT } from '@/libs/dicts';

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
    title: '规则名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '装箱条件',
    dataIndex: 'tagItemNameStr',
    key: 'tagItemNameStr',
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
  name: 'boxesRule',

  components: {
    Row,
    Col,
    Button,
    LeftOutlined,
    Table,
    Space,
    ModalBoxesRule,
  },

  setup() {
    const {
      query: { tagId },
    }: RouteLocationNormalizedLoaded = useRoute();
    const modelRef: any = ref(null);
    // 数据流
    const { getState, getMutations, getActions } = mapStore('boxesRule');
    const { searchCondition, packageRulePageData, loading } = getState([
      'searchCondition',
      'packageRulePageData',
      'loading',
      'actionItem',
    ]);
    const { save } = getMutations(['save']);
    const {
      fetchPackageRulePage,
      fetchAction,
      fetchPackageCodeRulePage,
      fetchTagDataItemList,
    } = getActions([
      'fetchPackageRulePage',
      'fetchAction',
      'fetchPackageCodeRulePage',
      'fetchTagDataItemList',
    ]);

    searchCondition.value.tagId = tagId;

    //表格方法
    const tableAction = reactive({
      edit(record: PackageRuleInfo) {
        const { id, name, packageRuleId, tagItemIdStr } = record;
        save({
          actionItem: {
            id,
            name,
            packageRuleId,
            tagItemIdList: tagItemIdStr?.split(',').map((key) => +key),
          },
        });
        modelRef.value.visible = true;
      },
      async handleStatus(record: PackageRuleInfo) {
        const { id, status } = record;
        console.log(id, 'id');

        await fetchAction({ id, status: 1 ^ status });
        fetchPackageRulePage(searchCondition.value);
      },
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      searchCondition.value.pageNo = pagination.current;
      searchCondition.value.pageSize = pagination.pageSize;
      fetchPackageRulePage(searchCondition.value);
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
      fetchPackageRulePage(searchCondition.value);
      fetchPackageCodeRulePage();
      fetchTagDataItemList({ tagId });
    });

    return {
      columns,
      packageRulePageData,
      pageBack,
      searchCondition,
      handlePagination,
      tableAction,
      handleTableChange,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      loading,
      modelRef,
      handleAdd,
      findDict,
      ACTIVE_DICT,
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.boxes-rule__content {
  padding: 50px;
  background: @white;
}
</style>
