<template>
  <div>
    <div class="title">标题: <input v-model="title" placeholder="填写标题" type="text"></div>

    <div><textarea v-model="message" placeholder="填写信息" name="" cols="30" rows="10"></textarea></div>
    <div class="bottom">
      <button v-on:click="handleSubmit" class="btn-gradient">提交</button>
    </div>
  </div>
</template>

<script>
  import config from '@/config.js';
  import store from '@/pages/store'
  export default {
    name: "index",
    data: {
      title: '',
      message: ''
    },
    methods: {
      handleSubmit() {
        let token=store.state.token;
        console.log(this);
        wx.request({
          url: config.message,
          data: {title: this.title, message: this.message},
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": token
          },
          success(res){
            console.log(res,'get zhi hou');
          }
        })
      }
    }
  }
</script>

<style scoped>
  .btn-gradient {
    text-decoration: none;
    color: white !important;
    width: 380 rpx;
    text-align: center;
    padding: 10px 30px;
    display: inline-block;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.21) !important;
    border-bottom: 4px solid rgba(0, 0, 0, 0.21);
    border-radius: 4px;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    background: rgba(27, 188, 194, 1);
    background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(27, 188, 194, 1)), to(rgba(24, 163, 168, 1)));
    background: -webkit-linear-gradient(rgba(27, 188, 194, 1) 0%, rgba(24, 163, 168, 1) 100%);
    height: 72 rpx;
    font-size: 50 rpx;
    line-height: 80 rpx;
  }

  .top {
    text-align: center;
    font-size: 26 rpx;
  }

  .title {
    border-bottom: 1 rpx solid #aaa;
  }

  .title input {
    display: inline-block;
    vertical-align: bottom;
  }

  textarea {
    border: 1 rpx solid #aaa;
    width: 100%;
    margin-top: 50 rpx;
  }

  .bottom {
    text-align: right;
  }
</style>
