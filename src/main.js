import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

/* Style */
import '@/styles/main.scss';

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
