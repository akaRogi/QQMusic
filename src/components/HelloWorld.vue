<template>
<div class="wrapper" ref="wrapper">
  <ul class="content">
    <li>
      321321
    </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li><li>
    321321
  </li>
  </ul>
</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      itemList: [
        {
          'title': '关注'
        },
        {
          'title': '推荐'
        },
        {
          'title': '深圳'
        },
        {
          'title': '视频'
        },
        {
          'title': '音乐'
        },
        {
          'title': '热点'
        },
        {
          'title': '新时代'
        },
        {
          'title': '娱乐'
        },
        {
          'title': '头条号'
        },
        {
          'title': '问答'
        },
        {
          'title': '图片'
        },
        {
          'title': '科技'
        },
        {
          'title': '体育'
        },
        {
          'title': '财经'
        },
        {
          'title': '军事'
        },
        {
          'title': '国际'
        }
      ]
    }
  },
  created () {
    alert(this.UrlData.token)
  },
  mounted () {
    // 即定时器 20ms
    this.$nextTick(() => {
      // $refs绑定元素
      if (!this.scroll) {
        alert(222)
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
  }
}
</script>

<style>
.wrapper {
width: 200px;
height: 200px;
overflow: hidden;
margin: 0 auto;
padding: 5px;
}
.tab_content {
line-height: 2rem;
}
.tab_item{
flex: 0 0 60px;
width:60px;
}
</style>
