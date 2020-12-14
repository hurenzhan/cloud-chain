import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import '@/styles/index.less'

createApp(App).use(store).use(router).mount('#app')
