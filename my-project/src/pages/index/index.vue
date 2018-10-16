<template>
  <div class="container">

    <div class="userinfo" @click="bindViewTap">

      <div style="width: 120rpx" v-if=" userInfo && userInfo.avatarUrl">
        <img style="width: 120rpx ;height:120rpx" class="userinfo-avatar" :src="userInfo.avatarUrl"/>
      </div>
      <button v-else open-type="getUserInfo"
              @getuserinfo="bindGetUserInfo"
      >授权登录
      </button>
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

      <a v-if="isAuth"  href="/pages/broadcast/main" class="counter">去往管理员页面</a>
    <a href="/pages/counter/main" class="counter">查看当前牌号</a>
  </div>
</template>

<script>
  import card from '@/components/card'
  import config from '@/config.js';
 import store from '@/pages/store'
  export default {
    data() {
      return {
        motto: 'Hello World',
        userInfo: {},
        backendMsg: ''
      }
    },

    components: {
      card
    },
    mounted() {

    },
  computed:{
     isAuth(){
       return store.state.auth;
     }
  }
  ,

    methods: {
      bindViewTap() {
        const url = '' +
          '../logs/main'
        wx.navigateTo({url})
      },
      bindGetUserInfo(e) {
        console.log(e, 'user info');
        let that = this;
        this.userInfo = e.target.userInfo;
        wx.login({
          success(res) {
            // 从login取 code 传后台.
            let code = res.code;
            wx.request({
              url: config.auth,
              data: {
                ...e.target.userInfo,
                code: code
              },
              success(res) {
                that.backendMsg = res.data
                if (res.data.userType === 1) {
                  store.commit('auth');
                  wx.navigateTo({url: '/pages/broadcast/main'})
                } else {
                  wx.navigateTo({url: '/pages/counter/main'})
                }
              }
            })// end request
          }
        })
      }
    },

    created() {
      // 调用应用实例的方法获取全局数据
      let that = this
      wx.getUserInfo({
        success: function (res) {
          let userInfo = res.userInfo;
          that.userInfo = res.userInfo
          wx.login({
            success(res) {
              console.log(res, 'from login')
              // 从login取 code 传后台.
              let code = res.code;
              wx.request({
                url: config.auth,
                data: {
                  ...userInfo,
                  code: code
                },
                success(res) {
                  if (res.data.userType === 1) {
                    store.commit('auth');
                    wx.navigateTo({url: '/pages/broadcast/main'})
                  } else {
                    wx.navigateTo({url: '/pages/counter/main'})
                  }

                }
              })// end request
            }
          })
        },// end success
        fail() {
          wx.navigateTo({url: '/pages/counter/main'})
        }
      })// end wxGet

    }
  }
</script>

<style scoped>
  .userinfo {

    flex-direction: column;
    align-items: center;
  }

  .userinfo-avatar {
    width: 128 rpx;
    height: 128 rpx;
    margin: 20 rpx;
    border-radius: 50%;
  }

  .userinfo-nickname {
    color: #aaa;
  }

  .usermotto {
    margin-top: 150px;
  }

  .form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
  }

  .counter {
    display: inline-block;
    margin: 10px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }
</style>
