<template>
  <div class="mv_info">
    <div class="mv_info__hd">
      <h1 class="mv_tit">
        <img src="https://y.gtimg.cn/mediastyle/mobile/project_v5/img/mv/mv_icon.png?max_age=2592000" alt="">
        <span>{{MvMainData.name}}</span>
      </h1>
      <div class="mv_author">
        <img src="" alt="">
        <span class="c_txt2" v-for="Songer in MvMainData.singers" :key="Songer.name">{{Songer.name}}</span>
      </div>
      <div class="mv_rank_posBox">
        <span class="c_txt3">{{MvMainData.playcnt + '次播放'}}</span>
        <span class="c_txt2">{{MvMainData.date}}</span>
      </div>
      <div class="tj">
        推荐
      </div>
    </div>
    <div class="MainBox" ref="wrapper" :style="HeightStyle">
      <Main :data="list" :One="true"></Main>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Main from '../../nav/MvList/com/Main'
export default {
  name: 'MvDetails',
  components: {
    Main
  },
  data () {
    return {
      MvMainData: {
        name: '载入中...',
        singers: '载入中...',
        playcnt: '载入中...',
        date: '载入中...'
      },
      list: [],
      HeightStyle: ''
    }
  },
  methods: {
    requestheight () {
      let top = document.getElementsByClassName('MvPlayBox')[0]
      let main = document.getElementsByClassName('mv_info__hd')[0]
      let Hea = parseInt(getComputedStyle(top).height) + parseInt(getComputedStyle(main).height)
      // Bug由于rem布局，所以有的时候获取高度的时候会出现小数点干扰，而出现滚动条
      // -1去除小数点干扰
      let hei = document.documentElement.clientHeight - Hea - 1
      console.log(Hea)
      console.log(hei)
      this.HeightStyle = 'height:' + hei + 'px'
      // console.log(this.HeightStyle)
    }
  },
  created () {
    let id = this.$route.params.id
    let url = `http://xiaonaimao.gotoip2.com/music/php/getMvTj.php?id=${id}`
    let This = this
    this.axios.get(url)
      .then(function (response) {
        console.log(response.data)
        for (var k in response.data.mvinfo) {
          for (var j in response.data.mvinfo[k]) { This.MvMainData = response.data.mvinfo[k][j] }
        }
        This.list = response.data.other.data.list
        console.log(This.list)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  watch: {
    list () {
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
  .mv_info{
    margin-bottom: 20px;
  }
  .mv_info__hd {
    position: relative;
    padding: 0 16px;
    overflow: hidden;
  }
  .mv_tit {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.4;
    margin: 24px 40px 0px 0;
    overflow: hidden;
    font-size: 28px;
    font-weight: 700;
  }
  .mv_tit img {
    display: inline-block;
    width: 45px;
    height: 25px;
    margin-right: 10px;
  }
  .mv_rank_posBox span{
    margin-right: 32px;
    font-size: 24px;
  }
  .mv_rank_posBox{
    margin-bottom: 60px;
  }
  .c_txt2 {
    color: grey;
    font-size: 24px;
  }
  .c_txt3{
    color: #31c27c;
  }
  .tj{
    margin-bottom: 10px;
    font-size: 30px;
  }
  .MainBox{
    overflow: hidden;
  }
</style>
