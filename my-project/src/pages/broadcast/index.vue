<template>
  <div>
    <ul>
      <li v-for="item in tpl" :key="item">
        <p style="color:#72aaa7">{{item}}</p>
      </li>
    </ul>
    <p class="top">

    </p>
    <ul style="margin-top: 100rpx">
      <li v-for="item in varList" :key="item.varId" v-bind:class="{green:item.type==='from'||item.type==='to'}">
        <div class="button-wrap">
          <div style="display: flex;width: 70%;justify-content: space-between">
            <p> {{item.disc}}:</p>
            <input type="number" class="small text" v-model=" item['value']">
          </div>
          <input class="button" type="button" value="确定" v-on:click="()=>handleSubmit(item)"/>
        </div>
      </li>
    </ul>

  </div>

</template>

<script>
  import store from '@/pages/store';
  import config from '@/config.js';

  export default {
    data: {
      varList: [],
      tpl: [],
      from: {},
      to: {}
    },
    methods: {
      handleSubmit(item) {
        let token = store.state.token;
        console.log(item);
        let that = this;
        wx.request({
          url: config.statistic,
          method: "post",
          header: {
            "Authorization": token, "Content-Type": "application/x-www-form-urlencoded"
          },
          data: item,
          success() {
            that.getTpl();
          }
        })
      },
      handleFromToSubmit() {
        let {from, to} = this;
        this.handleSubmit(from);
        this.handleSubmit(to);
      }
      ,
      getList() {
        let that = this;
        wx.request(
          {
            url: config.var, method: 'get',
            header: {
              "Authorization": store.state.token, "Content-Type": "application/x-www-form-urlencoded"
            },
            success(res) {
              let data = res.data || [];

              data.forEach((v, i) => {
                v.index = i;
                v.value = v.latest_value;});
              that.varList=data;
            }
          })
      },
      getTpl() {
        let that = this;
        wx.request({
          url: config.statistic,
          method: 'get',
          success(res) {
            console.log(res.data);
            let tpls = res.data;
            tpls = tpls.map((v) => v.compose);
            that.tpl = tpls;
            console.log(tpls);
          }
        })
      }
    },
    onShow() {

      this.getList();
      this.getTpl();
    },
  }
</script>

<style scoped>
  .button {
    margin: 0;
    flex-basis: 20%;
  }
.green{
  border:1rpx solid rgba(0,225,0,0.3);
}
  input {
    height: 68 rpx;
    line-height: 68 rpx
  }

  .small {
    width: 15%;
  }

  .border {
    border: 1 rpx solid #ddd5d5;
  }

  .button-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    height: 82 rpx;
    line-height: 2.55555556;
    text-align: center;
    border-radius: 4 rpx;

  }

  .top {
    text-indent: 70 rpx;
    padding-top: 100 rpx;
  }

  .bottom {
    width: 100%;
    position: fixed;
    bottom: 200 rpx;
  }

  .button {
    width: 100%;
    height: 82 rpx;
  }
</style>
