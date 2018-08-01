<!-- 顶部 -->
<template>
    <div class="topbar">
        <div class="topbar-left">
           <img src="/static/logo.jpg" style="width:80px;height:80px;"/>
            <span class="topbar-left-title">雅耀广告平台</span>
        </div>
        <div class="topbar-nav" v-if="!islogin">
          <a v-for="nav in navs" @click="navclick(nav)" :style="{color:nav.href==currentnav?'#4cb5ff':'#000'}">{{nav.value}}</a>
        </div>
        <div class="topbar-loginregister" v-if="!islogin">
          <!-- <Button size="large" @click="gologinpage">登录</Button> -->
          <router-link class="footer-bar-company" to="/login"><Button size="large" type="primary" ghost>登录</Button></router-link>
          <Button size="large" type="primary">注册</Button>
        </div>
        <div class="topbar-right" v-if="islogin">
            <span  class="topbar-right-logintext" v-text="account.realname||account.nickname||account.phone" ></span>
            <Button type="text"  class="topbar-right-loginout" @click="loginout">退出</Button>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'TopBar',
    created(){ 
       this.routerPath=this.$route.path;
       //设定当前路径显示
       this.currentnav=this.routerPath;
       
      if(this.routerPath.indexOf("/main")>-1||this.routerPath.indexOf("/login")>-1){
        //是否登陆
        this.getIslogin();
       }
    },
    watch: {
  //   //监听父组件的变量
  //  'isLogin': function (n, o) {
  //    console.log(n)
  //   this.islogin=n;
  //  },
  //   //监听自身的变量
  //  'islogin': function (n, o) {
  //    console.log(n)
  //   this.islogin=n;
  //  }
  },
    data () {
      return {
        routerPath:this.$route.path,
        islogin:false,
        account:{},
        //导航栏
        navs:[
          {
            href:'/index',value:'首页',
          },
          {
            href:'/weixinspread',value:'微信推广',
          },
          {
            href:'/subscriptionfuns',value:'公众号涨粉',
          },
          {
            href:'/channelorder',value:'媒体接单',
          },
          {
            href:'/help',value:'帮助中心',
          }
        ],
        //当前导航
        currentnav:'/index',
      }
    },
    methods: {
      //导航点击
      navclick(nav){
        //location.href=nav.href;
        this.$router.push(nav.href);
      },
      //跳转到登陆页面
      gologinpage(){
        this.$router.push("/login");
      },
      //退出登陆
     loginout(){
      this.$Modal.confirm({
              title: '退出登陆？',
              content: '<p>确定退出登陆吗？</p>',
              onOk: () => {
                this.axios({
                method:"post",
                url:'/account/loginout?accountId='+this.business.getAccount().accountId,
                withCredentials: true
              }).
              then(res => {
                console.log(res)
                if (res.data.code == 200) {
                  this.islogin=true;
                  sessionStorage.clear();
                  this.$emit("islogin",this.islogin);
                  this.$Message.success('退出成功！');
                  this.$router.push('/login')
                } else {
                  this.$emit("islogin",this.islogin);
                  this.$Message.error('失败')
                }
              }).catch(res => {
                this.$Message.error('系统异常')
              })
              },
              onCancel: () => {
                  this.$Message.success('取消成功！');
              }
          });
     },
      //验证是否登陆
      getIslogin(){
        if(!sessionStorage.getItem("account")){
          sessionStorage.clear()
          this.$emit("islogin",this.islogin);
          this.$router.push('/login')
          this.$Message.info('请登录')
          return;
        }
        this.axios({
               method:"post",
               url:'/account/islogin',
               withCredentials: true
            }).
            then(res => {
              console.log(res)
              if (res.data.code == 200) {
                this.islogin=true;
                //设置本地account
                this.account=res.data.data[0];
                this.$emit("islogin",this.islogin);
                //this.$router.push('/main')
              } else {
                sessionStorage.clear()
                this.$emit("islogin",this.islogin);
                this.$router.push('/login')
                this.$Message.info('请登录')
              }
            }).catch(res => {
              this.$Message.error('系统异常')
            })
      }
    }
  }
</script>
<style lang="less">
@import "TopBar.less";
</style>
