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
    messageList:[]
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
    },
    updateMessageList(state,stark){
      state.messageList=stark;
    },
    refresh(state){
      wx.request({
        url: config.messageList,
        headers:{

        },
        success(res) {
          let list = res.data;
          list.forEach((v, i) => {
         /*   switch (i % 3) {
              case 0:
                v.listClass = true;
                break;
              case 1:
                v.wallClass = true;
                break;
              case 2:
                v.princeClass = true;
                break;
            }*/
            v.subMessage=v.message.substring(0,40);
            if(v.subMessage.length===40){
              v.subMessage=v.subMessage+'...';
            }
          })

          state.messageList=list;
        }
      })
    }
  }
})

export default store
