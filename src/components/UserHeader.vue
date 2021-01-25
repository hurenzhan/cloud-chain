<template>
  <div class="ln-d-flex ln-justify-c-between">
    <router-link to="/home"><h1>云标签</h1></router-link>
    <Space :size="20">
      <router-link to="/settings" class="ln-clear-a"
        ><SettingOutlined :style="{ fontSize: '18px' }"
      /></router-link>
      <Button type="primary" @click="handleVisible">邀请</Button>
      <div>
        <Avatar v-if="userInfo.avatar" :src="userInfo.avatar" />
        <Avatar v-else>
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
        <Popover
          overlayClassName="user__menu-popover"
          placement="bottomRight"
          v-model:visible="userActionVisible"
          trigger="click"
        >
          <!-- <template #title>
            <span>切换企业</span>
          </template> -->
          <template #content>
            <!-- <Menu>
              <MenuItem @click="handleSwitch">企业一</MenuItem>
              <MenuItem @click="handleSwitch">企业二</MenuItem>
            </Menu>
            <div>
              <Space :size="8" class="ln-px-16 ln-py-8 ln-cursor-pointer">
                <PlusCircleOutlined />
                <span>创建企业</span>
              </Space>
            </div> -->
            <div class="ln-border-top" @click="LoginOut">
              <Space :size="8" class="ln-px-16 ln-py-8 ln-cursor-pointer">
                <LogoutOutlined />
                <span>退出登录</span>
              </Space>
            </div>
          </template>
          <span class="ln-ml-10 ln-cursor-pointer">{{ userInfo.name }}</span>
        </Popover>
      </div>
    </Space>
    <Modal v-model:visible="inviteVisible" :footer="false" :width="800">
      <Row type="flex" align="middle">
        <Space direction="vertical" :size="24" class="ln-w-100">
          <Col :span="24"><h1 class="ln-text-center">邀请成员一起协作</h1></Col>
          <Col :span="24">
            <InputSearch
              :value="inviteInfo.url"
              @search="handleCopy(inviteInfo.url)"
            >
              <template #enterButton>
                <Button type="primary">复制链接</Button>
              </template>
            </InputSearch>
          </Col>
          <Col :span="24" class="ln-text-center"
            >有效时间：{{ inviteInfo.deadline }}</Col
          >
        </Space>
      </Row>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import {
  Avatar,
  Popover,
  Space,
  Modal,
  Button,
  Input,
  Row,
  Col,
} from 'ant-design-vue';
import {
  UserOutlined,
  // PlusCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { LoginOut, getUserInfo, handleCopy } from '@/libs/utils';
import { UserInfoType } from '@/types/userInfo';
import { userDispatch } from '@/service';
import { InviteInfo } from '@/types/user';

// const { Item: MenuItem } = Menu;
const { Search: InputSearch } = Input;
// import mapStore from '@/libs/mapStore';

interface StateType {
  userActionVisible: boolean;
  inviteVisible: boolean;
  userInfo: UserInfoType;
  inviteInfo: InviteInfo | {};
}

export default defineComponent({
  name: 'userHeader',
  components: {
    Avatar,
    UserOutlined,
    Popover,
    // Menu,
    // MenuItem,
    Button,
    // PlusCircleOutlined,
    LogoutOutlined,
    SettingOutlined,
    Space,
    Modal,
    InputSearch,
    Row,
    Col,
  },
  setup() {
    const state: StateType = reactive({
      userActionVisible: false,
      inviteVisible: false,
      userInfo: getUserInfo(),
      inviteInfo: {},
    });

    const handleSwitch = () => {
      state.userActionVisible = false;
    };

    const handleVisible = async () => {
      state.inviteVisible = true;
      const [err, res] = await userDispatch.use('invite', {
        userId: state.userInfo.id,
      });
      if (err) return false;
      state.inviteInfo = res?.data;
    };

    return {
      ...toRefs(state),
      handleSwitch,
      LoginOut,
      handleVisible,
      handleCopy,
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
