<template>
    <div class="wrap">
     <ul>
       <li v-bind:class="{'_list':item.listClass,'wall':item.wallClass,}" v-for="item in list" :key="item.messageId">
         <div class="top"><div class="left">{{item.title}}</div><div class="{right}">{{item.time}}></div></div>
         <div class="content">
         {{item.message}}
       </div>
         <hr/>
       </li>
     </ul>
    </div>
</template>

<script>
  import config from '@/config';
    export default {
        name: "index",
      data:{
          list:[ {messageId:1,message:'我是消息',title:'我是标题',time:'2018年十月24日'}]
      },
      created(){
          let that=this;
          wx.request({
            url:config.messageList,
            success(res){
                      let list=res.data;
              list.forEach((v,i)=>{
                switch (i%2) {
                  case 0:v.listClass=true;
                    console.log(1);
                    break;
                  case 1:v.wallClass=true;break;
                }
              })
          that.list=list;
              console.log(res.data);
            }
          })
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
    height: 300rpx;
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
/*  li:nth-child(odd){
    background:url("https://localhost/img/list.jpg") fixed;
  }*/
 /* li:nth-child(even){
    background: url("https://localhost/img/wall.jpg") fixed;
  }*/
  ._list{
    background: url("https://localhost/img/list.jpg") fixed;
  }
  .wall{
    background: url("https://localhost/img/wall.jpg") fixed;
  }
</style>
