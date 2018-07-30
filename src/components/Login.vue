<!--首页 -->
<template>
  <div>  
  <!--顶部-->
      <top-bar @islogin="getIslogin"></top-bar>
  <!--顶部 end -->
    <div class="login-wrap">
      <Form ref="account"  :label-width="0" class="login-account" :model="account" :rules="loginAccountRules">
        <div class="title"></div>
        <FormItem prop="adminName">
          <Input type="text"  v-model="account.adminName" placeholder="手机号"> </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password"  v-model="account.password" placeholder="密码" > </Input>
        </FormItem>
        <FormItem prop="random">
          <Row>
              <Col span="12">
                  <Input type="text"  v-model="account.random"  placeholder="验证码" @keyup.enter.native="login('account')"> </Input>
              </Col>
              <Col span="12">
                    <img :src="validCode" @click="getValidCode()" class="login-account-validCode" />
              </Col>
          </Row>
        </FormItem>

        <Button type="primary" long  >
          <span v-if="!loading" style="width:100%;display:inline-block;"  @click="login('account')">登录</span>
          <span v-else>Loading...</span>
        </Button>
      </Form>
    </div>
  </div>
</template>
<script>
import TopBar from '@/components/common/TopBar'
  export default {
    name: 'Login',
    components:{
      TopBar
    },
    created(){
      
    },
    data () {
      return {
        // resource:'',
        //登陆信息
        account: {
          adminName: '',
          password: '',
          random: ''
        },
        //是否登陆默认false
        islogin:false,
        //验证码
        validCode:'',
        // 点击登录之后等待登录结果而不是多次点击
        loading: false,
        loginAccountRules: {
          adminName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          random: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // aduiClick(p){
      //   this.$refs[p].click();
      // },
      //获取验证码
      getValidCode(){
        this.axios({
          method:"post",
          url:'/tool/getVerificationCode',
          withCredentials: true,  
          responseType:'blob'
          })
        .then((res)=>{
          var blob = new Blob([res.data], {type: "image/png"}); 
            console.log(blob);  
          this.validCode=window.URL.createObjectURL(blob);

        }).catch((error)=>{
            console.log(error);
            this.$Message.error("错误")
         });
      },
      //登陆
      login (name) {
        this.$refs[name].validate((valid) => {
        console.log('123')
          if (valid) {
            this.loading = true
            this.axios({
               method:"post",
               url:'/account/login',
               withCredentials: true,
               data: this.Qs.stringify(this.account)
            }).
            then(res => {
              console.log(res)
              this.loading = false
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg)
                
                sessionStorage.setItem("account",JSON.stringify(res.data.data[0].account))
                sessionStorage.setItem("role",JSON.stringify(res.data.data[0].role))
                sessionStorage.setItem("rolePermissionList",JSON.stringify(res.data.data[0].rolePermissionList))
                this.$router.push('/main/welcome/'+JSON.stringify(this.pathParams))
              
              } else {
                this.$Message.error(res.data.msg)
                this.loading = false
              }
            }).catch(res => {
              this.loading = false
              this.$Message.error('系统异常')
            })
          } else {
            this.$Message.error('用户名和密码是必填项')
          }
        })
      },
      //获取子组件传递上来的值
      getIslogin(islogin){
        //console.log(111111111)
        this.islogin=islogin;
        if(islogin){
          this.$router.push("/main/welcome/"+JSON.stringify(this.pathParams))
        }else{
          //获取验证码
          this.getValidCode();
        }
      }
    }
  }
</script>
<style lang="less">
@import "Login.less";
</style>
