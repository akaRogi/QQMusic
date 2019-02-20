<template>
  <div class="music">
    <div class="MusicIcon" @click="musicShow">
      音乐播放列表
    </div>
    <div class="Music" v-show="musicOff">
      <div class="title">
        <div class="TitleBox">
          <i class="iconfont icon-fanhui" @click="musicHid"></i>
          <h1>{{data.name}}</h1>
        </div>
        <h2>
          <span
            v-for="(item, index) in data.singer"
            :key="index"
          >{{item.name}}</span>
        </h2>
      </div>
      <div class="imgBox">
        <img :src="ImgUrl()" alt="">
      </div>
      <div class="scheduleBar">
        <div class="schedule" :style="timeShow('width:') || 'width:' + this.xPum + 'px'">
          <div class="scheduleDian" :style="timeShow('left:')"  ref="box"
               @mousedown="down"  @touchstart="down"
               @mousemove="move"  @touchmove="move"
               @mouseup="end"  @touchend="end">
          </div>
        </div>
      </div>
      <div class="Gn LSong">
        <i class="iconfont icon-xihuan" @click="PushSong(true)"></i>
      </div>
      <div class="Gn">
        <div class="iconfont icon-shangyishou" @click="PlusLess(false)"></div>
        <div class="iconfont icon-kaishi" :class="{'icon-zanting' : PlaySong}" @click="Songtime"></div>
        <div class="iconfont icon-xiayishou" @click="PlusLess(true)"></div>
      </div>
    </div>
    <VideoBox
      :src="list"
      v-if="hackReset"
      :tiemPlay="tiemPlay"
      :p="p"
      @dataShow="dataShow"
      @SongFn="SongFn"
      @thisTime="thisTime"
      @PlusLess="PlusLess"
    ></VideoBox>
    <div class="SongListPush"></div>
    <CollectionList v-if="collectionOff" @PushSong="PushSong" :res="data"></CollectionList>
  </div>
</template>

<script>
import VideoBox from './Com/VideoBox'
import CollectionList from './Com/Collection'
export default {
  name: 'music',
  props: ['AddSong', 'replaceList'],
  components: {
    VideoBox,
    CollectionList
  },
  data () {
    return {
      musicOff: false,
      list: [],
      hackReset: false,
      PlaySong: false,
      collectionOff: false,
      p: 0,
      data: {
        album: {
        },
        data: {}
      },
      time: '',
      flags: false,
      tiemPlay: 0,
      widthBox: '',
      position: {
        x: 0
      },
      nx: '',
      dx: '',
      xPum: ''
    }
  },
  methods: {
    musicShow () {
      this.musicOff = true
    },
    musicHid () {
      this.musicOff = false
    },
    ImgUrl () {
      let img = ''
      if (this.data.album) {
        img = this.data.album.mid
      } else if (this.data.data) {
        img = this.data.data.albummid
      }
      return this.UrlData.DieImgT + img + this.UrlData.DieImgH
    },
    dataShow (data) {
      this.data = data
      console.log(this.data)
    },
    Songtime () {
    //  歌曲暂停或是播放
      let Song = document.getElementById('Video')
      if (Song.paused) {
        Song.play()
        this.PlaySong = true
      } else {
        this.PlaySong = false
        Song.pause()
      }
    },
    PlusLess (off) {
      if (off) {
        this.p++
        if (this.p >= this.list.length) {
          this.p = 0
          alert(222)
        }
      } else {
        this.p--
        if (this.p < 0) {
          // alert(this.list.length)
          this.p = this.list.length - 1
        }
      }
      console.log(this.p)
    },
    SongFn (off) {
    //  让播放总结传递回来，当前歌曲是否载入完毕
      this.PlaySong = off
      console.log(this.PlaySong)
    },
    thisTime (time) {
    //  获取当前歌曲进度
      this.time = time
      // console.log(this.time)
    },
    timeShow (Style) {
      return Style + this.time + '%'
    },
    down () {
      this.widthBox = document.getElementsByClassName('scheduleBar')[0].clientWidth
      this.flags = true
      var touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      console.log(this.widthBox)
      this.position.x = touch.clientX
      // this.position.y = touch.clientY
      this.dx = this.$refs.box.offsetLeft
    },
    move () {
      if (this.flags) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        if (this.widthBox - 10 > this.nx) {
          if (this.nx !== 0) {
            this.nx = touch.clientX - this.position.x
          }
        }
        // this.ny = touch.clientY - this.position.y
        this.xPum = this.dx + this.nx
        this.$refs.box.style.left = this.xPum / this.widthBox * 100 + '%'
      }
    },
    // 鼠标释放时候的函数
    end () {
      this.flags = false
      this.tiemPlay = this.xPum / this.widthBox * 100
    },
    // 收藏歌曲
    PushSong (off) {
      this.collectionOff = off
    }
  },
  watch: {
    AddSong (to) {
      this.list.unshift(to)
      this.p = 0
    },
    list () {
      this.hackReset = false
      // 监控Dom是否发生变化（由于上面执行的销毁步骤,所以Dom发生的变化）
      this.$nextTick(() => {
        // 重新让Dom显示（由于用的是v-if，而不是v-show，所以在销毁的时候带子组件的内存一并清空
        // 所以子组件里面的动作将会重新走一遍（包括axios请求、以及获取一些页面数据）
        this.hackReset = true
      })
    },
    replaceList (to) {
      this.list = to
      console.log(to)
    }
  }
}
</script>

<style scoped>
  .MusicIcon{
    position: absolute;
    top: 0;
  }
  .Music{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    background: #fff;
    z-index: 99999999;
    text-align: center;
  }
  .title{
    width: 100%;
  }
  .TitleBox{
    position: relative;
  }
  .TitleBox i{
    position: absolute;
    left: 10px;
    font-size: 36px;
  }
  .title h1{
    margin-top: 15px;
    font-size: 32px;
    font-weight: 400;
    color: #000;
  }
  .title h2{
    margin-bottom: 30px;
    font-size: 22px;
    font-weight: 400;
    color: grey;
  }
  .imgBox{
    width: 80%;
    margin: 0 auto;
  }
  .imgBox img{
    width: 100%;
  }
  .scheduleBar{
    width: 90%;
    height: 10px;
    background: #555;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    position: relative;
  }
  .schedule{
    width: 0%;
    height: 100%;
    background: #dcdcdc;
  }
  .scheduleDian{
    position: absolute;
    width: 20px;
    height: 20px;
    background: #6b6b6b;
    top: calc(50% - 14px);
    left: 0;
    border: 6px solid #d3d3d3;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .Gn{
    width: 80%;
    display: flex;
    justify-content: space-between;
  }
  .Gn div{
    display: flex;
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    font-size: 60px;
  }
  .LSong{
    display: flex;
    justify-content: center;
  }
  .LSong i{
    font-size: 50px;
  }
</style>
