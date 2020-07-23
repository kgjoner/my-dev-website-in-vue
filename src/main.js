import Vuex from 'vuex'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Toasted from 'vue-toasted'
import registerToasters from './toaster'
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

  Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 5000
  })
  registerToasters(Vue)

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=B612+Mono|Baloo+2&display=swap'
  })
}
