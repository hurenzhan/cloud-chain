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
          <Button type="primary" @click="visible = true">创建标签</Button>
        </Col>
      </Row>
      <Row class="ln-w-100">
        <Col span="24">
          <Table
            rowKey="id"
            :loading="loading"
            :columns="columns"
            @change="handleTableChange"
            :data-source="tagPageData.pageInfo"
            :pagination="{
              current: searchCondition.pageNo,
              pageSize: searchCondition.pageSize,
              change: handlePagination,
              total: tagPageData.total,
              showTotal: () => `共 ${tagPageData.total} 条`,
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
                <a @click="tableAction.edit(record)">编辑</a>
                <router-link
                  :to="`/tagList/dataItem?parentTagId=${record.parentTagId}&tagId=${record.id}`"
                  >数据项</router-link
                >
                <router-link
                  :to="`/tagList/boxesRule?parentTagId=${record.parentTagId}&tagId=${record.id}`"
                  >装箱规则</router-link
                >
                <router-link to="/tagList/printTemplate">打印模板</router-link>
                <a @click="tableAction.handleStatus(record)">
                  {{ record.status ? '禁用' : '启用' }}
                </a>
              </Space>
            </template>
          </Table>
        </Col>
      </Row>
    </Space>
    <Modal
      v-model:visible="visible"
      :title="`${modelRef.id ? '编辑' : '创建'}标签`"
      :confirmLoading="loadingAction"
      destroyOnClose
      @ok="handleCreateTag"
      @cancel="handleCancel"
    >
      <Form :label-col="labelCol" :wrapper-col="wrapperCol">
        <FormItem label="标签名称" :="validateInfos.name">
          <Input v-model:value="modelRef.name" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  toRaw,
  onMounted,
  watchEffect,
} from 'vue';
import {
  Row,
  Col,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
} from 'ant-design-vue';
import { LeftOutlined } from '@ant-design/icons-vue';
import { useForm } from '@ant-design-vue/use';
import mapStore from '@/libs/mapStore';
import { pageBack, findDict } from '@/libs/utils';
import { RecordType } from '@/types/common';
import { TagInfo } from '@/types/tagPackage';
import { ACTIVE_DICT } from '@/libs/dicts';

const { Item: FormItem } = Form;

interface StateType {
  visible: boolean;
}

interface ModelRefType {
  id: number | null;
  name: string;
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标签名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '创建人',
    key: 'createName',
    dataIndex: 'createName',
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
    width: 274,
    slots: { customRender: 'action' },
  },
];

export default defineComponent({
  name: 'tagList',

  components: {
    Row,
    Col,
    Button,
    LeftOutlined,
    Table,
    Space,
    Modal,
    Form,
    FormItem,
    Input,
  },

  setup() {
    // 数据流
    const { getState, getMutations, getActions } = mapStore('tagList');
    const {
      searchCondition,
      tagPageData,
      loading,
      loadingAction,
      actionItem,
    } = getState([
      'searchCondition',
      'tagPageData',
      'loading',
      'loadingAction',
      'actionItem',
    ]);
    const { save } = getMutations(['save']);
    const { fetchTagPage, fetchAction } = getActions([
      'fetchTagPage',
      'fetchAction',
    ]);
    // 组件数据
    const state: StateType = reactive({
      visible: false,
    });
    // 表单
    const modelRef: ModelRefType = reactive({
      id: null,
      name: '',
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: '标签名称不能为空！',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );

    watchEffect(() => {
      if (actionItem.value) {
        Object.assign(modelRef, actionItem.value);
      }
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      searchCondition.value.pageNo = pagination.current;
      searchCondition.value.pageSize = pagination.pageSize;
      fetchTagPage(searchCondition.value);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };
    //表格方法
    const tableAction = reactive({
      edit(record: TagInfo) {
        const { id, name } = record;
        save({ actionItem: { id, name } });
        state.visible = true;
      },
      async handleStatus(record: TagInfo) {
        const { id, status } = record;
        await fetchAction({ id, status: 1 ^ status });
        fetchTagPage(searchCondition.value);
      },
    });
    // 处理标签创建
    const handleCreateTag = () => {
      validate().then(async () => {
        const params = {
          ...toRaw(modelRef),
          status: 1,
          type: 0,
          packageRuleId: 0,
          packageRuleName: '',
        };
        const isCreate = await fetchAction(params);
        if (isCreate) {
          resetFields();
          state.visible = false;
          fetchTagPage(searchCondition.value);
        }
      });
    };

    const handleCancel = () => {
      if (actionItem) save({ actionItem: undefined });
      resetFields();
    };

    // 生命周期
    onMounted(() => {
      fetchTagPage(searchCondition.value);
    });

    return {
      ...toRefs(state),
      columns,
      tagPageData,
      pageBack,
      modelRef,
      handleCancel,
      validateInfos,
      searchCondition,
      handlePagination,
      handleTableChange,
      handleCreateTag,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      loading,
      loadingAction,
      tableAction,
      findDict,
      ACTIVE_DICT,
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
