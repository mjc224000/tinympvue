<template>
  <div>
    {{test}}
    <p class="top">
      当前号码为 <span style="color:red;font-size: 60rpx;">{{count}} </span>,请位于此号码前的司机来领发货单
    </p>
    <div>
      <div class="bottom">
        <!--<div class="button-wrap">
          <textarea class="border" cols="20" rows="5"> </textarea>
        </div>-->
        <form action=""></form>
        <div class="button-wrap">

          <input size="30" style="height: 68rpx;line-height: 68rpxvc " class="small text" type="text" placeholder="输入数字" v-model="counter"
                 @confirm="handleConfirm"/>
          <button class="small" v-on:click="increment">+</button>
          <button class="small" v-on:click="decrement">-</button>
        </div>
<!--    <button class="button" @click="increment"> 发送消息</button>-->
      </div>
    </div>
  </div>

</template>

<script>
  import store from '@/pages/store';
  import config from '@/config.js';

  function asyncReq(value) {
    return new Promise(function (resolve) {
      wx.request({
        url: config.update,
        data: {
          updateNumber: value
        },
        success(res) {
          if (res.data === 'ok') {
            resolve(res);
          }
        }
      })
    })
  }

  export default {
    methods: {
      increment() {
        let value = store.state.count + 1;
        asyncReq(value).then(() => {
          store.commit('increment');
        })
      }
      ,
      decrement() {
        let value = store.state.count - 1;
        asyncReq(value).then(() => {
          store.commit('decrement')
        })

      },
      handleConfirm(e) {
        let reg = /[^0-9]/;
        if (!reg.test(e.target.value)) {
          asyncReq(e.target.value).then(function () {
            store.commit('updateNumber', e.target.value)
          })
        }

      },
    },
    created() {
      wx.request({
        url: config.currentNumber,
        success(res) {
          store.commit('updateNumber', res.data)
        }
      })
    },
    data: {
      test: ''
    },
    computed: {
      count() {
        return store.state.count
      },
      counter: {
        get() {
          return store.state.count
        },
        set(value) {
          // store.commit('updateNumber',value);
        }
      }
    }
  }
</script>

<style>
  .small {
    width: 25%;
  }

  .border {
    border: 1 rpx solid #ddd5d5;
  }

  .button-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .text {
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    height: 82 rpx;
    line-height: 2.55555556;
    text-align: center;
    border-radius: 4 rpx;
  }

  .top {
    text-indent: 70rpx;
    padding-top: 100rpx;
  }

  .bottom {
    width: 100%;
    position: fixed;
    bottom: 200rpx;
  }

  .button {
    width: 100%;
    height: 82 rpx;
  }
</style>
