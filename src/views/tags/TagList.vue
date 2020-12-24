<template>
  <div class="tag-list__content">
    <SearchForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue';
import mapStore from '@/libs/mapStore';
// import { Layout, Input, Space, Radio } from 'ant-design-vue';
import SearchForm from '@/components/SearchForm.vue';

export default defineComponent({
  name: 'tagList',

  components: {
    SearchForm,
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('tagList');
    const { tableData } = getState(['tableData']);
    const { fetchTagList } = getActions(['fetchTagList']);

    // 组件数据
    const state: any = reactive({
        formData: [{
            id: 'id'
        }]
    });

    // 生命周期
    onMounted(() => {
      console.log('tab 2');
      fetchTagList();
    });

    return {
      tableData,
      ...toRefs(state),
    };
  },
});
</script>
