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
          <Button type="link" @click="visible = true">+ 添加数据项</Button>
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
            <template
              v-for="col in commonColumns"
              :key="col.key"
              #[col.key]="{ text, record }"
            >
              <div v-if="col.isModify">
                <Select
                  v-if="record.editable"
                  :value="text"
                  ref="select"
                  @change="
                    (value) =>
                      tableAction.handleChange(value, record.id, col.key)
                  "
                >
                  <Option :value="0">否</Option>
                  <Option :value="1">是</Option>
                </Select>
                <template v-else>
                  {{ text }}
                </template>
              </div>
              <span v-else> {{ text }}</span>
            </template>
            <template #action="{ record }">
              <span v-if="record.editable">
                <Space :size="8">
                  <a @click="tableAction.cancel(record.id)">取消</a>
                  <a @click="tableAction.save(record.id)">保存</a>
                </Space>
              </span>
              <span v-else>
                <a
                  v-bind="editingKey !== '' ? { disabled: 'disabled' } : {}"
                  @click="tableAction.edit(record.id)"
                >
                  编辑
                </a>
                <a
                  v-bind="editingKey !== '' ? { disabled: 'disabled' } : {}"
                  @click="tableAction.handleStatus(record.id, record.status)"
                >
                  {{ record.status ? '启用' : '禁用' }}
                </a>
              </span>
            </template>
          </Table>
        </Col>
      </Row>
    </Space>
    <Modal
      v-model:visible="visible"
      title="创建标签"
      @ok="handleCreateTag"
      @cancel="resetFields"
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
import { defineComponent, reactive, toRefs, toRaw, onMounted } from 'vue';
import {
  Row,
  Col,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  Select,
} from 'ant-design-vue';
import { LeftOutlined } from '@ant-design/icons-vue';
import { useForm } from '@ant-design-vue/use';
import mapStore from '@/libs/mapStore';
import { pageBack } from '@/libs/utils';
import { RecordType, StrNum } from '@/types/common';

const { Item: FormItem } = Form;
const { Option } = Select;

interface StateType {
  editingKey: string;
  visible: boolean;
}

interface ModelRefType {
  name: string;
}

export default defineComponent({
  name: 'dataItem',

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
    Select,
    Option,
  },

  setup() {
    // 数据流
    const { getState, getGetters, getActions } = mapStore('dataItem');
    const { searchCondition, columns, tableData, cacheData } = getState([
      'searchCondition',
      'columns',
      'tableData',
      'cacheData',
    ]);
    const { commonColumns } = getGetters(['commonColumns']);
    const { fetchTagList } = getActions(['fetchTagList']);
    // 组件数据
    const state: StateType = reactive({
      editingKey: '',
      visible: false,
    });
    //表格方法
    const tableAction = reactive({
      handleChange(value: StrNum, key: StrNum, column: StrNum) {
        const newData = [...tableData.value.pageInfo];
        const target = newData.filter((item) => key === item.id)[0];
        if (target) {
          target[column] = value;
          tableData.value.pageInfo = newData;
        }
      },
      edit(key: string) {
        const newData = [...tableData.value.pageInfo];
        const target = newData.filter((item) => key === item.id)[0];
        state.editingKey = key;
        if (target) {
          target.editable = true;
          tableData.value.pageInfo = newData;
        }
      },
      save(key: string) {
        const newData = [...tableData.value.pageInfo];
        const newCacheData = [...cacheData.value];
        const target = newData.filter((item: RecordType) => key === item.id)[0];
        const targetCache = newCacheData.filter(
          (item: RecordType) => key === item.id
        )[0];
        if (target && targetCache) {
          delete target.editable;
          tableData.value.pageInfo = newData;
          Object.assign(targetCache, target);
          cacheData.value = newCacheData;
        }
        state.editingKey = '';
      },
      cancel(key: string) {
        const newData = [...tableData.value.pageInfo];
        const target = newData.filter((item) => key === item.id)[0];
        state.editingKey = '';
        if (target) {
          Object.assign(
            target,
            cacheData.value.filter((item: any) => key === item.id)[0]
          );
          delete target.editable;
          tableData.value.pageInfo = newData;
        }
      },
      handleStatus(id: number, status: number) {
        console.log(id, status);
      },
    });
    // 表单
    const modelRef: ModelRefType = reactive({
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

    // 生命周期
    onMounted(() => {
      fetchTagList();
    });

    return {
      ...toRefs(state),
      columns,
      commonColumns,
      tableData,
      pageBack,
      modelRef,
      resetFields,
      validateInfos,
      searchCondition,
      handlePagination,
      tableAction,
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
