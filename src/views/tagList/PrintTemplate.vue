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
            <template #id="{ index }">
              <span>{{ index + 1 }}</span>
            </template>
            <template #action>
              <Space :size="8">
                <span>编辑</span>
                <span>设置模板</span>
                <span>启用</span>
              </Space>
            </template>
          </Table>
        </Col>
      </Row>
    </Space>
    <Modal
      v-model:visible="visible"
      title="新增模板"
      @ok="handleCreateTag"
      @cancel="resetFields"
    >
      <Form :label-col="labelCol" :wrapper-col="wrapperCol">
        <FormItem label="模板名称" :="validateInfos.name">
          <Input v-model:value="modelRef.name" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, toRaw } from 'vue';
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
import { pageBack } from '@/libs/utils';
import { RecordType } from '@/types/common';

const { Item: FormItem } = Form;

interface StateType {
  visible: boolean;
}

interface ModelRefType {
  name: string;
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    slots: { customRender: 'id' },
  },
  {
    title: '模板名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
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
  name: 'printTemplate',

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
    const { getState, getActions } = mapStore('printTemplate');
    const { searchCondition, tableData } = getState([
      'searchCondition',
      'tableData',
    ]);
    const { fetchTagList } = getActions(['printTemplate']);
    // 组件数据
    const state: StateType = reactive({
      visible: false,
    });
    // 表单
    const modelRef: ModelRefType = reactive({
      name: '',
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: '模板名称名称不能为空！',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      searchCondition.value.pageNo = pagination.current;
      fetchTagList(searchCondition.value);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };
    // 处理标签创建
    const handleCreateTag = () => {
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .catch((err) => {
          console.log('error', err);
        });
    };

    return {
      ...toRefs(state),
      columns,
      tableData,
      pageBack,
      modelRef,
      resetFields,
      validateInfos,
      searchCondition,
      handlePagination,
      handleTableChange,
      handleCreateTag,
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
