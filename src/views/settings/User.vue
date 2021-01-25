<template>
  <SettingsHeader> 成员管理 </SettingsHeader>
  <Content>
    <Table
      rowKey="id"
      :loading="loading"
      :columns="columns"
      @change="handleTableChange"
      :data-source="UserPageData.pageInfo"
      :pagination="{
        current: searchCondition.pageNo,
        pageSize: searchCondition.pageSize,
        change: handlePagination,
        total: UserPageData.total,
        showTotal: () => `共 ${UserPageData.total} 条`,
        showSizeChanger: true,
        showQuickJumper: true,
      }"
    >
      <template #roleId="{ text }">
        {{ findDict(IDENTITY_DICT, text) }}
      </template>
      <template #status="{ text }">
        <span :class="`active-status-${text}`">{{
          findDict(ACTIVE_DICT, text)
        }}</span>
      </template>
      <template #action="{ record }">
        <Space :size="8">
          <a @click="tableAction.handleStatus(record)">
            {{ record.status ? '禁用' : '启用' }}
          </a>
          <a @click="tableAction.handleAuthor(record)"> 授权 </a>
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
          <Option
            v-for="{ name, parentRoleId } in roleList"
            :key="parentRoleId"
            :value="parentRoleId"
            >{{ name }}</Option
          >
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
import { pageBack, findDict } from '@/libs/utils';
import { RecordType } from '@/types/common';
import { UserInfo } from '@/types/user';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { ACTIVE_DICT, IDENTITY_DICT } from '@/libs/dicts';

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
    dataIndex: 'phoneNo',
    key: 'phoneNo',
  },
  {
    title: '角色',
    dataIndex: 'roleId',
    key: 'roleId',
    slots: { customRender: 'roleId' },
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
    const { searchCondition, UserPageData, loading, roleList } = getState([
      'searchCondition',
      'UserPageData',
      'loading',
      'roleList',
    ]);
    const { fetchUserList, fetchUserAction, fetchRoleInfo } = getActions([
      'fetchUserList',
      'fetchUserAction',
      'fetchRoleInfo',
    ]);
    // 组件数据
    const state: StateType = reactive({
      visibleAuthor: false,
    });
    //表格方法
    const tableAction = reactive({
      handleStatus(record: UserInfo) {
        const { id: userId, status } = record;
        confirm({
          title: '是否启用该成员？',
          icon: createVNode(ExclamationCircleOutlined),
          async onOk() {
            const isAction = await fetchUserAction({
              userId,
              enabled: 1 ^ status,
            });
            if (!isAction) return false;
            await fetchUserList(searchCondition.value);
            return true;
          },
        });
      },
      handleAuthor(record: any) {
        const { roleId: id, name } = record;
        fetchRoleInfo({ id, name });
        state.visibleAuthor = true;
      },
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      searchCondition.value.pageNo = pagination.current;
      searchCondition.value.pageSize = pagination.pageSize;
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
      validate().then(() => {
        console.log(toRaw(modelRef));
      });
    };

    // 生命周期
    onMounted(() => {
      fetchUserList(searchCondition.value);
    });

    return {
      ...toRefs(state),
      columns,
      UserPageData,
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
      findDict,
      ACTIVE_DICT,
      IDENTITY_DICT,
      loading,
      roleList,
    };
  },
});
</script>
