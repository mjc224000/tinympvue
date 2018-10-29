<template>
  <div class="wrap">
    <ul>
      <li  v-bind:class="{'alone':item.listClass,'encounter':item.wallClass,'together':item.princeClass,
      'gallary':true,
      'selected':item.selected
      }"
          v-for="item in list" :key="item.messageId"
      v-on:click="tab"
      >
        <div style="width: 900rpx">
          <div style="width:750rpx;height: 300rpx;float: left">
            <div class="top">
              <div class="left">{{item.title}}</div>
              <div class="{right}">{{item.time}}></div>
            </div>
            <div class="content">
              {{item.message}}
            </div>
            <hr/>
          </div>
          <div class="auth" style="height: 300rpx;float: left;width: 120rpx"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import config from '@/config';

  export default {
    name: "index",
    data: {
      list: []
    },
    methods:{
      tab(e){
        console.log(e);
      }
    }
    ,
    created() {
      let that = this;
      wx.request({
        url: config.messageList,
        success(res) {
          let list = res.data;
          console.log(list);
          list.forEach((v, i) => {
            switch (i % 3) {
              case 0:
                v.listClass = true;
                break;
              case 1:
                v.wallClass = true;
                break;
              case 2:
                v.princeClass = true;
                break;
            }
          })
          that.list = list;
          console.log(res.data);
        }
      })
    }
  }
</script>

<style scoped>
  .top {
    display: flex;
    justify-content: space-around;
    font-size: 24 rpx;
  }

  li {
    border-bottom: 1 rpx solid #aaa;
    height: 300rpx;
  }
.gallery{
  height: 300rpx;
  overflow: hidden;
}
  .top div {
    width: 50%;
  }

  .right {
    text-align: right;
  }

  .alone {
    background: url("https://localhost/img/alone.jpg") fixed;
    color: wheat;
  }

  .encounter {
    background: url("https://localhost/img/encounter.jpg") fixed;
    background-position: -150 rpx;
    color: black
  }

  .together {
    background: url("https://localhost/img/together.jpg") fixed;
    background-position: -400 rpx;
    color: black;
  }
  .selected{
    transform: translateX(-120rpx);
    transition: 0.5s ease-in-out;
  }
</style>
