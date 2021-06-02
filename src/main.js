import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase';
import router from '@/routes/index';
import store from '@/store/index';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
