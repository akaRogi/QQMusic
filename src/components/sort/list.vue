<template>
  <div class="List">
    <div class="titleBox">
      <TopTitle :title="'qqqq'"></TopTitle>
    </div>
    <div class="main" ref="wrapper" :style="HeightStyle">
      <div class="bscrollBox">
        <ul>
          <Listli
            v-for="(item, index) in data"
            :key="index"
            :data="item"
          ></Listli>
        </ul>
        <p class="load" v-if="loadOff">载入中...</p>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Listli from './SortCom/listLi'
export default {
  name: 'list',
  components: {
    Listli
  },
  data () {
    return {
      sin: 0,
      ein: 29,
      loadOff: false,
      data: [],
      pushOff: true,
      HeightStyle: ''
    }
  },
  methods: {
    requestheight () {
      // 获取body到头部之间剩下的距离
      let top = document.getElementsByClassName('titleBox')[0]
      let Hea = parseInt(getComputedStyle(top).height)
      let hei = document.documentElement.clientHeight - Hea
      // 解决污染HTML模板
      this.HeightStyle = 'height:' + hei + 'px'
      // console.log(this.HeightStyle)
    },
    Pushlist () {
      let This = this
      let id = this.$route.params.id
      let sin = this.sin
      let ein = this.ein
      let url = `http://www.theskytydd.cn/Api/SortList.php?id=${id}&sin=${sin}&ein=${ein}`
      this.axios.get(url)
        .then(function (response) {
          // This.data = response.data.data.list
          let list = response.data.data.list
          This.loadOff = false
          This.pushOff = true
          for (var i = 0; i < list.length; i++) {
            This.data.push(list[i])
          }
          // console.log(response.data.data.list)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    let This = this
    let id = this.$route.params.id
    let sin = this.sin
    let ein = this.ein
    let url = `http://www.theskytydd.cn/Api/SortList.php?id=${id}&sin=${sin}&ein=${ein}`
    this.axios.get(url)
      .then(function (response) {
        This.data = response.data.data.list
        console.log(response.data.data.list)
      })
      .catch(function (error) {
        console.log(error)
      })
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
              click: true,
              pullUpLoad: {
                threshold: -80 // 当上拉距离超过30px时触发 pullingUp 事件
              }
            })

            this.scroll.on('pullingUp', () => {
              if (this.pushOff) {
                console.log(this.loadOff)
                this.loadOff = true
                this.ein += 30
                this.sin += 30
                this.Pushlist()
                this.pushOff = false
              }
              this.scroll.finishPullUp()
            })
            // console.log(this.scroll)
          } else if (!this.$refs.wrapper) {
          } else {
            this.scroll.refresh()
          }
        })
      }, 50)
    }
  }
}
</script>

<style scoped>
.main{
  overflow: hidden;
}
  .main ul{
    overflow: hidden;
    margin: 0 10px;
  }
  .load{
    padding-top: 20px;
    text-align: center;
    font-size: 24px;
  }
</style>
