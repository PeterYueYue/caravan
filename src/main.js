// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs';


Vue.prototype.$http = axios;
Vue.prototype.qs = qs;
// Vue.prototype.$HOST = 'https://app.greenfortune.sh.cn';
// Vue.prototype.$HOST = 'http://180.153.19.162:8082';
Vue.prototype.$HOST = '';
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
