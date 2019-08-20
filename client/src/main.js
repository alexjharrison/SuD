import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue';
import './plugins/bootstrap-vue'
import App from './App.vue';
import router from './router';
import store from './store';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

// Init socket connection
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3001',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
    // options: { path: '/my-app/' } //Optional options
  })
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
