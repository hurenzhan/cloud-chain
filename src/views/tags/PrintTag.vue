<template>
  <div class="print-tag__content">
    <Layout>
      <Sider>
        <h1 class="ln-mt-40">快速填充</h1>
        <EfficialSearch
          :data="efficialSearchData"
          :onSearch="debounce(handleEfficialSearch, 300)"
        />
      </Sider>
      <Content class="ln-px-40 ln-py-40">
        <Space direction="vertical" :size="24" class="ln-w-100">
          <Row type="flex" justify="space-between" align="middle">
            <Space :size="8">
              <Button @click="buttonAction.export" type="primary">导出</Button>
              <Button
                @click="() => save({ importVisible: true })"
                type="primary"
                >导入</Button
              >
              <Button @click="buttonAction.collectTags" type="primary"
                >标签收集</Button
              >
            </Space>
            <Space :size="8">
              <Select
                placeholder="请选择"
                style="width: 180px"
                :value="templateKey"
                @change="templateChange"
              >
                <Option value="jack"> Jack </Option>
                <Option value="lucy"> Lucy </Option>
              </Select>
              <Button @click="buttonAction.printTag" type="primary"
                >打印标签</Button
              >
            </Space>
          </Row>
          <Row type="flex" justify="end" align="middle">
            <Button
              size="large"
              type="link"
              @click="() => save({ addItemVisible: true })"
            >
              + 添加查询条件
            </Button>
          </Row>
          <Row v-if="formData.length" class="search__box ln-py-16">
            <SearchForm
              :onSearch="handleSearch"
              :onReset="handleReset"
              :formData="formData"
            />
          </Row>
          <Table
            rowKey="id"
            :columns="columns"
            :data-source="filterTableData"
            size="small"
            :pagination="false"
            bordered
          />
        </Space>
      </Content>
    </Layout>
    <ModalImport />
    <ModalSearchItem />
    <AffixFooter><Button @click="pageBack">返回</Button></AffixFooter>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Layout, Button, Space, Select, Row, Table } from 'ant-design-vue';
import EfficialSearch from './components/EfficialSearch.vue';
import ModalImport from './components/ModalImport.vue';
import ModalSearchItem from './components/ModalSearchItem.vue';
import AffixFooter from '@/components/AffixFooter.vue';
import SearchForm from '@/components/searchForm/SearchForm.vue';
import mapStore from '@/libs/mapStore';
import { RecordType } from '@/types/common';
import { exportFile, pageBack } from '@/libs/utils';
import { debounce } from 'lodash';

const { Content, Sider } = Layout;
const { Option } = Select;

export default defineComponent({
  name: 'printTag',
  components: {
    Layout,
    Content,
    Sider,
    EfficialSearch,
    Button,
    Space,
    Select,
    Option,
    ModalImport,
    AffixFooter,
    Row,
    ModalSearchItem,
    SearchForm,
    Table,
  },
  setup() {
    // 数据流
    const { getState, getMutations, getGetters } = mapStore('printTag');
    const {
      efficialSearchData,
      templateKey,
      formData,
      columns,
      tableData,
    } = getState([
      'efficialSearchData',
      'templateKey',
      'formData',
      'columns',
      'tableData',
    ]);
    const { save } = getMutations(['save']);
    const { filterTableData } = getGetters(['filterTableData']);
    // 按钮栏
    const buttonAction = reactive({
      export() {
        // const blob = new Blob([res]);
        // const fileName = `${formatMessage({
        //   id: 'inventoryInquiry.list.exports',
        // })}.xls`;
        const url =
          'https://doc.myoas.com/download/attachments/387741430/OPPO%E6%95%B0%E5%AD%97%E9%9B%B6%E5%94%AE_%E6%99%BA%E6%85%A7%E9%97%A8%E5%BA%97-PC%E7%AB%AF_PRD_V1.7.0901.docx?version=2&modificationDate=1609292285000&api=v2';
        exportFile(url, '测试');
      },
      collectTags() {
        console.log('collectTags');
      },
      printTag() {
        console.log('printTag');
      },
    });
    // 方法
    // 选择模板
    const templateChange = (value: string) => {
      save({ templateKey: value });
    };
    // 快速搜索
    const handleEfficialSearch = (modelRef: RecordType) => {
      save({ searchCondition: { ...modelRef } });
    };
    // 表格
    const handleSearch = (modelRef: RecordType) => {
      save({ searchCondition: { ...modelRef } });
    };

    const handleReset = (modelRef: RecordType) => {
      save({ searchCondition: { ...modelRef } });
    };

    return {
      efficialSearchData,
      handleEfficialSearch,
      buttonAction,
      templateKey,
      templateChange,
      pageBack,
      save,
      formData,
      handleSearch,
      handleReset,
      columns,
      tableData,
      filterTableData,
      debounce,
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.print-tag__content {
  .ant-layout {
    background: @white;
  }
  .ant-layout-sider {
    background: @white;
    flex: none !important;
    max-width: none !important;
    min-width: initial !important;
    width: initial !important;
    padding: 0 40px !important;
    h1 {
      font-size: 16px;
    }
  }
  .ant-layout-content {
    overflow-x: initial;
    .search__box {
      background: rgba(242, 242, 242, 1);
    }
  }
}
</style>
