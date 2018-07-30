<!-- 左侧导航-->
<template>
   <Sider class="leftbar-wrap" >
            <Menu :active-name="menuActiveName"  @on-select="menuSelect" theme="dark" width="auto">
                <Submenu name="config">
                    <template slot="title">
                        <Icon type="gear-a"></Icon>
                        配置管理
                    </template>
                    <MenuItem :name="menu.config.welcome">欢迎页</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
</template>
<script>
      export default {
    name: 'LeftBar',
    data () {
      return {
          //菜单
          menu:{},
          //活动的菜单，即显示菜单
          menuActiveName:'/main/articeCate'
       
      }
    },
    methods: {
     menuSelect(name){
         this.$router.push(name);
     },
     //初始化菜单
     initMenu(){
         let pp=JSON.stringify(this.pathParams)
         this.menu={
             //配置
            config:{
                 welcome:"/main/welcome/"+pp
            },
             //公众号
            subscription:{
                 subscription:"/main/subscription/"+pp
            },
             //签到奖品
            sign:{
                 /* sign:"/main/sign/"+pp,
                 signRecord:"/main/signRecord/"+pp, */
                 prize:"/main/prize/"+pp,
                /*  signPrize:"/main/signPrize/"+pp, */
            },
             //角色权限
            rolePermission:{
                 role:"/main/role/"+pp
            },
         }
     }
    },
    watch:{

    },
    created(){
       //判断是否超级管理员
        this.isSuperAdmin=this.business.getIsSuperAdmin()
        this.pathParams={
          currentPage:1,//当前页
          accountId:this.business.getAccount().accountId  
        }
        this.initMenu();
    //this.isSuperAdmin= this.business.getIsSuperAdmin();
    //监听点击返回
    this.Hub.$on('routerChange', (msg) => { //Hub接收事件
        //this.msg = 'hehe';
        console.log(msg)
        this.menuActiveName=msg;
    });
    }
  }
</script>
<style lang="less">
@import "LeftBar.less";
</style>
