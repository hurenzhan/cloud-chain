<template>
  <SettingsHeader
    ><LeftOutlined @click="pageBack" /> 品牌-{{ routerInfo.query.brandName }}
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
                <router-link
                  :to="`/settings/basicTagRule/barcodeRule/dataItem?id=${record.id}&name=${record.name}`"
                  >数据项</router-link
                >
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
      <FormItem label="类型" :="validateInfos.type">
        <Select v-model:value="modelRef.type" placeholder="请选择">
          <Option value="0">一维码</Option>
          <Option value="1">二维码</Option>
        </Select>
      </FormItem>
      <FormItem label="名称" :="validateInfos.name">
        <Input v-model:value="modelRef.name" placeholder="请输入" />
      </FormItem>
      <FormItem label="分隔符">
        <Input v-model:value="modelRef.separator" placeholder="请输入" />
      </FormItem>
      <FormItem label="扫描匹配模式">
        <TextArea v-model:value="modelRef.pattern" placeholder="请输入" />
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
  Select,
  Row,
  Col,
  Button,
  Input,
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
const { Option } = Select;
const { TextArea } = Input;

interface StateType {
  visible: boolean;
  routerInfo: RouteLocationNormalizedLoaded;
}

interface ModelRefType {
  type: string | null;
  name: string;
  separator: string;
  pattern: string;
}

const columns: RecordType[] = [
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '分隔符',
    dataIndex: 'separator',
    key: 'separator',
  },
  {
    title: '是否包含原厂料号',
    dataIndex: 'isCode',
    key: 'isCode',
  },
  {
    title: '扫描匹配模式',
    dataIndex: 'pattern',
    key: 'pattern',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '操作',
    key: 'action',
    width: 160,
    slots: { customRender: 'action' },
  },
];

export default defineComponent({
  name: 'settingBasicTagRule',

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
    Row,
    Col,
    Button,
    LeftOutlined,
    Input,
    TextArea,
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('settingsBarcodeRule');
    const { searchCondition, tableData } = getState([
      'searchCondition',
      'tableData',
    ]);
    const { fetchBarcodeRuleList } = getActions(['fetchBarcodeRuleList']);
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
          title: '是否启用/禁用该条码规则！',
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
      fetchBarcodeRuleList(searchCondition.value);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 表单
    const modelRef: ModelRefType = reactive({
      type: null,
      name: '',
      separator: '',
      pattern: '',
    });

    const rulesRef = reactive({
      type: [
        {
          required: true,
          message: '类型不能为空！',
          type: 'string',
        },
      ],
      name: [
        {
          required: true,
          message: '名称不能为空！',
          type: 'string',
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
      fetchBarcodeRuleList();
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
