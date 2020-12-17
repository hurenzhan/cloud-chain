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
          <Button type="primary">创建标签</Button>
        </Col>
      </Row>
      <Row class="ln-w-100">
        <Col span="24">
          <Table :columns="columns" :data-source="tableData.pageInfo">
            <template #name="{ text }">
              <a>{{ text }}</a>
            </template>
            <template #customTitle>
              <span> Name</span>
            </template>
            <template #tags="{ text: tags }">
              <span>
                <Tag
                  v-for="tag in tags"
                  :key="tag"
                  :color="
                    tag === 'loser'
                      ? 'volcano'
                      : tag.length > 5
                      ? 'geekblue'
                      : 'green'
                  "
                >
                  {{ tag.toUpperCase() }}
                </Tag>
              </span>
            </template>
            <template #action="{ record }">
              <span>
                <a>Invite 一 {{ record.name }}</a>
                <Divider type="vertical" />
                <a>Delete</a>
                <Divider type="vertical" />
                <a class="ant-dropdown-link"> More actions </a>
              </span>
            </template>
          </Table>
        </Col>
        <Col>
          <Pagination
            v-model:current="searchCondition.pageNo"
            v-model:pageSize="searchCondition.pageSize"
            @showSizeChange="handlePagination"
            @change="handlePagination"
            :show-total="() => `共 ${tableData.total} 条`"
            :total="tableData.total"
            :showSizeChanger="true"
          />
        </Col>
      </Row>
    </Space>
    {{ searchCondition }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import {
  Row,
  Col,
  Button,
  Table,
  Tag,
  Divider,
  Space,
  Pagination,
} from 'ant-design-vue';
import { LeftOutlined } from '@ant-design/icons-vue';
import mapStore from '@/libs/mapStore';
import { pageBack } from '@/libs/utils';
// import { PaginationType } from '@/types/common';

interface StateType {
  columns: any[];
}

export default defineComponent({
  name: 'tagList',

  components: {
    Row,
    Col,
    Button,
    LeftOutlined,
    Table,
    Tag,
    Divider,
    Space,
    Pagination,
  },

  setup() {
    const state: StateType = reactive({
      columns: [
        {
          dataIndex: 'name',
          key: 'name',
          slots: { title: 'customTitle', customRender: 'name' },
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          slots: { customRender: 'tags' },
        },
        {
          title: 'Action',
          key: 'action',
          slots: { customRender: 'action' },
        },
      ],
      aa: 1,
    });

    const { getState, getActions } = mapStore('tagList');
    const { searchCondition, tableData } = getState([
      'searchCondition',
      'tableData',
    ]);
    const { fetchTagList } = getActions(['fetchTagList']);

    const handlePagination = (pageCurrent: number, pageSize: number) => {
      console.log(pageCurrent, pageSize);

      fetchTagList(searchCondition.value);
    };

    // const pagination: any = {
    //   total: tableData?.value?.total,
    //   showSizeChanger: true,
    //   showSizeChange: (current: number, size: number) =>
    //     handlePagination(current, size),
    //   change: (current: number, size: number) =>
    //     handlePagination(current, size),
    //   showTotal: (total: string | number) => `共 ${total} 条`,
    // };

    return {
      ...toRefs(state),
      tableData,
      pageBack,
      // pagination,
      searchCondition,
      handlePagination,
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
