// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    auth: false,
    token:null
  },
  mutations: {
    increment: (state) => {
      let {count} = state
      state.count = parseInt(count) + 1
    },
    decrement: (state) => {
      let {count} = state
      state.count = Math.max(0, parseInt(count) - 1)
    },
    updateNumber(state, stark) {
      state.count = parseInt( stark  ) ;
    },
    auth(state,stark) {
      state.auth=true;
      state.token=stark;
    }
  }
})

export default store
