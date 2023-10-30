import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'

import 'amfe-flexible/index'
import './assets/css/base.css'
import './assets/css/popup.css'

import 'vant/lib/index.css';

createApp(App)
.use(store)
.use(router)
.mount('#app')
