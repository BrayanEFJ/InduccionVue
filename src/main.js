import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import VueTextareaAutosize from 'vue-textarea-autosize';

import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBA2O2_HtmgbrBZkLO-5NcYTFj0oBMav1o",
  authDomain: "vuetwo-d88b4.firebaseapp.com",
  projectId: "vuetwo-d88b4",
  storageBucket: "vuetwo-d88b4.firebasestorage.app",
  messagingSenderId: "899373250739",
  appId: "1:899373250739:web:b005dcb6f0c35e382d98c6"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

Vue.config.productionTip = false;

Vue.use(Vuetify); // Usa Vuetify en tu proyecto

new Vue({
  router,
  store,
  vuetify: new Vuetify({
    theme: { dark: false } // Cambia esto según tus necesidades
  }),// Asegúrate de pasar la instancia de Vuetify aquí
  render: h => h(App),
}).$mount('#app');
