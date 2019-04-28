<template>
  <div class="newSong">
    <header
      class="top"
    >
      <TopTitle
        :title="'新歌首发'"
      ></TopTitle>
      <nav>
        <ul>
          <li
            v-for="(item, index) in data.type_info"
            :key="index"
            :class="{show : index === NavShow}"
            @click="DataShow(item,index)"
          >{{item.title}}</li>
        </ul>
      </nav>
    </header>
    <div class="main" ref="wrapper" :style="HeightStyle">
      <ul>
        <MainLi
          v-for="(item,index) in data.song_list"
          :key="index"
          :data="item"
          :marg="'10px'"
          :UrlOff="false"
        ></MainLi>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import MainLi from '../newPlate/plateLi'
export default {
  name: 'newSong',
  components: {
    MainLi
  },
  data () {
    return {
      data: {},
      NavShow: 0,
      id: 1,
      HeightStyle: ''
    }
  },
  methods: {
    request () {
      let This = this
      let url = 'http://xiaonaimao.gotoip2.com/music/php/newSong.php?id='
      let id = this.id
      this.axios.get(url + id)
        .then(function (response) {
          console.log(response.data.new_song.data)
          This.data = response.data.new_song.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    DataShow (data, index) {
      console.log(data)
      this.id = data.id
      this.NavShow = index
      this.request()
    },
    requestheight () {
      // 获取body到头部之间剩下的距离
      let top = document.getElementsByClassName('top')[0]
      let Hea = parseInt(getComputedStyle(top).height)
      let hei = document.documentElement.clientHeight - Hea
      // 解决污染HTML模板
      this.HeightStyle = 'height:' + hei + 'px'
      // console.log(this.HeightStyle)
    }
  },
  created () {
    this.request()
  },
  watch: {
    data () {
      setTimeout(() => {
        // 由于数据更新重新获取高度
        this.requestheight()
        // BScroll组件激活
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
  header{
    margin-bottom: 30px;
  }
  nav ul{
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  nav ul li{
    font-size: 30px;
  }
  nav ul li.show{
    color: #31c27c;
  }
  .main{
    overflow: hidden;
  }
  .main ul{
    margin: 0 10px;
    overflow: hidden;
    padding-bottom: 50px;
  }
  .main li{
    width: 100%;
    display: flex;
    line-height: 3;
    align-items: center;
    margin-bottom: 10px;
  }
  .main li img{
    width: 100%;
  }
</style>
