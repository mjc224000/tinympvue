<template>
    <div class="wrap">
     <ul>
       <li class="" v-for="item in list" :key="item.messageId">
         <div class="top"><div class="left">{{item.title}}</div><div class="right">{{item.time}}></div></div>
         <div class="content">
         {{item.message}}
       </div>
         <hr/>
       </li>
     </ul>
    </div>
</template>

<script>
    export default {
        name: "index",
      data:{
          list:[ {messageId:1,message:'我是消息',title:'我是标题',time:'2018年十月24日'}]
      }
    }
</script>

<style scoped>
  .top{
    display: flex;
    justify-content: space-around;
    font-size: 24rpx;
  }
  li{
    border-bottom: 1rpx solid #aaa;
  }
  .top div{
    width: 50%;
    color: #aaa;
  }
  .right{
    text-align: right;
  }
</style>
