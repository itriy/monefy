import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'

import pickedList from '@/components/pickedList'
import infoPage from '@/components/infoPage'

Vue.use(Router)
Vue.use(ElementUI, {locale})

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'pickedList',
            component: pickedList,
            children: [
                { path: '/:id', component: pickedList },
            ]
        },
        {
          path: '/info',
          name: 'infoPage',
          component: infoPage,
        }
    ]
})
