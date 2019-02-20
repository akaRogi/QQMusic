<template>
  <div id="wrap">
    <div class="header">
      <div class="info_box">
        <div class="gn">
          <div class="img" style="width:125px;height:125px;margin-right: 10px;">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548929737170&di=05f26a24adcd22298386c8c78d25c7f4&imgtype=0&src=http%3A%2F%2Fwww.jf258.com%2Fuploads%2F2015-05-16%2F200044886.jpg" />
            <!--<img :src="data.logo || NewDieT + data.mid + NewDieH" />-->
          </div>
          <div class="album">
            <h3 class="son_h3">{{songTitle(data.dissname)}}</h3>
            <div class="use">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549027361316&di=5ecc9144fdb9f35f074660f11b187717&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F18%2F20181018161442_ahsds.jpeg" alt="">
              <span>{{name(data.SongLister)}}</span>
            </div>
            <p>{{visitnum(data.date)}}</p>
          </div>
        </div>
        <div class="bf">
          <div class="palylen" @click="replaceList(data.list)">播放全部</div>
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
        <img class="lj" :src="logo(data.logo)"  alt=""/>
      </div>
    </div>

    <div class="main" :style="HeightStyle">
      <div class="count"><span>{{listLeng(data.songlist)}}</span></div>
      <div class="UlBox wrapper" ref="wrapper">
        <div>
          <ul class="ul_box content">
            <li
              v-for="(item,index) in list(data.songlist)"
              :key="index"
              @click="pushList(item)"
            >
              <div class="SongShowBox">
                <div class="li_list">
                  <div>
                    <h3>{{item.title || item.albumname}}</h3>
                    <span v-for="SongName in item.singer" :key="SongName.name">{{SongName.name}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!--<Introduction-->
            <!--v-if="data.desc"-->
            <!--:desc="data.desc"-->
          <!--&gt;</Introduction>-->
        </div>
      </div>
    </div>
    <!--<audio id="audio" src="PlaySongData.SongUrl" autoplay="autoplay"></audio>-->
  </div>
</template>

<script>
import Main from '../../ranking/listCom/listCom'
export default {
  name: 'LocalData',
  inject: ['PushSong', 'replace'],
  components: {
    Main
  },
  data () {
    return {
      data: {},
      HeightStyle: '',
      NewDieT: this.UrlData.NewDieT,
      NewDieH: this.UrlData.NewDieH,
      SongerT: this.UrlData.SongerT,
      SongerH: this.UrlData.SongerH
    }
  },
  methods: {
    logo (data) {
      let img = data
      if (!img) {
        img = this.NewDieT + this.data.mid + this.NewDieH
      }
      return img
    },
    songTitle (data) {
      let title = data
      if (!title) {
        title = this.data.name
      }
      return title
    },
    songer (data) {
      let img = data
      if (!img) {
        img = this.SongerT + this.data.singermid + this.SongerH
      }
      return img
    },
    name (data) {
      let name = data
      if (!name) {
        name = this.data.singername
      }
      return name
    },
    visitnum (num) {
      let data = num
      let val = ''
      if (data) {
        if (num >= 10000) {
          val = '播放量 ' + ((num / 10000).toFixed(1)) + '万'
        } else {
          val = num
        }
      } else {
        val = '发行时间：' + this.data.aDate
      }
      return val
    },
    listLeng (data) {
      let leng = data
      if (leng) {
        leng = '共' + data.length + '首'
      } else {
        leng = '共' + this.data.list.length + '首'
      }
      return leng
    },
    list (data) {
      let list = data
      if (!list) {
        list = this.data.list
      }
      return list
    },
    requestheight () {
      // 获取body到头部之间剩下的距离
      let top = document.getElementsByClassName('header')[0]
      let Hea = parseInt(getComputedStyle(top).height)
      let hei = document.documentElement.clientHeight - Hea - 1
      // 解决污染HTML模板
      this.HeightStyle = 'height:' + hei + 'px'
      console.log(this.HeightStyle)
    },
    replaceList (data) {
      // console.log(data)
      this.replace(data)
    },
    pushList (data) {
      console.log(data)
      this.PushSong(data)
    },
    PushCollectsong () {
      let user = this.UrlData.userlogin()
      let id = this.$route.params.id
      // 判断是否登陆
      if (user) {
        // 判断该用户的收藏歌单里面是否存在收藏的歌单
        if (!user.collectsong.length) {
          // 如果没有收藏过任何歌单则直接收藏该歌单
          this.UrlData.usersave(id, 'collectsong')
          alert('收藏成功')
        } else {
          // 如果有收藏过歌单，则进行筛选，筛选该歌单是否之前已经收藏过
          let off = true
          for (var i = 0; i < user.collectsong.length; i++) {
            if (user.collectsong[i] === id) {
              off = false
            }
          }
          if (off) {
            this.UrlData.usersave(id, 'collectsong')
            alert('收藏成功')
          } else {
            alert('该歌单已被收藏')
          }
        }
      } else {
        alert('请先登陆')
      }
      // console.log(JSON.parse(localStorage.getItem('QQMusicUser')))
    }
  },
  created () {
    // 查找当前登录的账号
    let user = this.UrlData.userlogin()
    // 查到当前歌单的ID
    let id = Number(this.$route.params.id)
    // 循环当前登陆找的歌单列表
    for (var i = 0; i < user.songlist.length; i++) {
      // 查找歌单每一项的ID进行匹配
      if (user.songlist[i].id === id) {
        // 匹配成功放回该ID的数据
        this.data = user.songlist[i]
      }
    }
    console.log(this.data)
    // let Date = new Date()
  }
}
</script>

<style scoped>
  #wrap{
    overflow: hidden;
  }
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
    box-sizing: border-box;
  }
  .album h3{
    width: 440px;
    line-height: 1.5;
    margin-bottom: 10px;
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
  .use{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .use img{
    width: 50px;
    height: 50px;
    margin-right: 10px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
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
    padding-bottom: 20px;
    overflow: hidden;
  }
  @media (max-width: 321px) and (min-height:319px) {
    .bf {
      height: auto;
      margin-top: 20px;
    }
    .UlBox {
      height: 752px;
    }
  }
  /*@media (max-height: 732px) and (min-height:730px) {*/
  /*.UlBox {*/
  /*height: 749px;*/
  /*}*/
  /*}*/
  /*@media (max-height:737px) and (min-height:735px) {*/
  /*.UlBox {*/
  /*height: 754px;*/
  /*}*/
  /*}*/
  /*@media (max-height: 824px) and (min-height:822px) {*/
  /*.UlBox {*/
  /*height: 920px;*/
  /*}*/
  /*}*/
  /*@media (max-height: 813px) and (min-height:811px) {*/
  /*.UlBox {*/
  /*height: 1040px;*/
  /*}*/
  /*}*/
  /*@media (max-height: 641px) and (min-height:639px) {*/
  /*.UlBox {*/
  /*height: 749px;*/
  /*}*/
  /*}*/
  .count{
    height: 108px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;
    font-size: 28px;
    color: #31c27c;
  }
  .count span{
    /*float: right;*/
  }
  .ul_box{
    margin: 0 20px 50px 20px;
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
