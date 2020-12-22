<template>
  <SettingsHeader> 成员管理 </SettingsHeader>
  <Content>
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
          <a @click="tableAction.handleStatus(record.id, record.status)">
            {{ record.status ? '启用' : '禁用' }}
          </a>
          <a @click="tableAction.handleAuthor"> 授权 </a>
        </Space>
      </template>
    </Table>
  </Content>
  <Modal
    v-model:visible="visibleAuthor"
    title="权限授权"
    @ok="handleSubmitAuthor"
    @cancel="resetFields"
  >
    <Form :label-col="labelCol" :wrapper-col="wrapperCol">
      <FormItem label="角色名" :="validateInfos.name">
        <Select v-model:value="modelRef.name" placeholder="请选择">
          <Option :value="1">{{ 1 }}</Option>
          <Option :value="2">{{ 2 }}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  createVNode,
  toRaw,
} from 'vue';
import { Layout, Table, Space, Modal, Form, Select } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import SettingsHeader from './components/SettingsHeader.vue';
import mapStore from '@/libs/mapStore';
import { pageBack } from '@/libs/utils';
import { RecordType } from '@/types/common';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

const { Content } = Layout;
const { confirm } = Modal;
const { Item: FormItem } = Form;
const { Option } = Select;

interface StateType {
  visibleAuthor: boolean;
}

interface ModelRefType {
  name: number | null;
}

const columns: RecordType[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '手机',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
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
  name: 'settingsUser',

  components: {
    Table,
    Space,
    SettingsHeader,
    Content,
    Modal,
    Select,
    Option,
    Form,
    FormItem,
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('settingsUser');
    const { searchCondition, tableData } = getState([
      'searchCondition',
      'tableData',
    ]);
    const { fetchUserList } = getActions(['fetchUserList']);
    // 组件数据
    const state: StateType = reactive({
      visibleAuthor: false,
    });
    //表格方法
    const tableAction = reactive({
      handleStatus(id: number, status: number) {
        console.log(id, status);
        confirm({
          title: '是否启用该成员？',
          icon: createVNode(ExclamationCircleOutlined),
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
        });
      },
      handleAuthor() {
        state.visibleAuthor = true;
      },
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      searchCondition.value.pageNo = pagination.current;
      fetchUserList(searchCondition.value);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 表单
    const modelRef: ModelRefType = reactive({
      name: null,
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: '角色名不能为空！',
          type: 'number',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );

    // 处理标签创建
    const handleSubmitAuthor = () => {
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .catch((err) => {
          console.log('error', err);
        });
    };

    // 生命周期
    onMounted(() => {
      fetchUserList();
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
      handleSubmitAuthor,
      modelRef,
      resetFields,
      validateInfos,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
  },
});
</script>
