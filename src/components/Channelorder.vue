<!--媒体接单 -->
<template>
  <div>  
  <!--顶部-->
      <top-bar ></top-bar>
  <!--顶部 end -->
  <div>
  媒体接单

  </div>
  </div>
</template>
<script>
import TopBar from '@/components/common/TopBar'
  export default {
    name: 'Channelorder',
    components:{
      TopBar
    },
    created(){
      console.log(111)
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
@import "Channelorder.less";
</style>
