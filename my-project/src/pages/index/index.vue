<template>
  <div class="container">

    <div class="userinfo">

      <div style="width: 120rpx" v-if=" userInfo && userInfo.avatarUrl">
        <img style="width: 120rpx ;height:120rpx" class="userinfo-avatar" :src="userInfo.avatarUrl"/>
      </div>
      <button v-else open-type="getUserInfo"
              @getuserinfo="bindGetUserInfo"
      >授权登录
      </button>
      <div class="userinfo-nickname">
        <card :text="userInfo && userInfo.nickName||''"></card>
      </div>
    </div>

    <div style="color:red;padding-top:100rpx;margin-bottom: 200rpx;font-size: 60rpx;font-weight: bold"> 柳钢物流园欢迎您</div>
    <a v-if="isAuth" href="/pages/message/main?from=index" class="counter btn-gradient">消息管理</a>
    <a v-if="isAuth" href="/pages/broadcast/main" class="counter btn-gradient">牌号管理</a>
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
        userInfo: {}
      }
    },

    components: {
      card
    },
    mounted() {

    },
    computed: {
      isAuth() {
        return store.state.auth;
      },
      banner(){
        return store.state.messageList[0] && store.state.messageList[0].message || '';
      }
    }
    ,

    methods: {

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
                if (res.data.userType === 1) {
               let token= res.data.token;
                  store.commit('auth',token);
                  console.log('有权限',res)
                //  wx.navigateTo({url: '/pages/broadcast/main'})
                } else {
                  console.log('我没有权限',res)
                 // wx.navigateTo({url: '/pages/counter/main'})
                }
              }
            })// end request
          }
        })
      }
    },

    created() {
      // 调用应用实例的方法获取全局数据
      let that=this;
      wx.getUserInfo({
        success(res){
        that.userInfo=res.userInfo;
        },
        fail(e){
        }
      })
      wx.login({
        success(res) {
          console.log(res, 'from login')
          // 从login取 code 传后台.
          let code = res.code;
          wx.request({
            url: config.auth,
            data: {
              code: code
            },
            success(res) {
              if (res.data.userType === 1) {
                let token= res.data.token;
                store.commit('auth',token);
                console.log('有权限',res)
                wx.navigateTo({url: '/pages/broadcast/main'})
              } else {
                console.log('我没有权限',res)
                wx.navigateTo({url: '/pages/counter/main'})
              }
            }
          })// end request
        }
      });

    }
  }
</script>

<style scoped>

  .userinfo {

    flex-direction: column;
    align-items: center;
  }

  .btn-gradient {
    text-decoration: none;
    color: white !important;
    width: 380 rpx;
    text-align: center;
    padding: 10px 30px;
    display: inline-block;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.21) !important;
    border-bottom: 4px solid rgba(0, 0, 0, 0.21);
    border-radius: 4px;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    background: rgba(27, 188, 194, 1);
    background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(27, 188, 194, 1)), to(rgba(24, 163, 168, 1)));
    background: -webkit-linear-gradient(rgba(27, 188, 194, 1) 0%, rgba(24, 163, 168, 1) 100%);
    height: 80 rpx;
    font-size: 50 rpx;
    line-height: 80 rpx;

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
