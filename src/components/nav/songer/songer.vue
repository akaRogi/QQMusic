<template>
  <div class="songer">
    <TopTitle :title="'歌手'"></TopTitle>
    <div class="MainBox" ref="wrapper" :style="HeightStyle">
      <Main :list="songerlist"></Main>
    </div>
    <div class="tag">
      <Tag :data="taglist" @tag="tag"></Tag>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Main from './Com/Main'
import Tag from './Com/tag'
export default {
  name: 'songer',
  components: {
    Main,
    Tag
  },
  data () {
    return {
      id: 1,
      songerlist: [],
      taglist: [],
      HeightStyle: ''
    }
  },
  methods: {
    requestheight () {
      let top = document.getElementsByClassName('header')[0]
      let Hea = parseInt(getComputedStyle(top).height)
      // Bug由于rem布局，所以有的时候获取高度的时候会出现小数点干扰，而出现滚动条
      // -1去除小数点干扰
      let hei = document.documentElement.clientHeight - Hea - 1
      console.log(Hea)
      console.log(hei)
      this.HeightStyle = 'height:' + hei + 'px'
      // console.log(this.HeightStyle)
    },
    request () {
      let This = this
      let id = this.id
      let url = `http://xiaonaimao.gotoip2.com/music/php/songerlist.php?id=${id}`
      this.axios.get(url)
        .then(function (response) {
          This.songerlist = response.data.singerList.data.singerlist
          This.taglist = response.data.singerList.data.tags
          console.log(response.data.singerList.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    tag (id) {
      this.id = id
      this.request()
    }
  },
  created () {
    this.request()
  },
  watch: {
    songerlist () {
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
.MainBox{
  overflow: hidden;
}
.tag {
  position: fixed;
  top: 88px;
  right: 0;
  width: 50px;
  height: calc(100% - 88px);
  text-align: center;
}
.tag ul{
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
