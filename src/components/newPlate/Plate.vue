<template>
  <div class="Plate">
    <header class="top">
      <TopTitle
        :title="'新碟首发'"
      ></TopTitle>
      <nav>
        <ul>
          <li
            v-for="(item,index) in data.tags.area"
            :key="index"
            :class="{show : index === ShowNum}"
            @click="DataShow(item,index)"
          >{{item.name}}</li>
        </ul>
      </nav>
    </header>
    <div class="main" ref="wrapper" :style="HeightStyle">
      <ul>
        <PlateLi
          v-for="(item,index) in data.list"
          :key="index"
          :data="item"
          :UrlOff="true"
        ></PlateLi>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import PlateLi from './plateLi'
export default {
  name: 'Plate',
  components: {
    PlateLi
  },
  data () {
    return {
      data: {
        tags: {
          area: []
        }
      },
      ShowNum: 0,
      id: '1',
      HeightStyle: ''
    }
  },
  methods: {
    DataShow (data, index) {
      this.ShowNum = index
      this.id = data.id
    },
    requestheight () {
      // 获取body到头部之间剩下的距离
      let top = document.getElementsByClassName('top')[0]
      let Hea = parseInt(getComputedStyle(top).height)
      let hei = document.documentElement.clientHeight - Hea
      // 解决污染HTML模板
      this.HeightStyle = 'height:' + hei + 'px'
      // console.log(this.HeightStyle)
    },
    request () {
      // 请求页面数据
      let This = this
      let id = this.id
      let url = 'http://xiaonaimao.gotoip2.com/music/php/newDie.php?id='
      this.axios.get(url + id)
        .then(function (response) {
          // console.log(response.data.new_album.data)
          This.data = response.data.new_album.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    this.request()
  },
  watch: {
    id () {
      this.request()
    },
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
  .header{
    height: 88px;
    background: #31c27c;
    text-align: center;
    position: relative;
    color: #fff;
  }
  .header h2{
    line-height: 2.6;
    font-size: 35px;
  }
  .header i{
    position: absolute;
    left: 10px;
    font-size: 30px;
    top: calc(50% - 20px);
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
    width: calc(50% - 5px);
    float: left;
    text-align: center;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .main li p:nth-child(1){
    font-size: 20px;
  }
  .main li p:nth-child(2){
    font-size: 16px;
    color: #999;
  }
  .main li:nth-child(even){
    margin-left: 10px;
  }
  .main li img{
    width: 100%;
  }
  /*@media (max-height: 812px) {*/
    /*.main {*/
      /*height: 1040px;*/
    /*}*/
  /*}*/
  /*@media (max-height:737px) {*/
    /*.main {*/
      /*height: 754px;*/
    /*}*/
  /*}*/
  /*@media (max-width: 321px) {*/
    /*.main {*/
      /*height: 752px;*/
    /*}*/
  /*}*/
  /*@media (max-width: 824px) {*/
    /*.main {*/
      /*height: 920px;*/
    /*}*/
  /*}*/
  /*@media (max-width: 732px) {*/
    /*.main {*/
      /*height: 749px;*/
    /*}*/
  /*}*/
</style>
