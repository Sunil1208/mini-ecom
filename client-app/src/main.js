import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import Buefy from 'buefy';
import Vuelidate from 'vuelidate'

import 'buefy/dist/buefy.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Buefy);
Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
