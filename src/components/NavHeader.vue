<template>
  <div class="nav-header__content">
    <Row type="flex" justify="space-between" align="middle">
      <Col>
        <Select
          @change="handleSwitch"
          style="width: 180px"
          placeholder="请选择标签"
        >
          <Option v-for="{ id, name } in tagList" :key="id" :value="id">{{
            name
          }}</Option>
        </Select>
      </Col>
      <Col>
        <router-link class="tag-set__link" to="/tagList">标签设置</router-link>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onActivated, reactive, toRaw, toRefs } from 'vue';
import { Row, Col, Select } from 'ant-design-vue';
import { TagInfo } from '@/types/tagPackage';
import { tagPackageDispatch } from '@/service';
import mapStore from '@/libs/mapStore';

const { Option } = Select;

interface StateType {
  tagList: Array<TagInfo>;
}

export default defineComponent({
  name: 'navHeader',
  components: {
    Row,
    Col,
    Select,
    Option,
  },
  setup() {
    // 数据流
    const { getMutations } = mapStore('navigate');
    const { save } = getMutations(['save']);

    // 组件数据
    const state: StateType = reactive({
      tagList: [],
    });

    const handleSwitch = (id: number) => {
      const activeTagItem = toRaw(
        state.tagList?.find((item) => item.id === id)
      );
      save({ activeTagItem });
    };

    const fetchTagPage = async () => {
      const [err, res] = await tagPackageDispatch.use('tagAll');
      if (err) return false;
      state.tagList = res?.data;
    };

    onActivated(() => {
      fetchTagPage();
    });

    return {
      ...toRefs(state),
      handleSwitch,
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils.less';
.nav-header__content {
  background: @white;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 18px 50px;
  .nav__name {
    font-size: 18px;
    color: @0-0-0_85;
  }
  .tag-set__link {
    font-size: 18px;
  }
}
</style>
