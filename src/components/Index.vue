<!--首页 -->
<template>
  <div>  
  <!--顶部-->
      <top-bar ></top-bar>
  <!--顶部 end -->
  <div style="margin-top:82px;"></div>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="/static/banner1.png" style="height:600px;width:100%;min-width:1200px;" alt="">
        <div style="position:absolute;left:2rem;top:5rem;color:#fff;font-size:3rem;" >优质媒体资源 覆盖亿级粉丝用户</div>
        <div style="position:absolute;left:2rem;top:10rem;color:#fff;font-size:2.8rem;" >按需定制推广方案 智能匹配媒体精准投放 转化成本更低</div>
        <div style="width:100%;height:128px;position:absolute;left:0;bottom:0;color:#fff;font-size:2rem;background-color:#fff;opacity:0.2" >
        </div>
        <div style="width:100%;height:128px;position:absolute;left:0;bottom:0;color:#fff;font-size:2rem;" >
          <div style="display:inline-block;">sdf</div>
          <div  style="display:inline-block;">sdf</div>
          <div  style="display:inline-block;">sdf</div>
        </div>
      </div>
      <div class="swiper-slide">
        <img src="/static/banner2.png" style="height:600px;width:100%;min-width:1200px;" alt="">
      </div>
    </div>
        <div class="swiper-pagination" style="bottom:128px;"></div>
  </div>
  </div>
</template>
<script>
import TopBar from '@/components/common/TopBar'
import Swiper from 'swiper'; 
import 'swiper/dist/css/swiper.min.css';
  export default {
    name: 'Index',
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
   

    
    },
    mounted(){
       var mySwiper = new Swiper('.swiper-container', {
          autoplay:true,
          loop:true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          }
        })
    }
  }
</script>
<style lang="less">
@import "Index.less";
</style>
