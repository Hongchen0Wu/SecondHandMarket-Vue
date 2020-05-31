import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
//import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/index'


 

import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
var VueCookie = require('vue-cookie');
// Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.use(VueCookie);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
