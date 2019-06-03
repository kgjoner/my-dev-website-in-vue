import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowWidth: window.innerWidth,
    pageOrder: 1,
    allowChange: true
  },
  mutations: {
    changeWidth() {
      this.state.windowWidth = window.innerWidth;
    },
    changePage(state, direction){
      if(state.pageOrder < 3 && direction === 'down') {
        state.pageOrder += 1
      } else if (state.pageOrder > 1 && direction === 'up') {
        state.pageOrder -=1
      }
    }
  },
  actions: {

  }
})
