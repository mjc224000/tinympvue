<template>
  <div class="counter-warp">
    <p style="text-indent: 70rpx;font-size: 60rpx;"> 当前号码为{{count}},请位于此号码前的司机来领发货单</p>
    <div class="text"> {{ count }}</div>
    <a href="/pages/index/main" class="home btn-gradient">去往首页</a>
  </div>
</template>

<script>
  // Use Vuex
  import config from '@/config.js';

  export default {
    data: {
      count: 0
    },
    computed: {
      count() {
        return store.state.count
      }
    },
    methods: {},
    created() {
      let that = this;
      wx.request({
        url: config.currentNumber,
        success: function (res) {
          that.count = res.data;
        }
      })
      setInterval(function () {
        wx.request({
          url: config.currentNumber,
          success: function (res) {
            that.count = res.data;
          }
        })
      }, 5000)
    }
  }
</script>

<style>
  .counter-warp {
    text-align: center;
    margin-top: 100px;
  }
  .btn-gradient{
    text-decoration: none;
    color: white !important;
    width:380rpx;
    text-align: center;
    padding: 10px 30px;
    display: inline-block;
    position: relative;
    border: 1px solid rgba(0,0,0,0.21) !important;
    border-bottom: 4px solid rgba(0,0,0,0.21);
    border-radius: 4px;
    text-shadow: 0 1px 0 rgba(0,0,0,0.15);
    background: rgba(27,188,194,1);
    background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(27,188,194,1)), to(rgba(24,163,168,1)));
    background: -webkit-linear-gradient(rgba(27,188,194,1) 0%, rgba(24,163,168,1) 100%);
    height: 80rpx;
    font-size: 50rpx;
    line-height: 80rpx;

  }
  .home {
    display: inline-block;
    margin: 100px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }
  .counter-warp {
    text-align: center;
    margin-top: 100px;
  }

  .home {
    display: inline-block;
    margin: 100px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }

  .text {
    font-size: 400rpx;
    background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
   -webkit-animation:hue 30s infinite linear;
  }

  @keyframes hue {
    0% {
      -webkit-filter: hue-rotate(0deg);
    }

   100% {
      -webkit-filter: hue-rotate(360deg);
    }
  }
</style>
