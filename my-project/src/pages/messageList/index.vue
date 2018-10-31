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
        <div style="width: 975rpx">
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
          <div class="auth" style="height: 300rpx;float: left;width: 225rpx">
          <div class="auth-button"
               v-bind:class="{'touch-active':item.messageId==editButton}"
               v-on:touchstart="()=>handleTouchStart(item,'edit')"
               v-on:touchend="()=>handleTouchEnd(item,'edit')"> 修<br/>改</div>
         <div class="{auth-button delete-button }"
              v-bind:class="{'touch-active':item.messageId==deleteButton}"
              v-on:touchstart="()=>handleTouchStart(item,'delete')"
             v-on:touchend="()=>handleTouchEnd(item,'delete')"
         > 删<br/>除</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import config from '@/config';
  import {eventEmit} from "../../utils";
  export default {
    name: "index",
    data: {
      list: [],
      selected: null,
      editButton:null,
      deleteButton:null
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
      handleTouchStart(item,type){
          if(type==='edit'){
            this.editButton=item.messageId;
          }else{
            this.deleteButton=item.messageId;
          }
      }
    ,
      handleTouchEnd(item,type){
       this.editButton=null;
       this.deleteButton=null;
        let {title,message,messageId}=item;
       if(type==='edit'){
         wx.navigateTo({
           url: `/pages/message/main?title=${title}&message=${message}&messageId=${messageId}&method=put`
         })
         return
       }
       wx.showModal({
         title:'标题',
         content:'内容',
         success:function (res) {
           if(res.confirm){


           }else {
             console.log('取消');
           }
         }
       })
      },
    } ,
    created() {
      let that = this;
      function init() {
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
      eventEmit('refreshList',init)
      init();

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
    transform: translateX(-225rpx);

  }
  .auth{
    display: flex;
    text-align: center;
  }
  .auth-button{
    color:white;
      flex-basis:112.5rpx;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.21) !important;
    border-bottom: 4px solid rgba(0, 0, 0, 0.21);
    border-radius: 4px;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    background: rgba(27, 188, 194, 1);
    background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(27, 188, 194, 1)), to(rgba(24, 163, 168, 1)));
    background: -webkit-linear-gradient(rgba(27, 188, 194, 1) 0%, rgba(24, 163, 168, 1) 100%);
  }
  .delete-button{
    background: -webkit-linear-gradient(rgba(194, 27, 27, 1) 0%, rgba(168, 23, 23, 1) 100%);
  }
  .touch-active{
    -webkit-box-shadow:inset 0 0 20rpx #fff;
  }
</style>
