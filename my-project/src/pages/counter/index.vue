<template>
  <div class="counter-warp">
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
</style>
