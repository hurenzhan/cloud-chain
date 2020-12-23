<template>
  <SettingsHeader
    ><LeftOutlined @click="pageBack" /> 数据项-{{ routerInfo.query.name }}
  </SettingsHeader>
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
                <router-link to=""></router-link>
              </Space>
            </template>
          </Table>
        </Col>
      </Row>
    </Space>
  </Content>
  <Modal
    v-model:visible="visible"
    title="原厂标签规则新增"
    @ok="handleSubmitAddRule"
    @cancel="resetFields"
  >
    <Form :label-col="labelCol" :wrapper-col="wrapperCol">
      <FormItem label="名称" :="validateInfos.name">
        <Input v-model:value="modelRef.name" placeholder="请输入" />
      </FormItem>
      <FormItem label="名称">
        <Group name="radioGroup" v-model:value="modelRef.isCode">
          <Radio :value="1"> 是 </Radio>
          <Radio :value="0"> 否 </Radio>
        </Group>
      </FormItem>
      <FormItem label="位置" :="validateInfos.position">
        <Input v-model:value="modelRef.position" placeholder="请输入" />
      </FormItem>
      <FormItem label="长度" :="validateInfos.length">
        <Input v-model:value="modelRef.length" placeholder="请输入" />
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
import {
  Layout,
  Table,
  Space,
  Modal,
  Form,
  Row,
  Col,
  Button,
  Input,
  Radio,
} from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import SettingsHeader from './components/SettingsHeader.vue';
import mapStore from '@/libs/mapStore';
import { pageBack } from '@/libs/utils';
import { RecordType } from '@/types/common';
import { ExclamationCircleOutlined, LeftOutlined } from '@ant-design/icons-vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

const { Content } = Layout;
const { confirm } = Modal;
const { Item: FormItem } = Form;
const { Group } = Radio;

interface StateType {
  visible: boolean;
  routerInfo: RouteLocationNormalizedLoaded;
}

interface ModelRefType {
  name: string;
  isCode: number;
  position: string;
  length: string;
}

const columns: RecordType[] = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '是否包含原厂料号',
    dataIndex: 'isCode',
    key: 'isCode',
  },
  {
    title: '位置',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: '长度',
    dataIndex: 'length',
    key: 'length',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '操作',
    key: 'action',
    width: 110,
    slots: { customRender: 'action' },
  },
];

export default defineComponent({
  name: 'barcodeDataItem',

  components: {
    Table,
    Space,
    SettingsHeader,
    Content,
    Modal,
    Form,
    FormItem,
    Row,
    Col,
    Button,
    LeftOutlined,
    Input,
    Radio,
    Group,
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('settingsBarcodeDataItem');
    const { searchCondition, tableData } = getState([
      'searchCondition',
      'tableData',
    ]);
    const { fetchDataItemList } = getActions(['fetchDataItemList']);
    // 组件数据
    const state = reactive<StateType>({
      visible: false,
      routerInfo: useRoute(),
    });
    //表格方法
    const tableAction = reactive({
      handleStatus(id: number, status: number) {
        console.log(id, status);
        confirm({
          title: '是否启用/禁用该数据项！',
          icon: createVNode(ExclamationCircleOutlined),
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
        });
      },
      edit() {
        console.log('edit');
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

    // 表单
    const modelRef = reactive<ModelRefType>({
      name: '',
      isCode: 1,
      position: '',
      length: '',
    });

    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: '名称不能为空！',
        },
      ],
      position: [
        {
          required: true,
          message: '位置不能为空！',
        },
        {
          pattern: /^[0-9]+$/g,
          message: '只能包含数字！',
        },
      ],
      length: [
        {
          required: true,
          message: '长度不能为空！',
        },
        {
          pattern: /^[0-9]+$/g,
          message: '只能包含数字！',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );

    // 处理标签规则创建
    const handleSubmitAddRule = () => {
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
      handleSubmitAddRule,
      modelRef,
      resetFields,
      validateInfos,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
  },
});
</script>
