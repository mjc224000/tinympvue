<template>
  <div class="counter-warp">
    <p> 当前号码为：{{ count }}，请位于此号码前的司机</p>
    <div class="text"> {{ count }}</div>
    <a href="/pages/index/main" class="home">去往首页</a>

  </div>
</template>

<script>
  // Use Vuex
  import store from './store'

  export default {
    computed: {
      count() {
        return store.state.count
      }
    },
    methods: {
      increment() {
        store.commit('increment')
      },
      decrement() {
        store.commit('decrement')
      }
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
