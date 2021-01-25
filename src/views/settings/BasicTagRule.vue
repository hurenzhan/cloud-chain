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
            :loading="loading"
            @change="handleTableChange"
            :data-source="originTagPage.pageInfo"
            :pagination="{
              current: searchCondition.pageNo,
              pageSize: searchCondition.pageSize,
              change: handlePagination,
              total: originTagPage.total,
              showTotal: () => `共 ${originTagPage.total} 条`,
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
                <!-- <router-link
                  :to="`/settings/basicTagRule/barcodeRule?id=${record.id}&brandName=${record.brandName}`"
                  >条码规则</router-link
                > -->
              </Space>
            </template>
          </Table>
        </Col>
      </Row>
    </Space>
  </Content>
  <Modal
    :confirmLoading="loadingAction"
    v-model:visible="visible"
    title="原厂标签规则新增"
    @ok="handleSubmitAddRule"
    @cancel="handleCancel"
  >
    <Form :label-col="labelCol" :wrapper-col="wrapperCol">
      <FormItem label="类型" :="validateInfos.typeName">
        <Select
          v-model:value="modelRef.typeName"
          placeholder="请选择"
          @change="(value) => handleTypeChange(value)"
        >
          <Option value="通用">通用</Option>
          <Option value="品牌">品牌</Option>
        </Select>
      </FormItem>
      <FormItem label="品牌" :="validateInfos.brandName">
        <Input
          v-model:value="modelRef.brandName"
          placeholder="请选择"
          :disabled="modelRef.typeName !== '品牌'"
        />
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
  watchEffect,
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
import { RecordType } from '@/types/common';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { ACTIVE_DICT } from '@/libs/dicts';
import { findDict } from '@/libs/utils';
import { OriginTagInfo } from '@/types/originTag';

const { Content } = Layout;
const { confirm } = Modal;
const { Item: FormItem } = Form;
const { Option } = Select;

interface StateType {
  visible: boolean;
}

interface ModelRefType {
  id: number | null;
  typeName: string | null;
  brandName: string | null;
  status: number;
}

const columns: RecordType[] = [
  {
    title: '类型',
    dataIndex: 'typeName',
    key: 'typeName',
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
    slots: { customRender: 'status' },
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
    Input,
  },

  setup() {
    // 数据流
    const { getState, getMutations, getActions } = mapStore(
      'settingsBasicTagRule'
    );
    const {
      searchCondition,
      originTagPage,
      loading,
      loadingAction,
      actionItem,
    } = getState([
      'searchCondition',
      'originTagPage',
      'loading',
      'loadingAction',
      'actionItem',
    ]);
    const { save } = getMutations(['save']);
    const { fetchOriginTagPage, fetchAction } = getActions([
      'fetchOriginTagPage',
      'fetchAction',
    ]);
    // 组件数据
    const state: StateType = reactive({
      visible: false,
    });
    //表格方法
    const tableAction = reactive({
      handleStatus(record: OriginTagInfo) {
        const { id, status } = record;
        confirm({
          title: '是否启用/禁用该原厂标签规则！',
          icon: createVNode(ExclamationCircleOutlined),
          async onOk() {
            const isAction = await fetchAction({
              id,
              status: 1 ^ status,
            });
            if (!isAction) return false;
            await fetchOriginTagPage(searchCondition.value);
            return true;
          },
        });
      },
      edit(record: OriginTagInfo) {
        const { id, typeName, brandName, status } = record;
        save({ actionItem: { id, typeName, brandName, status } });
        state.visible = true;
      },
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      searchCondition.value.pageNo = pagination.current;
      searchCondition.value.pageSize = pagination.pageSize;
      fetchOriginTagPage(searchCondition.value);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 表单
    const modelRef: ModelRefType = reactive({
      id: null,
      typeName: null,
      brandName: null,
      status: 1,
    });

    watchEffect(() => {
      if (actionItem.value) {
        Object.assign(modelRef, actionItem.value);
      }
    });

    const validatorBrandName = async (rule: any, value: any) => {
      const operable = modelRef.typeName === '品牌';
      if (!operable) {
        return Promise.resolve();
      }
      if (!value) {
        return Promise.reject('品牌名称不能为空！');
      }
      return Promise.resolve();
    };

    const rulesRef = reactive({
      typeName: [
        {
          required: true,
          message: '类型不能为空！',
          type: 'string',
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

    const handleTypeChange = (value: string) => {
      if (value === '通用') {
        validate('brandName');
        modelRef.brandName = null;
      }
    };

    // 处理标签规则创建
    const handleSubmitAddRule = () => {
      validate().then(async () => {
        const params = toRaw(modelRef);
        if (!params.brandName) params.brandName = '-';
        const isCreate = await fetchAction(params);
        if (isCreate) {
          resetFields();
          state.visible = false;
          fetchOriginTagPage(searchCondition.value);
        }
      });
    };

    const handleCancel = () => {
      if (actionItem) save({ actionItem: undefined });
      resetFields();
    };

    // 生命周期
    onMounted(() => {
      fetchOriginTagPage(searchCondition.value);
    });

    return {
      ...toRefs(state),
      columns,
      originTagPage,
      searchCondition,
      handlePagination,
      tableAction,
      handleTableChange,
      handleSubmitAddRule,
      modelRef,
      validateInfos,
      handleTypeChange,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      loading,
      loadingAction,
      ACTIVE_DICT,
      findDict,
      handleCancel,
    };
  },
});
</script>
