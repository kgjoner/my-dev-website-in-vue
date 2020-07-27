import Vuex from 'vuex'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import DefaultLayout from '@/layouts/Default.vue'

import './assets/css/global.css'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


export default function (Vue, { appOptions, router, head, isClient }) {
  Vue.component('Layout', DefaultLayout)

  Vue.use(Vuex)
  appOptions.store = new Vuex.Store(store)

  Vue.use(BootstrapVue)

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Baloo+2&display=swap'
  })
}
