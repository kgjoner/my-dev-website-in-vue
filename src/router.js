import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import KnightofSirius from './views/KnightofSirius.vue'
import HuntersCalling from './views/HuntersCalling.vue'
import ForbiddenArts from './views/ForbiddenArts.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/cavaleiro-de-sirius',
      name: 'cavaleiro de Sirius',
      component: KnightofSirius
    }, {
      path: '/chamado-do-cacador',
      name: 'chamado do caçador',
      component: HuntersCalling
    }, {
      path: '/anseio-pelas-artes-proibidas',
      name: 'anseio pelas artes proibidas',
      component: ForbiddenArts
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
