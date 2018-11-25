// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: false,
    token: null,
    from: 0,
    to: 0,
    messageList: [],
    vars: [],
    templates: []
  },
  mutations: {

    getVars(state) {
      wx.request({
        url: config.statistic + '/vars',
        success(res) {
          state.vars = res.data;
        }
      })

    }
    ,
    getTemplates(state) {
      wx.request({
        url: config.statistic + '/templates',
        success(res) {
          console.log(res.data, 'templates');
          state.templates = res.data;
        }
      })
    }
    ,
    auth(state, stark) {
      state.auth = true;
      state.token = stark;
    },
    updateMessageList(state, stark) {
      state.messageList = stark;
    },
    refresh(state) {
      wx.request({
        url: config.messageList,
        headers: {},
        success(res) {
          let list = res.data;
          list.forEach((v, i) => {
            v.index = i + 1;
            v.subMessage = v.message.substring(0, 45);
            v.title = v.title.substring(0, 20);
            if (v.subMessage.length === 45) {
              v.subMessage = v.subMessage + '...';
            }
          })
          state.messageList = list;
        }
      })
    }
  }
})

export default store
