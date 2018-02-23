import Vue from 'vue'
import Router from 'vue-router'

import pickedList from '@/components/pickedList'
// import infoPage from '@/components/infoPage'
import yearChart from '@/components/yearChart'

Vue.use(Router)


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'pickedList',
            component: pickedList,
            // children: [
            //     { path: '/:id', component: pickedList },
            // ]
        },
        {
          path: '/line',
          name: 'yearChart',
          component: yearChart,
        }
    ]
})
