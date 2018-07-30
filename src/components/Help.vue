<!--帮助中心 -->
<template>
  <div>  
  <!--顶部-->
      <top-bar ></top-bar>
  <!--顶部 end -->
  帮助中心
  </div>
</template>
<script>
import TopBar from '@/components/common/TopBar'
  export default {
    name: 'Help',
    components:{
      TopBar
    },
    created(){
      
    },
    data () {
      return {
      }
    },
    methods: {
   

    
    }
  }
</script>
<style lang="less">
@import "Help.less";
</style>
