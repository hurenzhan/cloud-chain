<template>
  <div class="nav-header__content">
    <Row type="flex" justify="space-between" align="middle">
      <Col>
        <Dropdown :trigger="['click']" placement="bottomLeft">
          <span type="link" class="nav__name ln-cursor-pointer"
            >销售单1 <CaretDownOutlined
          /></span>
          <template #overlay>
            <Menu>
              <MenuItem> 销售单1 </MenuItem>
              <MenuItem> 销售单2 </MenuItem>
              <MenuItem> 销售单3 </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </Col>
      <Col>
        <router-link class="tag-set__link" to="/tagList">标签设置</router-link>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { Menu, Dropdown, Row, Col } from 'ant-design-vue';
import { CaretDownOutlined } from '@ant-design/icons-vue';

const { Item: MenuItem } = Menu;
// import mapStore from '@/libs/mapStore';

interface StateType {
  visible: boolean;
}

export default defineComponent({
  name: 'navHeader',
  components: {
    Menu,
    MenuItem,
    Dropdown,
    CaretDownOutlined,
    Row,
    Col,
  },
  setup() {
    const state: StateType = reactive({
      visible: false,
    });

    const handleSwitch = () => {
      state.visible = false;
    };

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
  .nav__name {
    font-size: 18px;
    color: @0-0-0_85;
  }
  .tag-set__link {
    font-size: 18px;
  }
}
</style>
