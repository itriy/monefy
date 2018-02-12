import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    state: {
        list: [],
        pickedList: [],
        count: 0
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--,
        'set-list': (state,payload) => state.list = payload,
        'pick-list': (state, payload) => {
            
            let formatDate = (value) => {
              var arr = value.split('/')
              var date = +new Date(arr[2], arr[1]-1, arr[0]);

              return date;
            };

            // console.log('payload',payload)


            state.pickedList = !payload ? [] : state.list.filter((elem) => {
                return formatDate(elem.date) >= +payload[0] && formatDate(elem.date) <= +payload[1]
              })
        }
    },
    actions: {
        getList(context) {
            axios.get('/static/db.json')
              .then(response => response.data)
              .then((list) => {
                // console.log('add list', list)
                context.commit('set-list', list)
                // this.list = response;
            });
        }
    },
    getter: {
        // pickedList: (state, payload) => {
        //     return state.list.filter(elen => {
        //         let formatDate = (value) => {
        //           var arr = value.split('/')
        //           var date = +new Date(arr[2], arr[1]-1, arr[0]);

        //           return date;
        //         };
        //         return formatDate(elem.date) >= +payload[0] && formatDate(elem.date) <= +payload[1]
        //     })
        // }
    }
});

export default store;
