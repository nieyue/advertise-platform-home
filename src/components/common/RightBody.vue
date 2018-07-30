<!-- 右侧主体 -->
<template>
  <Layout class="rightbody-wrap">
            <!-- <Header class="rightbody-header" >
                <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
            </Header> -->
            <content class="rightbody-content">
                <Breadcrumb class="rightbody-content-crumb">
                    <BreadcrumbItem>主页</BreadcrumbItem>
                    <BreadcrumbItem > {{$route.name}}</BreadcrumbItem>
                </Breadcrumb>
                 <div style="display:inline-block">
                    <Button type="info" size = 'small' @click="goBack">返回</Button>
                </div>
                <Card class="rightbody-content-body" >
                    <div style="height: auto">
                         <router-view></router-view>
                    </div>
                </Card>
            </content>
        </Layout>
</template>
<script>
    export default {
    name: 'RightBody',
    created(){
        
    },
    data () {
      return {
       
      }
    },
    methods: {
    //返回历史路径
     goBack () {
       // this.$router.go(-1)
        this.$router.back()
        console.log(this.$router)
        console.log(this.$router.history.current.fullPath)

       setTimeout(()=>{
            this.Hub.$emit('routerChange',this.$router.history.current.fullPath); //Hub触发事件
       },200)
      },
    } 
  }
</script>
<style lang="less">
@import "RightBody.less";
</style>