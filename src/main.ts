import Vue, { createApp } from 'vue'
import App    from './App.vue'
import router from './router'
import { store }  from './store'
import Dexie  from 'dexie'
import axios from 'axios'
import './registerServiceWorker'


const app = createApp(App)
app.config.globalProperties.$db = new Dexie('lychee')
app.config.globalProperties.$http = axios
app.use(router).use(store)
app.mount('#app')