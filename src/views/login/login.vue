<template>
  <div class="login">
    <!-- <Button type="primary">login</Button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
// import { Button } from "ant-design-vue";
import mapStore from "@/libs/mapStore";
export default defineComponent({
  name: "login",
  // components: { Button },
  setup() {
    const loginStore = mapStore("login");
    const { getState, getActions } = loginStore;
    const { handleLogin } = getActions(["handleLogin"]);
    const { loading } = getState(["loading"]);

    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>
