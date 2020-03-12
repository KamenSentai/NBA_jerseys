import Vue from 'vue'
import store from './store'

import App from './App.vue'

import '@/plugins/meta'
import '@/plugins/mq'
import '@/styles/main.scss'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
