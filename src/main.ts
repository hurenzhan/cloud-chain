import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import '@/styles/index.less'
import { ConfigProvider } from 'ant-design-vue'

createApp(App).use(store).use(router).use(ConfigProvider).mount('#app')
