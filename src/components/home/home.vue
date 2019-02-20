<template>
  <div class="home">
    <HeaDer></HeaDer>
    <Baner :data="BannerList" v-if="BannerList.length !== 0"></Baner>
    <Sort></Sort>
    <Radio
      @loadFn="loadFn"
    ></Radio>
    <!--推荐歌单-->
    <MainBox :data="SongList"></MainBox>
    <!--推荐音乐-->
    <MainBox :data="Random"></MainBox>
    <!--推荐MV-->
    <MainBox :data="MvList"></MainBox>
    <loading v-if="loadOff"></loading>
  </div>
</template>

<script>
import HeaDer from '../nav/nav' // 头部
import Baner from './banner/banner' // banner
import Sort from './sort/sort' // 分类
import Radio from './Radio/Radio' // 分类
import MainBox from './Main/MainBox' // 推荐歌单
export default {
  name: 'home',
  components: {
    HeaDer,
    Baner,
    Sort,
    Radio,
    MainBox
  },
  data () {
    return {
      BannerList: [],
      SongList: {
        type: 'SongList',
        title: '推荐歌单',
        list: []
      },
      Random: {
        type: 'RandomSong',
        title: '推荐歌曲',
        list: []
      },
      MvList: {
        type: 'MvList',
        title: '推荐MV',
        list: []
      },
      loadOff: true
    }
  },
  methods: {
    loadFn () {
      this.loadOff = false
    }
  },
  created () {
    let This = this
    this.axios.get('http://xiaonaimao.gotoip2.com/music/php/cs_2.php')
      .then(function (response) {
        This.SongList.list = response.data.recomPlaylist.data.v_hot // 推荐歌单
        // console.log(This.SongList.list)
        let Banner = response.data.focus.data.content // banner数据
        This.BannerList = Banner
      })
      .catch(function (error) {
        console.log(error)
      })
    this.axios.get('http://xiaonaimao.gotoip2.com/music/php/Random.php')
      .then(function (response) {
        console.log(response.data.songlist)
        let data = response.data.songlist
        for (var i = 0; i < data.length; i++) {
          if (i <= 5) {
            This.Random.list.push(data[i])
          } else {
            break
          }
        }
        // console.log(This.Random.list)
      })
      .catch(function (error) {
        console.log(error)
      })
    this.axios.get('http://xiaonaimao.gotoip2.com/music/php/newMV.php?id=all')
      .then(function (response) {
        console.log(response.data.data.mvlist)
        let data = response.data.data.mvlist
        for (var i = 0; i < data.length; i++) {
          if (i <= 5) {
            This.MvList.list.push(data[i])
          } else {
            break
          }
        }
        console.log(This.MvList.list)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
