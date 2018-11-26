<template>
  <div class="counter-warp">
    <div style="min-height: 200rpx">
      <div class="public-wrap" v-if="firstMessage"  v-on:click="()=>handleShowMessage(firstMessage)">
        <div class="top" >
          <div class="left">
            <p style="color:#313131;font-size: 28rpx;font-weight: bold;" >
              <span style=" background-color: #f33431;padding: 5rpx;"> {{firstMessage.index}}</span>  {{firstMessage.title}}</p>
          </div>
          <div class="right">{{firstMessage.time}}></div>

        </div>
        <div class="content">
          <p class="message">{{firstMessage.subMessage}}</p>
        </div>
      </div>
    </div>

    <ul style="border:8rpx bisque dashed ;font-size: 40rpx;margin-bottom: 100rpx;color:white" v-bind:class="rolldownList">
      <li v-for="item in msgList" :key="item.msg" v-bind:style="{animationDelay:item.delay}">
        <p style="text-align: left">{{item.msg}}</p>
      </li>
    </ul>

    <div class="estimate">
      <div v-if="isShow" class="remain">L
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
      queueNumber: 0,
      isShow: false,
      rolldownList:''

    },
    computed: {
      remain() {
        let {from, to} = store.state.vars;
      let queueNumber=this.queueNumber;
        if (queueNumber < +from) {
          return '您已过号，请咨询开单室';
        }
        if (queueNumber > +to) {
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
      firstMessage(){
        let item =store.state.messageList[0];
        if(!item)return undefined;
       let time=new Date( item.time )  ;
       let span=new Date()-new Date(time);
        return span> 1000*60*60*24?undefined:store.state.messageList[0]
      },
      msgList() {
        let templates = store.state.templates||[];
        let vars = store.state.vars||[];
        return templates.map((tpl,i) => {
          let s= compose(tpl.content, vars);

          return {msg:s,delay:i*0.4+'s'};
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
      },
      handleShowMessage(item){
        let {title,message,time}=item;
        wx.navigateTo({
          url: `/pages/showMessage/main?title=${title}&message=${message}&time=${time}`
        })
      }
    },
    onShow() {
      store.commit('getVars');
      store.commit('getTemplates');
    setTimeout(()=>this.rolldownList='rolldown-list',500)
    },
  onHide(){
      this.rolldownList='';
  },
    created() {
      setInterval(() => store.commit('getVars'), 6000);
    }
  }
</script>

<style>
  .counter-warp {
    text-align: center;
    margin-top: 1 rpx !important;
  }
  .rolldown-list li:nth-child(2n) {
    background-color: #444;
  }
  .rolldown-list li:nth-child(2n+1) {
    background-color: #333;
  }
  .rolldown-list li{
    padding: 25rpx;
    margin-bottom: 10rpx;
    display: block;
    list-style: none;
  }
  .rolldown-list li {
    visibility: hidden;
    animation: rolldown .7s 1;
    transform-origin: 50% 0;
    animation-fill-mode: forwards;
  }
  @keyframes rolldown {
    0% {
      visibility: visible;
      transform: rotateX(180deg) perspective(500px);
    }
    70% {
      visibility: visible;
      transform: rotateX(-20deg);
    }
    100% {
      visibility: visible;
      transform: rotateX(0deg);
    }
  }
  .top {
       font-size: 40rpx;
       margin-bottom: 10rpx;
       overflow: hidden;
     }
  .right{
    text-align: right;
    font-size: 24rpx;
    color:#aaa;
    float: right;
  }
  .public-wrap{
    width: 90%;
    margin: auto;
    border-radius: 15rpx ;
    background-color: #e9e9e9;
    margin: 120rpx  auto ;
    margin-bottom: 50rpx;
  }
  .remain {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .content{
    text-indent: 60rpx;
    color:#666;
    display: flex;
    font-size: 32rpx;
  }
  .remain button {
    flex-basis: 30%;
  }


</style>
