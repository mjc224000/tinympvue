<template>
  <div>
    <p class="top">
      当前号码为 <span style="color:red;font-size: 60rpx;">{{from}}-{{to}} </span>,请位于此号码之间的司机来领发货单
    </p>
    <div>
      <div class="bottom">
        <!--<div class="button-wrap">
          <textarea class="border" cols="20" rows="5"> </textarea>
        </div>-->
        <form action=""></form>
        <div class="button-wrap">
          <input size="30" style="height: 68rpx;line-height: 68rpx" class="small text" type="text" placeholder="起始"
                 v-model="Tfrom"
                 @confirm="handleFromConfirm"/>
          <input size="30" style="height: 68rpx;line-height: 68rpx " class="small text" type="text" placeholder="结束"
                 v-model="Tto"
                 @confirm="handleToConfirm"/>
          <input type="button" value="完成" v-on:click="handleSubmit">
        </div>
        <!--    <button class="button" @click="increment"> 发送消息</button>-->
      </div>
    </div>
  </div>

</template>

<script>
  import store from '@/pages/store';
  import config from '@/config.js';

  function asyncReq(option) {
    return new Promise(function (resolve) {
      wx.request({
        ...option,
        success(res) {
          if (res.data === 'ok') {
            resolve(res);
          }
        }
      })
    })
  }

  export default {
    data: {
      Tfrom: 0,
      Tto: 0
    },
    methods: {
      handleFromConfirm(e) {
        let reg = /^0-9/;
        let value = e.target.value;
        console.log(value);
        if (reg.test(value)) return;
        asyncReq({
          url: config.from,
          method: 'put',
          data: {from: value}
        }).then(() => store.commit('updateFrom', value));
      }
      ,
      handleToConfirm(e) {
        let reg = /^0-9/;
        let value = e.target.value;
        if (reg.test(value)) return;
        asyncReq({
          url: config.to,
          method: 'put',
          data: {to: value}
        }).then(() => store.commit('updateTo', value))
      },
      handleSubmit() {
        let {Tfrom, Tto} = this;
        if (+Tfrom > +Tto) {
          return
        }
        let reg = /[^0-9]/;
        if (reg.test(Tfrom) || reg.test(Tto)) {
          return
        }
        asyncReq({
          url: config.queue,
          method: 'put',
          data: {
            from: Tfrom,
            to: Tto
          }
        }).then(() => store.commit('updateNumber', {from: Tfrom, to: Tto}))
      },
    },
    created() {
      let that=this;
      wx.request({
        url: config.queue,
        success(res) {
          let {from,to}=res.data;
          store.commit('updateNumber', {from,to});
          console.log(from,to,'create')
          that.Tfrom=from;
          that.Tto=to;
        }
      })
    },
    computed: {
      from() {
        return store.state.from
      },
      to() {
        return store.state.to
      }
    }
  }
</script>

<style scoped>
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
