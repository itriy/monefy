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
}

let formatAmount = (val) => {
    let amount = val.split(' ');
    return parseInt(amount.join(''));
}

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
            let pickedList = context.getters.pickedFilterList(value);

            context.commit('pick-list', pickedList);

            return pickedList
        }
    },
    getters: {
        pickedFilterList(state) { 
            return (value) => {
               return !value ? [] : state.list.filter((elem) => {
                    return formatDate(elem.date) >= +value[0] && formatDate(elem.date) <= +value[1]
                })
            }
        },
        pickedList(state){
            return state.pickedList
        },
        pickedListCategory(state){
            let pickedListCategory = [];

            state.pickedList.map((elem) => {

                if((formatAmount(elem['converted amount']) < 0) && pickedListCategory.indexOf(elem.category) === -1 && elem.category.indexOf('To') && elem.category.indexOf('From')) {
                    return pickedListCategory.push(elem.category)
                }
            })

            return pickedListCategory
        },
        // pickedDateList(state) {
        //     let pickedDateList = [];

        //     state.pickedList.map((elem) => {

        //         if(pickedDateList.indexOf(elem.date) === -1 && elem.category.indexOf('To') && elem.category.indexOf('From')) {
        //             return pickedDateList.push(elem.date)
        //         }
        //     })

        //     return pickedDateList
        // },
        pickedSumListToCategory(state, getters) {
            let pickedSumListToCategory = [];
            let category = getters.pickedListCategory;

            category.forEach((cat) => {

                let catArr = state.pickedList.filter((elem) => {
                  return elem.category === cat
                })

                let result = catArr.reduce((sum, current) => {
                  return sum + formatAmount(current['converted amount']);
                }, 0)

                pickedSumListToCategory.push(Math.abs(result));
            })

            return pickedSumListToCategory
        },
        pickedSumToYear: (state, getters) => (val) => {
            let pickedSumToYear = [];
            // let category = getters.pickedListCategory;

            let dataArr = state.list.filter((elem) => {
                return new Date(formatDate(elem.date)).getFullYear() == val
            })

            dataArr.forEach((el, i) => {

                // let result = catArr.reduce((sum, current) => {
                //   return sum + formatAmount(current['converted amount']);
                // }, 0)

                pickedSumToYear.push(el);
            })

            console.log(pickedSumToYear)
            return pickedSumToYear
        },
        // dataByLabel: (state) => (arg) => {
        //     let dataArr = [];

        //     state.list.map((elem) => {

        //         let date;

        //         if (arg === 'year'){
        //             date = new Date(formatDate(elem.date)).getFullYear();
        //         } else if (arg === 'month'){
        //             date = new Date(formatDate(elem.date)).getMonth();
        //         }

        //         if(dataArr.indexOf(date) === -1) {
        //             return dataArr.push(date)
        //         }
        //     })


        //    return dataArr
        // },
        // dataByData: (state,getter) => (arg) => {
        //     let dataByData = [];
        //     let years = getters.dataByLabel(arg);

        //     years.forEach((elem) => {

        //         let catArr = state.list.filter((el) => {
        //           return new Date(formatDate(el.date)).getFullYear() === elem
        //         })
        //         console.log('catArr',catArr)

        //         // let result = catArr.reduce((sum, current) => {
        //         //   return sum + formatAmount(current['converted amount']);
        //         // }, 0)

        //         // dataByData.push(Math.abs(result));
        //     })

        //     return dataByData
        // }
        // pickedIncomeOutgoList(state, getters) {
        //     let pickedIncomeOutgoList = [[],[]];
        //     let date = getters.pickedDateList;

        //     date.forEach((dd) => {

        //         let dateArr = state.pickedList.filter((elem) => {
        //           return elem.date === dd && elem.category.indexOf('To') && elem.category.indexOf('From')
        //         })
        //         // console.log('dateArr',dateArr)

        //         dateArr.forEach((elem) => {
        //             if (formatAmount(elem['converted amount']) > 0) {
        //                 pickedIncomeOutgoList[0].push(Math.abs(formatAmount(elem['converted amount'])));
        //             } else {
        //                 pickedIncomeOutgoList[1].push(Math.abs(formatAmount(elem['converted amount'])));
        //             }
        //         })

        //         // let val = dateArr.reduce((sum, current) => {
        //         //   return sum + formatAmount(current.amount);
        //         // }, 0)

        //         // pickedIncomeOutgoList.push(Math.abs(val));
        //     })

        //     console.log('pickedIncomeOutgoList',pickedIncomeOutgoList)

        //     return pickedIncomeOutgoList;
        // }

    }

});

export default store;
