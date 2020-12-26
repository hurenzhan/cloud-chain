<template>
  <Input v-if="type === FORM_ITEM_ENUM.INPUT" />
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { Input } from 'ant-design-vue';
import { FORM_ITEM_ENUM } from './types';

export default defineComponent({
  props: {
    type: {
      type: Number,
      required: true,
    },
  },

  components: {
    Input,
  },

  setup() {
    return {
      FORM_ITEM_ENUM,
    };
  },
});
</script>
