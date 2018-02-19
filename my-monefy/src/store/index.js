import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

let formatDate = (value) => {
    let arr = value.split('/')
    let date = +new Date(arr[2], arr[1]-1, arr[0]);

    return date;
};

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
            axios.get('/static/db.json')
              .then(response => response.data)
              .then((list) => {
                context.commit('set-list', list)
            });
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
