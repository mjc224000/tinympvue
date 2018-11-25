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
        <div  style="width: 1000rpx;  transition: 0.2s ease-in-out;display: flex; align-items: stretch" v-bind:class="{'selected':item.messageId===selected}">
          <div class="public" style="width:750rpx;"     v-on:click="()=>tab(item)">
          <div class="public-wrap">
            <div class="top">
            <div class="left"><p style="color:#313131;font-size: 28rpx;font-weight: bold;"  v-on:click="()=>handleShowMessage(item)">
            <span> {{item.index}}</span>  {{item.title}}</p></div>
            <div class="right">{{item.time}}></div>
          </div>
            <div class="content">
           <p class="message">{{item.subMessage}}</p>
            </div>
          </div>
          </div>
          <div class="auth" style="width: 250rpx">
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
          this.handleShowMessage(e);
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
    font-size: 40rpx;
    margin-bottom: 10rpx;
    overflow: hidden;
  }

 ul{
   margin-top: 50rpx;
 }
  li{
    margin-bottom: 32.52rpx;
    color: #313131;
  }
  li span{
    display: inline-block;
    width: 30rpx;
    height: 30rpx;
    color:white;
text-align: center;
    border-radius: 15%;
    margin-left: 20rpx;
    background-color: #68ecff;
  }
  li:nth-child(1) span{
    background-color: #f33431;
  }
  li:nth-child(2) span{
    background-color: #f3bb38;
  }
  li:nth-child(3) span{
    background-color: chartreuse;
  }

  .public-wrap{
    width: 90%;
    margin: auto;
    border-radius: 15rpx ;
    background-color: #e9e9e9;
  }
  .wrap{
    position: relative;
  }
.logo{
  position: fixed;
  width: 110%;
  top:0;
  left: 0;
  min-height: 1333rpx;
  z-index: -1;
  background-repeat: no-repeat;
  background-image:url('https://mjc224000.top/img/iphone2.jpg');
  background-size: cover;
  background-attachment: fixed;
}

.gallery{
  height: 300rpx;
  overflow: hidden;
}

  .right {
    text-align: right;
    font-size: 24rpx;
    color:#aaa;
    float: right;
  }
.content{
  text-indent: 60rpx;
  color:#666;
  display: flex;
  font-size: 32rpx;
}

  .selected{
    transform: translateX(-225rpx);

  }
  .auth{
    display: flex;
    text-align: center;
    justify-content: space-around;
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
