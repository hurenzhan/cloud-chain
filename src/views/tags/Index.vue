<template>
  <div class="tags__content">
    <Tabs>
      <TabPane key="invoices" tab="单据">
        <InvoicesList />
      </TabPane>
      <TabPane key="tag" tab="标签">
        <TagList />
      </TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Tabs } from 'ant-design-vue';
import InvoicesList from './InvoicesList.vue';
import TagList from './TagList.vue';

const { TabPane } = Tabs;

export default defineComponent({
  name: 'tags',
  components: {
    Tabs,
    TabPane,
    InvoicesList,
    TagList,
  },
  //   setup() {},
});
</script>

<style lang="less" scoped>
// @import '~@/styles/utils';
// .ant-layout-content {
//   background: @white;
//   padding: 0 50px;
// }
//
</style>
