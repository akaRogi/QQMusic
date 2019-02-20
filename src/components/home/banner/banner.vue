<template>
  <div class="banner">
    <swiper :options="swiperOption" ref="mySwiper" v-if="data.length">
      <swiper-slide
        v-for="(item,index) in data"
        :key="index"
      ><img :src="item.pic_info.url" alt=""></swiper-slide>
      <div class="swiper-pagination "  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'banner',
  props: ['data'],
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        // 循环
        loop: true,
        // 设定初始化时slide的索引
        initialSlide: 0,
        // 自动播放
        autoplay: true,
        // autoplay: {
        //     delay: 3000,
        //     stopOnLastSlide: false,
        //     disableOnInteraction: true,
        // },
        // 设置轮播
        // effect: 'flip',
        // 滑动速度
        speed: 800,
        // 滑动方向
        direction: 'horizontal',
        // 小手掌抓取滑动
        // grabCursor : true,
        // 滑动之后回调函数
        on: {
          slideChangeTransitionEnd: function () {
            // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          }
        },
        // 左右点击
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // 分页器设置
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      swiperSlides: [1, 2, 3, 4]
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    // 可以使用swiper这个对象去使用swiper官网中的那些方法
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(0, 0, false);
  }
}
</script>

<style scoped>
.banner{
  height: 300px;
  margin-bottom: 40px;
}
</style>
