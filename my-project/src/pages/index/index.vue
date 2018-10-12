<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <!--  <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" />-->
      <div class="userinfo-nickname">
        <div>{{backendMsg}}</div>
        <card :text="userInfo.nickName"></card>
      </div>
    </div>
    <!--   <button   open-type="getUserInfo"
         bindgetuserinfo="bindGetUserInfo"
       >授权登录</button>-->
    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>
    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model"/>
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy"/>
    </form>
    <a href="/pages/broadcast/main" class="counter">去往管理员页面</a>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
  import card from '@/components/card'
  import testImg from '@/img/test.png'

  export default {
    data() {
      return {
        motto: 'Hello World',
        userInfo: {},
        testImg,
        backendMsg: ''
      }
    },

    components: {
      card
    },
    mounted() {

      wx.cloud.callFunction({
        name: 'auth',
      }).then((res) => {
        console.log(res);

      })

    }
    ,
    methods: {
      bindViewTap() {
        const url = '../logs/main'
        wx.navigateTo({url})
      },
      getUserInfo() {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                console.log(res, 111111111);
                this.userInfo = res.userInfo
              }
            })
          },
          complete() {
            wx.getUserInfo({
              complete(res) {
                console.log(res, 2222222222222);
              }
            })

          }
        })
      },
      clickHandle(msg, ev) {
      },
      bindGetUserInfo(e) {

      }
    },

    created() {
      // 调用应用实例的方法获取全局数据
      let that = this;
      wx.login({
        success(res){
         console.log(res,'from login');
         // 从login取 code 传后台.
         let code=res.code;
          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: function (res) {
                    console.log(res.userInfo, 333333333)
                    that.userInfo = res.userInfo;
                    wx.request({
                      url: 'https://localhost:1443/',
                      data: {
                        ...res.userInfo,
                      code:code
                      },
                      success(res) {
                        that.backendMsg = res.data
                      }
                    })// end request
                  }// end success
                })// end wxGet
              }
            }
          })


        }})



    }
  }
</script>

<style scoped>
  .userinfo {
    display: flex;
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
