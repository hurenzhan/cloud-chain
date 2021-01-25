<template>
  <SettingsHeader> 基本信息 </SettingsHeader>
  <Content>
    <Space direction="vertical" :size="24">
      <div class="info__item">
        <h1 class="info__item-label">企业名称</h1>
      </div>
      <Input :value="basicInfo && basicInfo.name" size="large" disabled />
      <div class="info__item">
        <h1 class="info__item-label">数据来源</h1>
        <Group name="radioGroup" value="Excel" disabled>
          <Radio value="Excel"> Excel </Radio>
          <Radio value="ERP"> ERP </Radio>
        </Group>
      </div>
      <div class="info__item">
        <h1 class="info__item-label">原厂标签数据收集</h1>
        <Group name="radioGroup" :value="0" disabled>
          <Radio :value="0"> 否 </Radio>
          <Radio :value="1"> 是 </Radio>
        </Group>
      </div>
      <div class="info__item">
        <h1 class="info__item-label">原厂标签数据核对</h1>
        <Group name="radioGroup" :value="0" disabled>
          <Radio :value="0"> 否 </Radio>
          <Radio :value="1"> 是 </Radio>
        </Group>
      </div>
    </Space>
  </Content>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import mapStore from '@/libs/mapStore';
import { Layout, Input, Space, Radio } from 'ant-design-vue';
import SettingsHeader from './components/SettingsHeader.vue';

const { Content } = Layout;
const { Group } = Radio;

export default defineComponent({
  name: 'settingBasic',

  components: {
    SettingsHeader,
    Content,
    Input,
    Space,
    Radio,
    Group,
  },

  setup() {
    // 数据流
    const { getState, getActions } = mapStore('settingsBasic');
    const { basicInfo } = getState(['basicInfo']);
    const { fetchBasicInfo } = getActions(['fetchBasicInfo']);

    // 生命周期
    onMounted(() => {
      console.log(basicInfo, 'basicInfo');
      
      fetchBasicInfo();
    });

    return {
      basicInfo: basicInfo,
    };
  },
});
</script>

<style lang="less" scoped>
@import '~@/styles/utils';
.ant-layout-content {
  .info__item {
    display: flex;
    align-items: center;
    &-label {
      font-size: 18px;
      color: @black;
      margin-right: 24px;
    }
  }
}
</style>