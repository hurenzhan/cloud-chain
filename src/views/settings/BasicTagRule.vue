<template>
  <SettingsHeader> 原厂标签规则 </SettingsHeader>
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
                  :to="`/settings/basicTagRule/barcodeRule?id=${record.id}&brandName=${record.brandName}`"
                  >条码规则</router-link
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
        <Select
          v-model:value="modelRef.type"
          placeholder="请选择"
          @change="(value) => handleTypeChange(value)"
        >
          <Option :value="0">通用</Option>
          <Option :value="1">品牌</Option>
        </Select>
      </FormItem>
      <FormItem label="品牌" :="validateInfos.brandName">
        <Select
          v-model:value="modelRef.brandName"
          placeholder="请选择"
          :disabled="modelRef.type !== 1"
        >
          <Option value="0">品牌1</Option>
          <Option value="1">品牌2</Option>
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
} from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import SettingsHeader from './components/SettingsHeader.vue';
import mapStore from '@/libs/mapStore';
import { RecordType } from '@/types/common';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

const { Content } = Layout;
const { confirm } = Modal;
const { Item: FormItem } = Form;
const { Option } = Select;

interface StateType {
  visible: boolean;
}

interface ModelRefType {
  type: number | null;
  brandName: string | null;
}

const columns: RecordType[] = [
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '品牌名称',
    dataIndex: 'brandName',
    key: 'brandName',
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
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('settingsBasicTagRule');
    const { searchCondition, tableData } = getState([
      'searchCondition',
      'tableData',
    ]);
    const { fetchBasicTagRuleList } = getActions(['fetchBasicTagRuleList']);
    // 组件数据
    const state: StateType = reactive({
      visible: false,
    });
    //表格方法
    const tableAction = reactive({
      handleStatus(id: number, status: number) {
        console.log(id, status);
        confirm({
          title: '是否启用/禁用该原厂标签规则！',
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
      fetchBasicTagRuleList(searchCondition.value);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 表单
    const modelRef: ModelRefType = reactive({
      type: null,
      brandName: null,
    });

    const validatorBrandName = async (rule: any, value: any) => {
      const operable = modelRef.type === 1;
      if (!operable) {
        return Promise.resolve();
      }
      if (!value) {
        return Promise.reject('品牌名称不能为空！');
      }
      return Promise.resolve();
    };

    const rulesRef = reactive({
      type: [
        {
          required: true,
          message: '类型不能为空！',
          type: 'number',
        },
      ],
      brandName: [
        {
          validator: validatorBrandName,
          type: 'string',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );

    const handleTypeChange = (value: number) => {
      if (value === 0) {
        validate('brandName');
        modelRef.brandName = null;
      }
    };

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
      fetchBasicTagRuleList();
    });

    return {
      ...toRefs(state),
      columns,
      tableData,
      searchCondition,
      handlePagination,
      tableAction,
      handleTableChange,
      handleSubmitAddRule,
      modelRef,
      resetFields,
      validateInfos,
      handleTypeChange,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
  },
});
</script>
