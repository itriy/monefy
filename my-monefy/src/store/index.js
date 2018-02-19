import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
// import VueFire from 'vuefire';
// import firebase from '@/components/firebase';
import * as firebase from 'firebase'

Vue.use(Vuex);
Vue.use(firebase);

let formatDate = (value) => {
    let arr = value.split('/')
    let date = +new Date(arr[2], arr[1]-1, arr[0]);

    return date;
};

// console.log(firebase.database())
const store = new Vuex.Store({
    strict: true,
    state: {
        list: [],
        pickedList: []
    },
    mutations: {
        'set-list': (state,payload) => state.list = payload,
        'pick-list': (state, payload) => state.pickedList = payload
    },
    actions: {
        getList(context) {
            // axios.get('https://monefydb.firebaseio.com/.json')
            //   .then(response => response.data)
            //   .then((list) => {
            //     context.commit('set-list', list)
            // });

            firebase.database().ref().once('value', function(data){
                context.commit('set-list',data.val());
            })

        },
        getPickedList(context, value) {
            let pickedList = !value ? [] : this.state.list.filter((elem) => {
                return formatDate(elem.date) >= +value[0] && formatDate(elem.date) <= +value[1]
              })

            context.commit('pick-list', pickedList)
        }
    },
    getter: {
    }

});

export default store;
