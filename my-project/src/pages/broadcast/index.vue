<template>
  <div>
    {{test}}
    <p class="top">
      当前排队号为{{ count }}，请处于该排队号之前的司机进入园区。
    </p>
    <div>
      <div class="bottom">
        <div class="button-wrap">
          <textarea class="border" cols="20" rows="5"> </textarea>
        </div>
        <form action=""></form>
        <div class="button-wrap">

          <input size="30" class="small text" type="text" v-model="counter" @confirm="handleConfirm"/>
          <button class="small" v-on:click="increment">+</button>
          <button class="small" v-on:click="decrement">-</button>
        </div>
        <button class="button" @click="increment"> 发送消息</button>
      </div>
    </div>
  </div>

</template>

<script>
  import store from './store';
  import config from '@/config.js';

  export default {
    methods: {
      increment() {
        store.commit('increment');

      },
      decrement() {
        store.commit('decrement')
      },
      handleConfirm(e) {

        wx.request({
          url: config.update,
          data: {
            updateNumber: e.target.value
          },
          success(res) {
            if (res.data === 'ok') {
              store.commit('updateNumber', e.target.value)
            }
          }
        })
      },
      created() {
        wx.request({
          url: config.currentNumber,
          success(res) {
            store.commit('updateNumber', res.data)
          }
        })
      }
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
    text-indent: 70 rpx;
  }

  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
  }

  .button {
    width: 100%;
    height: 82 rpx;
  }
</style>
