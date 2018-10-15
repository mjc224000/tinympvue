<template>
  <div class="counter-warp">
    <p> 当前号码为：{{ count }}，请位于此号码前的司机</p>
    <div class="text"> {{ count }}</div>
    <a href="/pages/index/main" class="home">去往首页</a>

    <p class="top">
      当前排队号为{{ count }}，请处于该排队号之前的司机进入园区。
    </p>
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
