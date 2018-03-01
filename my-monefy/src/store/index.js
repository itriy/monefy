import Vue from 'vue'
import Vuex from 'vuex'
// import VueFire from 'vuefire';
// import firebase from '@/components/firebase';
import * as firebase from 'firebase'

Vue.use(Vuex);
Vue.use(firebase);

let formatDate = (value) => {
    let arr = value.split('/')
    let date = +new Date(arr[2], arr[1]-1, arr[0]);
    return date;
}

let formatAmount = (val) => {
    let amount = val.split(' ');
    return parseInt(amount.join(''));
}

const store = new Vuex.Store({
    strict: true,
    state: {
        dateValue: [],
        list: [],
        // pickedList: []
    },
    mutations: {
        'set-list': (state,payload) => state.list = payload,
        'date-value': (state,payload) => state.dateValue = payload
        // 'pick-list': (state, payload) => state.pickedList = payload
    },
    actions: {
        getList(context) {
            firebase.database().ref().once('value', function(data){
                context.commit('set-list',data.val());
            })
        },
        setDateValue(context, value) {
            context.commit('date-value', value);
        },

        // getPickedList(context, value) {
        //     let pickedList = context.getters.pickedFilterList(value);

        //     context.commit('pick-list', pickedList);

        //     console.log('pickedList',pickedList)

        //     return pickedList
        // }
    },
    getters: {
        // pickedFilterList(state) { 
        //     return (value) => {
        //        return !value ? [] : state.list.filter((elem) => {
        //             return formatDate(elem.date) >= +value[0] && formatDate(elem.date) <= +value[1]
        //         })
        //     }
        // },
        pickedList(state){
            return !state.dateValue ? [] : state.list.filter((elem) => {
                 return formatDate(elem.date) >= +state.dateValue[0] && formatDate(elem.date) <= +state.dateValue[1]
             })
        },
        dateValue(state){
            return state.dateValue
        },
        // pickedListCategory(state){
        //     let pickedListCategory = [];

        //     state.pickedList.map((elem) => {

        //         if((formatAmount(elem['converted amount']) < 0) && pickedListCategory.indexOf(elem.category) === -1 && elem.category.indexOf('To') && elem.category.indexOf('From')) {
        //             return pickedListCategory.push(elem.category)
        //         }
        //     })

        //     return pickedListCategory
        // },
        // pickedDateList(state) {
        //     let pickedDateList = [];

        //     state.pickedList.map((elem) => {

        //         if(pickedDateList.indexOf(elem.date) === -1 && elem.category.indexOf('To') && elem.category.indexOf('From')) {
        //             return pickedDateList.push(elem.date)
        //         }
        //     })

        //     return pickedDateList
        // },
        // pickedSumListToCategory(state, getters) {
        //     let pickedSumListToCategory = [];
        //     let category = getters.pickedListCategory;

        //     category.forEach((cat) => {

        //         let catArr = state.pickedList.filter((elem) => {
        //           return elem.category === cat
        //         })

        //         let result = catArr.reduce((sum, current) => {
        //           return sum + formatAmount(current['converted amount']);
        //         }, 0)

        //         pickedSumListToCategory.push(Math.abs(result));
        //     })

        //     return pickedSumListToCategory
        // },


    }

});

export default store;
