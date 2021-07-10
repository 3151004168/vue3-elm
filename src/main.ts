import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import './utils/rem'
import Vant from 'vant';
import 'vant/lib/index.css';
import './styles/index.scss'
import http from "./utils/axios";
import store from './store/index'


const app = createApp(App)

app.config.globalProperties.$http = http
app.use(Vant).use(store).use(router).mount('#app')

