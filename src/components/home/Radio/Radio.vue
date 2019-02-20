<template>
 <div class="Radio">
   <router-link
     tag="li"
     class="RadioBox"
     to="/NewPlate"
   >
     <img :src="DieImgT + oneDie.album_mid + DieImgH" alt="">
     <div class="DieTitle">
       <span>新碟首发</span>
     </div>
   </router-link>
   <div class="GdBox">
     <router-link
       tag="div"
       class="otherBox"
       to="/NewSong"
     >
       <div class="NewSong">
         <div class="Text">
           <p>新歌首发</p>
           <p><span
            v-for="(item,index) in oneData.singer"
            :key="index"
           >{{item.name}}</span></p>
         </div>
         <div class="ImgBox">
           <!--bug待解决：在页面刷新的时候，这个图片一开始不存在，要等api请求过后才能最新图片-->
           <img :src="ImgUrlT + oneData.album.mid + ImgUrlH" alt="">
         </div>
       </div>
     </router-link>
     <div class="LbBox">
       <swiper :options="swiperOpt">
         <swiper-slide
           v-for="(item,index) in data"
          :key="index"
         >
           <div class="otherBox" @click="PlaySong(item)">
             <div class="NewSong">
               <div class="Text">
                 <p>{{item.subtitle || item.title}}</p>
                 <p><span
                   v-for="(singer,j) in item.singer"
                   :key="j"
                 >{{singer.name}}</span></p>
               </div>
               <div class="ImgBox">
                 <!--bug待解决：在页面刷新的时候，这个图片一开始不存在，要等api请求过后才能最新图片-->
                 <img :src="ImgUrlT + item.album.mid + ImgUrlH" alt="">
               </div>
             </div>
           </div>
         </swiper-slide>
       </swiper>
     </div>
   </div>
 </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Radio',
  inject: ['PushSong'],
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      // 新歌第一首
      oneData: {album: {}},
      // 新碟第一张
      oneDie: {},
      // 新歌轮播
      data: [],
      // 图片url新歌 头部
      ImgUrlT: this.UrlData.ImgUlrT,
      // 图片url新歌 头部
      ImgUrlH: this.UrlData.ImgUrlH,
      // 图片url新碟 头部
      DieImgT: this.UrlData.DieImgT,
      // 图片url新碟 头部
      DieImgH: this.UrlData.DieImgH,
      swiperOpt: {
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
        direction: 'vertical',
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
  methods: {
    PlaySong (data) {
      this.PushSong(data)
      // console.log(data)
    }
  },
  created () {
    let This = this
    this.axios.get('http://xiaonaimao.gotoip2.com/music/php/newDie.php?id=1')
      .then(function (response) {
        This.oneDie = response.data.new_album.data.list[0]
        console.log(response.data.new_album.data.list[0])
      })
      .catch(function (error) {
        console.log(error)
      })
    this.axios.get('http://xiaonaimao.gotoip2.com/music/php/newSong.php?id=1')
      .then(function (response) {
        // console.log(response.data.new_song.data.song_list[0])
        This.oneData = response.data.new_song.data.song_list[0]
        This.data = response.data.new_song.data.song_list
        // console.log(This.oneData)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  watch: {
    data () {
      this.$emit('loadFn')
    }
  }
}
</script>

<style scoped>
.Radio{
  display: flex;
  height: 262px;
  margin: 0 16px 64px 16px;
}
.RadioBox {
  position: relative;
  width: 262px;
  height: 262px;
  background: antiquewhite;
  margin-right: 13px;
}
.RadioBox div{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.2);
  color: #fff;
  font-size: 40px;
}
.RadioBox div span{
  position: absolute;
  width: 100%;
  bottom: 20px;
  text-align: center;
}
.otherBox{
  width: 442px;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.GdBox{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
}
.otherBox .NewSong,.otherBox .NumSong{
  width: 100%;
  height: 120px;
  background: #f5f5f5;
}
.otherBox .NewSong{
  /*margin-bottom: 22px;*/
}
.ImgBox{
  width: 120px;
  height: 120px;
  overflow: hidden;
  float: right;
  line-height: 0;
}
.ImgBox img{
  width: 100%;
}
.Text{
  width: 270px;
  padding-left: 30px;
  box-sizing: border-box;
  overflow: hidden;
  float: left;
}
.Text p{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.Text p:nth-child(1){
  font-size: 30px;
  margin-top: 10px;
  line-height: 2;
}
.Text p:nth-child(2){
  font-size: 18px;
  color: #5e5e5e;
}
.LbBox{
  height: 120px;
  overflow: hidden;
}
.LbBox .swiper-container{
  height: 100%;
}
.LbBox .swiper-slide{
  height: 120px;
}
.LbBox .swiper-slide div{
  box-sizing: border-box;
  height: 100%;
}
</style>
