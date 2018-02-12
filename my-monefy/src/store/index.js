import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    state: {
        list: [],
        pickedList: []
    },
    mutations: {
        'set-list': (state,payload) => state.list = payload,
        'pick-list': (state, payload) => {
            
            let formatDate = (value) => {
              var arr = value.split('/')
              var date = +new Date(arr[2], arr[1]-1, arr[0]);

              return date;
            };

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
                context.commit('set-list', list)
            });
        }
    },
    getter: {
    }
});

export default store;
