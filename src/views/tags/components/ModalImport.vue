<template>
  <Modal
    :visible="importVisible"
    title="上传文件"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
  >
    <Space direction="vertical" :size="10" class="ln-w-100">
      <Alert
        message="上传的文件必须为Excel，请校验文件中数据是否已填充"
        type="info"
        show-icon
      />
      <Dragger
        name="file"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
        :beforeUpload="beforeUpload"
        v-model:fileList="fileList"
        :disabled="loading"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined />
        </p>
        <p class="ant-upload-text">点击上传文件d</p>
      </Dragger>
    </Space>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { Modal, Alert, Space, Upload, message } from 'ant-design-vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import { UploadFile, UploadInfoType } from '@/types/common';
import mapStore from '@/libs/mapStore';

const { Dragger } = Upload;

interface StateType {
  loading: boolean;
  fileList: UploadFile[];
}

export default defineComponent({
  components: {
    Modal,
    Alert,
    Space,
    Dragger,
    InboxOutlined,
  },

  setup() {
    // 数据流
    const { getState, getMutations } = mapStore('printTag');
    const { importVisible } = getState(['importVisible']);
    const { save } = getMutations(['save']);
    // 组件状态
    const state = reactive<StateType>({
      loading: false,
      fileList: [],
    });
    const handleChange = (info: UploadInfoType) => {
      state.fileList = info.fileList.filter((item: UploadFile) =>
        ['uploading', 'done'].includes(item.status)
      );
      if (info.file.status === 'uploading') {
        state.loading = true;
      } else {
        state.loading = false;
      }
    };

    const beforeUpload = (file: UploadFile) => {
      const isExcel = file.type === 'application/vnd.ms-excel';
      if (!isExcel) {
        message.error('文件格式不正确！');
        return false;
      }
      return true;
    };

    const handleOk = () => {
      save({ importVisible: false });
      console.log('handleOK');
    };

    const handleCancel = () => {
      save({ importVisible: false });
    };

    return {
      ...toRefs(state),
      importVisible,
      handleOk,
      handleChange,
      beforeUpload,
      handleCancel,
    };
  },
});
</script>