<template>
  <div>
    <div class="title">标题: <input v-model="title" placeholder="填写标题" size="20"type="text"></div>

    <div><textarea style="box-shadow: inset 0 0 2rpx #666"   v-model="message" placeholder="填写信息" name="" cols="30" rows="12"></textarea></div>
    <div class="bottom">
      <button v-on:click="handleSubmit" class="btn-gradient">提交</button>
    </div>
  </div>
</template>

<script>
  import config from '@/config.js';
  import store from '@/pages/store';
  import {eventEmit} from '@/utils';

  export default {
    name: "index",
    data: {
      title: '',
      message: '',
      method: 'post',
      messageId: null,
    },
    methods: {
      clear(){
        this.title = '';
        this.message = '';
        this.method = 'post';
        this.messageId = null;
      },

      handleSubmit() {
        let token = store.state.token;
        let that = this;
        // 如果没有消息 不能提交
        if(this.message.trim()===''){
          wx.showModal({
            title: '',
            content: '无内容'
          })
          return
        }
        if (this.method != 'put') {
          // 提交
          wx.request({
            url: config.message,
            data: {title: this.title, message: this.message},
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": token
            },
            success(res) {
              if (res.data === 'created') {
                wx.showModal({
                  title: '',
                  content: '提交成功'
                })
                that.clear();
               store.commit('refresh');
              } else {
                wx.showModal({
                  title: '',
                  content: '失败'
                })
              }
            }

          })
        } else {
          // put 接口 修改信息
          wx.request({
            url: config.message,
            data: {title: this.title, message: this.message, messageId: this.messageId},
            method: 'put',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": token
            },
            success(res) {
              if (res.data === 'modified') {
                wx.showModal({
                  title: '成功',
                  content: '已经修改'
                });
                that.clear();
                store.commit('refresh');
              }

            }
          })
        }
      }
    },
    onLoad: function (option) {
      console.log(option);
      if (option.from === 'index') {
        this.clear();
        return;
      }
      if (!option.messageId) return;
      let {title, message, messageId} = option;
      this.title = title;
      this.message = message;
      this.method = 'put';
      this.messageId = messageId;
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
