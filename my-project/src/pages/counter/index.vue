<template>
  <div class="counter-warp">
    <ul style="border:8rpx bisque dashed ;font-size: 40rpx;margin-bottom: 100rpx">
      <li v-for="item in msgList" :key="item">
        <p>{{item}}</p>
      </li>
    </ul>

    <div class="estimate">
      <div v-if="isShow" class="remain">
        <div class="right">{{remain}}</div>
        <button v-on:click="handleToggle" class="">返回</button>
      </div>
      <div v-else class="remain">
        <input class="right" placeholder="请输入查询号"
               style="box-shadow: inset 0 0 8rpx #18A3A8;height:90rpx; font-size: large" type="number"
               v-model="queueNumber">
        <button v-on:click="handleToggle" class="">查询</button>
      </div>
    </div>
  </div>
</template>
<script>
  // Use Vuex
  import store from '@/pages/store'

  function compose(string, vars) {
    vars = vars || key;
    for (let key in vars) {
      string = string.replace("${"+key+"}", vars[key]);
    }
    return string;
  }

  export default {
    data: {
      from: 0,
      to: 0,
      queueNumber: null,
      isShow: false
    },
    computed: {
      remain() {
        let {from, to, queueNumber} = this;
        console.log(from, to, queueNumber)
        if (queueNumber < +from) {
          return '您已过号，请咨询开单室';
        }
        if (queueNumber > to) {
          console.log(typeof queueNumber, typeof to);
          let remain = (queueNumber - to) * 60 / 16;
          let hours = parseInt(remain / 60);
          let minutes = hours % 60;
          if (hours) {
            return '预计' + hours + '小时' + minutes + '分钟后领取发货单';
          }
          return '预计' + parseInt((queueNumber - to) * 60 / 16) + '分钟后领取发货单';
        }
        if (queueNumber) {
          return '请及时办理装车业务。'
        }
      },
      msgList() {
        let templates = store.state.templates;
        let vars = store.state.vars;
        return templates.map((tpl) => {
          let s= compose(tpl.content, vars);
          console.log(s);
          return s
        })
      }
    }
    ,
    methods: {
      handleToggle() {
        if (this.queueNumber == 0) {
          wx.showModal({
            title: '',
            content: '请输入数字'
          })
          return
        }
        this.isShow = !this.isShow;
      }

    },
    onShow() {
      store.commit('getVars');
      store.commit('getTemplates');
    },
    created() {

      setTimeout(() => store.commit('getVars'), 1000);

    }
  }
</script>

<style>
  .counter-warp {
    text-align: center;
    margin-top: 1 rpx !important;
  }

  .remain {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .remain button {
    flex-basis: 30%;
  }

  .text span {
    font-size: 160 rpx;
    background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-animation: hue 30s infinite linear;
    font-weight: bold;
  }

  @keyframes hue {
    0% {
      -webkit-filter: hue-rotate(0deg);
    }

    100% {
      -webkit-filter: hue-rotate(360deg);
    }
  }
</style>
