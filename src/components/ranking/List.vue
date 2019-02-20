<template>
  <div id="wrap">
    <div class="header">
      <div class="info_box">
        <div class="gn">
          <div class="img" style="width:125px;height:125px;margin-right: 10px;">
            <img :src="data.topinfo.pic_album" />
          </div>
          <div class="album">
            <h3 class="son_h3">{{data.topinfo.ListName}}</h3>
            <div class="use">
              <span>{{dateOff(data.day_of_year)}}</span>
            </div>
            <p>{{data.date + '更新'}}</p>
          </div>
        </div>
        <div class="bf">
          <div class="palylen" @click="replaceList(data.songlist)">播放全部</div>
          <!--<div class="play_bar" v-if="PlayOff">-->
            <!--<div class="playBtn" @click="PlayBtn">-->
              <!--<i class="iconfont" :class="{'icon-zanting': BtnZt, 'icon-bofang': !BtnZt}"></i>-->
            <!--</div>-->
            <!--<div class="SongName">-->
              <!--<h2>{{PlaySongData.SongName}}</h2>-->
              <!--<h3><span v-for="Paly in PlaySongData.Songer" :key="Paly.name">{{Paly.name}}</span></h3>-->
            <!--</div>-->
            <!--<div class="download" @click="download">-->
              <!--<i class="iconfont">&#xe617;</i>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
      <div class="ImgBg">
        <div class="mark"></div>
        <img class="lj" :src="data.topinfo.pic_album" />
      </div>
    </div>

    <div class="main">
      <div class="count">排行榜 共{{data.songlist.length}}首</div>
      <div class="UlBox wrapper" ref="wrapper" :style="HeightStyle">
        <ul class="ul_box content">
          <li
            v-for="(item,index) in data.songlist"
            :key="index"
            @click="pushList(item)"
          >
            <div class="SongShowBox">
              <div class="Num">
                <span>{{index + 1}}</span>
              </div>
              <div class="li_list">
                <div>
                  <h3>{{item.data.songname}}</h3>
                  <span v-for="SongName in item.data.singer" :key="SongName.name">{{SongName.name}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'List',
  inject: ['replace', 'PushSong'],
  data () {
    return {
      data: {
        date: '',
        topinfo: {
          pic_album: ''
        },
        songlist: []
      },
      HeightStyle: ''
    }
  },
  methods: {
    dateOff (date) {
      let e = ''
      if (date) {
        e = '第' + date + '天'
      } else {
        let j = this.data.date.indexOf('_')
        e = '第' + this.data.date.substring(j + 1) + '周'
      }
      return e
    },
    requestheight () {
      let top = document.getElementsByClassName('header')[0]
      let main = document.getElementsByClassName('count')[0]
      let Hea = parseInt(getComputedStyle(top).height) + parseInt(getComputedStyle(main).height)
      // Bug由于rem布局，所以有的时候获取高度的时候会出现小数点干扰，而出现滚动条
      // -1去除小数点干扰
      let hei = document.documentElement.clientHeight - Hea - 1
      console.log(Hea)
      console.log(hei)
      this.HeightStyle = 'height:' + hei + 'px'
      // console.log(this.HeightStyle)
    },
    replaceList (list) {
      // console.log(list)
      this.replace(list)
    },
    pushList (list) {
      this.PushSong(list)
    }
  },
  created () {
    let This = this
    let url = 'http://xiaonaimao.gotoip2.com/qq/php/recommendMain.php?id='
    this.axios.get(`${url + this.$route.params.id}`)
      .then(function (response) {
        This.data = response.data
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  watch: {
    data () {
      setTimeout(() => {
        this.requestheight()
        this.$nextTick(() => {
          // $refs绑定元素
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {
              // 开启点击事件 默认为false
              click: true
            })
            // console.log(this.scroll)
          } else if (!this.$refs.wrapper) {
          } else {
            this.scroll.refresh()
          }
        })
      }, 200)
    }
  }
}
</script>

<style scoped>
  .header{
    background: rgba(0,0,0,.5);
  }
  .main li.is_show{
    color: #31c27c;
  }
  .main li.is_show .li_list span{
    color: #31c27c;
  }
  .Num{

  }
  li:nth-child( -n+3 ) .Num{
    color: #FF400B
  }
  .bm{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    width: 90px;
    margin-right: -32px;
  }
  .header .info_box .gn{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 34px;
    padding: 0 32px;
    overflow: hidden;
  }
  .album{
    line-height: 2;
  }
  .album p,.album span{
    font-size: 12px;
  }
  .ImgBg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
  .mark{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    z-index: 1;
  }
  .header .lj{
    /*position: absolute;*/
    /*top: 0;*/
    object-fit: cover;
    -webkit-transform: scale(1.4) translateZ(0);
    -webkit-filter: blur(32px);
    z-index: -1;
  }
  .album{
    color: #fff;
  }
  .son_h3{
    font-size: 32px;
    font-weight: 400;
  }
  .header{
    position: absolute;
    width:100%;
    height: 452px;
    z-index:100;
    overflow:hidden;
  }
  .bf{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180px;
  }
  .palylen{
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    min-width: 260px;
    padding: 0 40px;
    height: 90px;
    overflow: hidden;
    text-align: center;
    font-size: 32px;
    color: #fff;
    border-radius: 40px;
    background: #31c27c;
  }
  .main{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    padding-top:452px;
    overflow: hidden;
    will-change: transform;
    -webkit-transform: translateZ(0);
  }
  .UlBox{
    height: 790px;
    overflow: hidden;
  }
  @media (max-width: 321px){
    .bf {
      height: auto;
      margin-top: 20px;
    }
  }
  .count{
    height: 108px;
    display: -webkit-box;
    -webkit-box-align: center;
    margin: 0 20px;
    font-size: 28px;
    color: #000;
  }
  .SongShowBox{
    display: flex;
  }
  .Num{
    display: flex;
    width: 90px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
  .li_list{
    font-size: 30px;
    width: 700px;
    padding: 20px 30px 20px 0;
    overflow: hidden;
  }
  .li_list h3{
    font-size: 28px;
    font-weight: 400;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .li_list span{
    font-size: 20px;
    color: #777;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .loading{
    position:absolute;
    background-color:#f4f4f4;
    background-repeat: no-repeat;
    background-position: center;
    width:100%;
    height:100%;
    z-index:11111;
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:1.5rem;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.4px;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
