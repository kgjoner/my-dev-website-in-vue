import Vuex from 'vuex'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VueDisqus from 'vue-disqus'
import DefaultLayout from '@/layouts/Default.vue'

import './assets/css/global.css'
import './assets/css/code-highlight.css'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


export default function (Vue, { appOptions, router, head }) {
  Vue.component('Layout', DefaultLayout)

  Vue.use(Vuex)
  appOptions.store = new Vuex.Store(store)

  Vue.use(BootstrapVue)
  Vue.use(VueDisqus, {
    shortname: 'kaiogabriel'
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=B612+Mono|Baloo+2&display=swap'
  })

  router.beforeEach((to, from, next) => {
    if(to.name === '*' && !to.fullPath.includes('/blog/')) {
      next(`/blog${to.fullPath}`)
    } else {
      next()
    }
  })
}
