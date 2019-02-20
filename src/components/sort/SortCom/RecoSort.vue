<template>
  <div class="RecoSort">
    <div class="RecoTitle">
      <h3>推荐分类</h3>
      <div @click="RecoFn(true)"><i class="iconfont icon-fanhui"></i></div>
    </div>
    <ul class="SortBox">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="UpdateId(item)"
      >{{item.categoryName}}</li>
    </ul>
    <div class="SortLengBox" :class="{show : RecoBoxOff}">
      <div class="header">
        <i class="iconfont icon-fanhui" @click="RecoFn(false)"></i>
        <h2>分类</h2>
      </div>
      <div class="box" ref="wrapper" :style="HeightStyle">
        <div class="bscroll">
          <SortLeng
            v-for="(item, index) in Sort"
            :key="index"
            :data="item"
          ></SortLeng>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import SortLeng from './SortLeng'
export default {
  name: 'RecoSort',
  components: {
    SortLeng
  },
  data () {
    return {
      list: [],
      Sort: [],
      RecoBoxOff: false,
      HeightStyle: ''
    }
  },
  methods: {
    RecoFn (off) {
      if (off) {
        this.RecoBoxOff = true
      } else {
        this.RecoBoxOff = false
      }
    },
    UpdateId (data) {
      let id = data.categoryId
      this.$router.push('/sortList/' + id)
      // alert(id)
    },
    requestheight () {
      // 获取body到头部之间剩下的距离
      let top = document.getElementsByClassName('header')[0]
      let Hea = parseInt(getComputedStyle(top).height)
      let hei = document.documentElement.clientHeight - Hea
      // 解决污染HTML模板
      this.HeightStyle = 'height:' + hei + 'px'
      // console.log(this.HeightStyle)
    }
  },
  created () {
    let url = `http://www.theskytydd.cn/Api/SongSort.php`
    let This = this
    this.axios.get(url)
      .then(function (response) {
        This.list = response.data.data.categories[4].items
        This.Sort = response.data.data.categories
        // console.log(This.list)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  watch: {
    Sort () {
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
.RecoSort{
  margin: 52px 10px;
}
.RecoTitle{
  position: relative;
  margin-bottom: 35px;
}
.RecoSort h3{
  font-size: 30px;
  font-weight: 400;
}
.RecoTitle div{
  position: absolute;
  display: flex;
  top: calc(50% - 16px);
  right: 0;
  width: 36px;
  height: 36px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 2px solid #7a7a7a;
  transform: rotate(180deg);
  justify-content: center;
  align-items: center;
}
.RecoSort div i{
  color: #7a7a7a;
}
.SortBox{
  overflow: hidden;
}
.SortBox li{
  width: 32%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
  float: left;
  text-align: center;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  margin-right: 2%;
  margin-bottom: 16px;
}
.SortBox li:nth-child(3n){
  margin: 0;
}
.SortLengBox{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  overflow-y: auto;
  z-index: -2;
  opacity: 0;
}
.SortLengBox.show{
  z-index: 99999;
  opacity: 1;
}
header{
  margin-bottom: 30px;
}
.header{
  height: 88px;
  background: #fff;
  text-align: center;
  position: relative;
  color: #000;
  margin-bottom: 20px;
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
  .box{
    height: 500px;
    overflow: hidden;
  }
</style>
