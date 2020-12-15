<template>
  <div class="ln-d-flex ln-justify-c-between">
    <h1>云标签</h1>
    <Row class="user__nav" type="flex" justify="end" align="middle">
      <Col
        ><router-link to="/login" class="ln-clear-a"
          ><SettingOutlined :style="{ fontSize: '18px' }" /></router-link
      ></Col>
      <Col><Button type="primary">邀请</Button></Col>
      <Col>
        <Avatar>
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
        <Popover
          overlayClassName="user__menu-popover"
          placement="bottomRight"
          v-model:visible="visible"
          trigger="click"
        >
          <template #title>
            <span>切换企业</span>
          </template>
          <template #content>
            <Menu>
              <MenuItem @click="handleSwitch">企业一</MenuItem>
              <MenuItem @click="handleSwitch">企业二</MenuItem>
            </Menu>
            <Row class="ln-px-16 ln-py-8 ln-cursor-pointer">
              <Col class="ln-mr-8"><PlusCircleOutlined /></Col>
              <Col>创建企业</Col>
            </Row>
            <Row class="ln-px-16 ln-py-10 ln-border-top ln-cursor-pointer">
              <Col class="ln-mr-8"><LogoutOutlined /></Col>
              <Col>退出登录</Col>
            </Row>
          </template>
          <span class="ln-ml-10 ln-cursor-pointer">???</span>
        </Popover>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { Row, Col, Avatar, Popover, Menu, Button } from 'ant-design-vue';
import {
  UserOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';

const { Item: MenuItem } = Menu;
// import mapStore from '@/libs/mapStore';

interface StateType {
  visible: boolean;
}

export default defineComponent({
  name: 'userHeader',
  components: {
    Row,
    Col,
    Avatar,
    UserOutlined,
    Popover,
    Menu,
    MenuItem,
    Button,
    PlusCircleOutlined,
    LogoutOutlined,
    SettingOutlined,
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
html {
  opacity: 1;
  height: 1000px;
}
.user__nav {
  .fn-not-first(ant-col, margin-left, 20px);
}
</style>

<style lang="less">
@import '~@/styles/utils.less';
.user__menu-popover {
  .ant-popover-inner-content {
    padding: 0;
    .ant-menu-light {
      background: @white;
    }
  }
}
</style>
