<template>
  <div class="swiper-container" id="mySwiper" ref="banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner, index) in bannerList" :key="banner.id">
        <img :src="banner.imgUrl" :class="{active:currentIndex===index}" @click="changeDefaultIndex(index)"/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>


<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  name: "ImageList",
  props: ["bannerList"],
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    changeDefaultIndex(index){
      this.currentIndex = index
      this.$bus.$emit('changeDefaultIndex',index)
    }
  },
  watch: {
    bannerList: {
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.banner, {
            // direction: "vertical", // 垂直切换选项
            // loop: true, // 循环模式选项
            // autoplay: true,

            // 如果需要分页器
            // pagination: {
            //   el: ".swiper-pagination",
            // },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            slidesPerView:5,
            slidesPerGroup:5,

            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar",
            // },
          });
        });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>