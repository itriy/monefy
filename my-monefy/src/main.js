// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('../node_modules/vuetify/src/stylus/app.styl')
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions
} from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'


import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.use(VCalendar);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
    firebase.initializeApp({
        apiKey: "AIzaSyCNwuPcyqqd7KD6jT2A6gh_dfRp2BSr2Mo",
        authDomain: "monefydb.firebaseapp.com",
        databaseURL: "https://monefydb.firebaseio.com",
        projectId: "monefydb",
        storageBucket: "monefydb.appspot.com",
        messagingSenderId: "628234001672"
    });

    this.$store.dispatch('getList')
  }
})
