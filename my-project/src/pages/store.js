// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: false,
    token: null,
    from: 0,
    to: 0,
  },
  mutations: {

    updateNumber(state, stark) {
      let {from, to} = stark;
      from = parseInt(from);
      to = parseInt(to);
      state.from = from;
      state.to = to
    },
    updateFrom(state, stark) {
      stark = parseInt(stark);
      state.from = stark;
    },
    updateTo(state, stark) {
      stark = parseInt(stark);
      state.to = stark
    }
    ,
    auth(state, stark) {
      state.auth = true;
      state.token = stark;
    }
  }
})

export default store
