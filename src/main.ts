import Vue, { createApp } from 'vue'
import App    from './App.vue'
import router from './router'
import { store }  from './store'
import Dexie  from 'dexie';
import './registerServiceWorker'


//Vue.prototype.$db = new Dexie('lychee')
//Vue.config.productionTip = false

//new Vue({ router, store, render: h => h(App) }).$mount('#app')
const app = createApp(App) //.use(router).use(store).mount('#app')
app.config.globalProperties.$db = new Dexie('lychee')
app.use(router).use(store)
app.mount('#app')