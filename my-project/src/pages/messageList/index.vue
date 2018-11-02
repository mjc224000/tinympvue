<template>
  <div class="wrap">
    <div class="logo">
    </div>
    <ul>
      <li
          v-for="item in messageList"
           :key="item.messageId"
           :id="item.messageId"
           style="width:750rpx;overflow: hidden"
      >
        <div style="width: 975rpx;  transition: 0.2s ease-in-out;" v-bind:class="{'selected':item.messageId===selected}">
          <div style="width:750rpx;height: 300rpx;float: left"     v-on:click="()=>tab(item)">
            <div class="top">
              <div class="left"><p style="color:dodgerblue"  v-on:click="()=>handleShowMessage(item)">{{item.title}}  </p></div>
              <div class="right">{{item.time}}></div>
            </div>
            <div class="content">
              {{item.subMessage}}
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
  import store from '@/pages/store';
  export default {
    name: "index",
    data: {
      list: [],
      selected: null,
      editButton:null,
      deleteButton:null
    },
    computed:{
      messageList(){
        return store.state.messageList;
      }
    },
    methods:{
      tab(e){
        if(store.state.token===null){
          return
        }
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
    , handleShowMessage(item){
        let {title,message,time}=item;
        wx.navigateTo({
          url: `/pages/showMessage/main?title=${title}&message=${message}&time=${time}`
        })
      },
      handleTouchEnd(item,type){
       this.editButton=null;
       this.deleteButton=null;
        let {title,message,messageId}=item;
        let token=store.state.token;
       if(type==='edit'){
         wx.navigateTo({
           url: `/pages/message/main?title=${title}&message=${message}&messageId=${messageId}&method=put`
         })
         return
       }
       // 为删除
       wx.showModal({
         title:'',
         content:'是否删除该条信息',
         success:function (res) {
           if(res.confirm){
       wx.request({url:config.message,method:'delete',header:{
           "Authorization": token, "Content-Type": "application/x-www-form-urlencoded"
         },data:{
           messageId:item.messageId,
         },success(){
           store.commit('refresh');
         }})

           }else {
             console.log('取消');
           }
         }
       })
      },
    } ,
    created() {
     store.commit('refresh');
    }
  }
</script>

<style scoped>
  .top {
    display: flex;
    justify-content: space-around;
    font-size: 24 rpx;
    background:  linear-gradient(to right, rgba(150,150,150,0.8), rgba(230,230,230,0.8));
    margin-bottom: 10rpx;
   text-decoration: underline;
  }
  .wrap{
    position: relative;
  }
.logo{
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  min-height: 1333rpx;
  z-index: -1;
  background-repeat: no-repeat;
  background-image:url('https://mjc224000.top/img/wllogo.jpg');
  background-size: contain;
  background-attachment: fixed;
}
  li {
    border-bottom: 1 rpx solid #aaa;
    height: 300rpx;
    box-shadow: 0 0 3rpx #aaa ;
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
    font-size: 30rpx;
    color:wheat;
  }
.content{
  text-indent: 60rpx;
  color:#666
}
  .alone {
    background: url("https://mjc224000.top/img/alone.jpg") fixed;
    color: wheat;
  }

  .encounter {
    background: url("https:///mjc224000.top/img/encounter.jpg") fixed;
    background-position: -150 rpx;
    color: black
  }

  .together {
    background: url("https:///mjc224000.top/img/together.jpg") fixed;
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
