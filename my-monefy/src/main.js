// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as firebase from 'firebase'

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
