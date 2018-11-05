<template>
  <div>
  <div style="overflow: hidden ">
    <div class="title">{{title}}</div>
    <div style="float: right" > {{time}} </div>
  </div>
    <div style="text-indent: 72rpx;margin-top: 50rpx"> {{message}} </div>
  </div>
</template>

<script>
    export default {
        name: "index.vue",
      data: {
        title: '',
        message: '',time:'',
      },
      onLoad(option){
        let {title, message,time} = option;
        this.title = title;
        this.message = message;
        this.time=time;
        console.log(title,message,time);
      }
    }
</script>

<style scoped>
  .top {
    text-align: center;
    font-size: 26 rpx;
  }

  .title {
    border-bottom: 1 rpx solid #aaa;
   text-align: center;
  }

</style>
