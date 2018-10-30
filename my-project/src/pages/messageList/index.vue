<template>
  <div class="wrap">
    <ul>
      <li  v-bind:class="{'alone':item.listClass,'encounter':item.wallClass,'together':item.princeClass,
      'gallary':true,
      'selected':item.messageId===selected
      }"
          v-for="item in list"
           :key="item.messageId"
           :id="item.messageId"
      >
        <div style="width: 900rpx">
          <div style="width:750rpx;height: 300rpx;float: left"     v-on:click="()=>tab(item)">
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
      list: [],
      selected: null
    },
    methods:{
      tab(e){
        let selected=this.selected;
        if (e.messageId === selected) {
          this.selected=null;
        }else {
          this.selected=e.messageId;
        }
      },
    }
    ,
    created() {
      let that = this;
      wx.request({
        url: config.messageList,
        success(res) {
          let list = res.data;
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
    transition: 0.2s ease-in-out;
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
    transform: translateX(-300rpx);

  }
</style>
