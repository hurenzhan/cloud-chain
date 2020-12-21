<template>
  <div class="ln-d-flex ln-justify-c-between">
    <router-link to="/home"><h1>云标签</h1></router-link>
    <Space :size="20">
      <router-link to="/settings" class="ln-clear-a"
        ><SettingOutlined :style="{ fontSize: '18px' }"
      /></router-link>
      <Button type="primary">邀请</Button>
      <div>
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
            <div>
              <Space :size="8" class="ln-px-16 ln-py-8 ln-cursor-pointer">
                <PlusCircleOutlined />
                <span>创建企业</span>
              </Space>
            </div>
            <div class="ln-border-top">
              <Space :size="8" class="ln-px-16 ln-py-8 ln-cursor-pointer">
                <LogoutOutlined />
                <span>退出登录</span>
              </Space>
            </div>
          </template>
          <span class="ln-ml-10 ln-cursor-pointer">???</span>
        </Popover>
      </div>
    </Space>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { Avatar, Popover, Menu, Button, Space } from 'ant-design-vue';
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
    Avatar,
    UserOutlined,
    Popover,
    Menu,
    MenuItem,
    Button,
    PlusCircleOutlined,
    LogoutOutlined,
    SettingOutlined,
    Space,
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
