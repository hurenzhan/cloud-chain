<template>
  <div class="invoices__content">
    <Space direction="vertical" :size="20" class="ln-w-100">
      <Row type="flex" justify="end" align="middle">
        <Col>
          <Upload
            name="file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            @change="handleChange"
            :beforeUpload="beforeUpload"
            v-model:fileList="fileList"
            :disabled="loading"
          >
            <Button type="primary" @click="visible = true">新增单据</Button>
          </Upload>
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
            <template #action="{ record: { id } }">
              <Space :size="8">
                <a @click="tableAction.make"> 制作标签 </a>
                <a @click="tableAction.reset"> 重制标签 </a>
                <router-link :to="`/tags/print?id=${id}`">打印标签</router-link>
                <a @click="tableAction.boxes"> 装箱 </a>
              </Space>
            </template>
          </Table>
        </Col>
      </Row>
    </Space>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import {
  Row,
  Col,
  Button,
  Table,
  Space,
  Upload,
  message,
} from 'ant-design-vue';
import mapStore from '@/libs/mapStore';
import { pageBack } from '@/libs/utils';
import { RecordType, UploadFile, UploadInfoType } from '@/types/common';
import {
  onBeforeRouteUpdate,
  RouteLocationNormalizedLoaded,
  useRoute,
} from 'vue-router';

interface StateType {
  visible: boolean;
  loading: boolean;
  fileList: UploadFile[];
}

const columns: RecordType[] = [
  {
    title: '单据号',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '创建人',
    dataIndex: 'createName',
    key: 'createName',
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '操作',
    key: 'action',
    width: 260,
    slots: { customRender: 'action' },
  },
];

export default defineComponent({
  name: 'InvoicesList',

  components: {
    Row,
    Col,
    Button,
    Table,
    Space,
    Upload,
  },

  setup() {
    // 路由信息
    const {
      query: { tagId },
    }: RouteLocationNormalizedLoaded = useRoute();
    // 数据流
    const { getState, getActions } = mapStore('invoicesList');
    const { searchCondition, tableData } = getState([
      'searchCondition',
      'tableData',
    ]);
    const { fetchInvoicesList } = getActions(['fetchInvoicesList']);

    // 组件数据
    const state: StateType = reactive({
      visible: false,
      loading: false,
      fileList: [],
    });

    // 导入
    const handleChange = (info: UploadInfoType) => {
      state.fileList = info.fileList.filter((item: UploadFile) =>
        ['uploading', 'done'].includes(item.status)
      );
      if (info.file.status === 'uploading') {
        state.loading = true;
      } else {
        state.loading = false;
      }
    };

    const beforeUpload = (file: UploadFile) => {
      const isExcel = file.type === 'application/vnd.ms-excel';
      if (!isExcel) {
        message.error('文件格式不正确！');
        return false;
      }
      return true;
    };

    //表格方法
    const tableAction = reactive({
      make() {
        console.log('make');
      },
      reset() {
        console.log('reset');
      },
      boxes() {
        console.log('boxes');
      },
    });

    // 处理分页
    const handlePagination = (pagination: RecordType) => {
      searchCondition.value.pageNo = pagination.current;
      searchCondition.value.pageSize = pagination.pageSize;
      fetchInvoicesList(searchCondition.value);
    };
    // 表格操作
    const handleTableChange = (pagination: RecordType) => {
      handlePagination(pagination);
    };

    // 生命周期
    onMounted(() => {
      if (tagId) {
        searchCondition.value.tagId = tagId;
        fetchInvoicesList(searchCondition.value);
      }
    });

    onBeforeRouteUpdate((to) => {
      const {
        query: { tagId },
      } = to;
      if (tagId) {
        searchCondition.value.tagId = tagId;
        // fetchInvoicesList(searchCondition.value);
      }
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
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      handleChange,
      beforeUpload,
    };
  },
});
</script>


<style lang="less" scoped>
@import '~@/styles/utils';
.invoices__content {
  .active-status-point-0 {
    .status-point(rgb(191,191,191));
  }
  .active-status-point-1 {
    .status-point(rgb(123,77,18));
  }
  .active-status-point-2 {
    .status-point(rgb(217,0,27));
  }
  .active-status-point-3 {
    .status-point(rgb(245,154,35));
  }
  .active-status-point-4 {
    .status-point(rgb(151,194,28));
  }
}
</style>