<template>
  <div class="list">
    <div class="TitleBox">
      <TopTitle :title="title"></TopTitle>
    </div>
    <div class="MainBox" ref="wrapper" :style="HeightStyle">
      <div class="Bscroll">
        <Main :data="list"></Main>
        <p v-if="loadOff" class="load">载入中...</p>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Main from './com/Main'
export default {
  name: 'list',
  components: {
    Main
  },
  data () {
    return {
      title: this.$route.query.name,
      p: 0,
      list: [],
      HeightStyle: '',
      pushOff: true,
      loadOff: false
    }
  },
  methods: {
    idGx () {
      let This = this
      let id = this.$route.query.id
      this.p += 20
      let p = this.p
      let url = `http://xiaonaimao.gotoip2.com/music/php/SortMvList.php?id=${id}&p=${p}`
      this.axios.get(url)
        .then(function (response) {
          console.log(response.data.mv_list.data.list)
          let list = response.data.mv_list.data.list
          for (var i = 0; i < list.length; i++) {
            This.list.push(list[i])
          }
          This.pushOff = true
          This.loadOff = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    requestheight () {
      // 获取body到头部之间剩下的距离
      let top = document.getElementsByClassName('TitleBox')[0]
      let Hea = parseInt(getComputedStyle(top).height)
      let hei = document.documentElement.clientHeight - Hea
      // 解决污染HTML模板
      this.HeightStyle = 'height:' + hei + 'px'
      // console.log(this.HeightStyle)
    }
  },
  created () {
    console.log(this.$route.query.name)
    this.idGx()
  },
  watch: {
    list () {
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
              threshold: -100 // 当上拉距离超过30px时触发 pullingUp 事件
            }
          })
          // pullingUp 触发之后需要做得事情
          this.scroll.on('pullingUp', () => {
            if (this.pushOff) {
              // console.log(this.loadOff)
              this.loadOff = true
              this.idGx()
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
    }
  }
}
</script>

<style scoped>
.MainBox{
  padding: 20px 10px 0 10px;
  background: #fff;
  overflow: hidden;
}
.MainBox ul{
  background: #fff;
  z-index: -1;
}
.load{
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
}
</style>
