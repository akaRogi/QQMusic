<template>
  <div class="MvComment" ref="wrapper" :style="HeightStyle">
    <div>
      <div class="MvCommentHot" v-if="Comment.hot_comment.commentlist">
        <h2>热评<span>{{commentLength(Comment.hot_comment.commentlist)}}</span></h2>
        <ul>
          <li v-for="(item, index) in Comment.hot_comment.commentlist" :key="item.rootcommentcontent + index">
            <div class="MvCommentTx">
              <img :src="item.avatarurl" alt="用户头像">
            </div>
            <div class="MvCommentMain">
              <div class="comment_list__heading">
                <div class="MvHeaderBox">
                  <h3>{{item.nick}}</h3>
                  <div class="MvDate">
                  </div>
                </div>
                <div class="js_cmt_click">
                  <p v-html="plMain(item.rootcommentcontent)"></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="MvCommentHot" v-if="Comment.comment.commentlist">
        <h2>全部评论<span>{{commentLength(Comment.comment.commentlist)}}</span></h2>
        <ul>
          <li v-for="(item, index) in Comment.comment.commentlist" :key="index">
            <div class="MvCommentTx">
              <img :src="item.avatarurl" alt="用户头像">
            </div>
            <div class="MvCommentMain">
              <div class="comment_list__heading">
                <div class="MvHeaderBox">
                  <h3>{{item.nick}}</h3>
                  <div class="MvDate">
                  </div>
                </div>
                <div class="js_cmt_click">
                  <p v-html="plMain(item.rootcommentcontent)"></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p class="load" v-show="lengOff">没有更多啦</p>
        <p class="load" v-show="loadOff">载入中...</p>
      </div>
      <div class="noComment" v-if="!Comment.comment.commentlist && !Comment.hot_comment.commentlist">
        这首MV还没有评论哦~
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'comment',
  props: ['off'],
  data () {
    return {
      Comment: {
        hot_comment: {
          commentlist: null
        },
        comment: {
          commentlist: null
        }
      },
      HeightStyle: '',
      p: 0,
      pushOff: true,
      loadOff: false,
      lengOff: false
    }
  },
  methods: {
    commentLength (data) {
      return data.length
    },
    plMain (str) {
      return str.split('\\n').join('<br>')
    },
    requestheight () {
      // 获取body到头部之间剩下的距离
      let top = document.getElementsByClassName('MvPlayBox')[0]
      let Hea = parseInt(getComputedStyle(top).height)
      let hei = document.documentElement.clientHeight - Hea - 1
      // 解决污染HTML模板
      this.HeightStyle = 'height:' + hei + 'px'
      // console.log(this.HeightStyle)
    },
    requestList () {
      this.p++
      var This = this
      let id = this.$route.params.id
      let p = this.p
      let url = `http://xiaonaimao.gotoip2.com/music/php/getMvCommentList.php?id=${id}&p=${p}`
      this.axios.get(url)
        .then(function (response) {
          console.log(response.data.comment.commentlist)
          let list = response.data.comment.commentlist
          if (!list) {
            This.lengOff = true
            This.loadOff = false
          }
          for (var i = 0; i < list.length; i++) {
            This.Comment.comment.commentlist.push(list[i])
          }
          console.log(This.Comment.comment.commentlist)
          This.pushOff = true
          This.loadOff = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    BScrollOff () {
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
              this.requestList()
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
  },
  created () {
    var This = this
    let id = this.$route.params.id
    let url = `http://xiaonaimao.gotoip2.com/music/php/getMvMain.php?id=${id}`
    this.axios.get(url)
      .then(function (response) {
        This.Comment.hot_comment.commentlist = response.data.hot_comment.commentlist
        This.Comment.comment.commentlist = response.data.comment.commentlist
        console.log(response.data.comment.commentlist)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  watch: {
    Comment: {
      handler () {
        this.BScrollOff()
      },
      deep: true // 深度监控开启，deep不能改写。
    },
    off () {
      this.BScrollOff()
    }
  }
}
</script>

<style scoped>
  .MvComment{
    z-index: -1;
    overflow: hidden;
  }
  .MvCommentHot{
    margin: 0 14px 0 10px;
    box-sizing: border-box;
    z-index: -1;
  }
  .MvCommentHot h2{
    margin: 0;
    padding: 10px 0;
    font-size: 28px;
    font-weight: 300;
    margin-bottom: 10px;
  }
  .MvCommentHot h2 span{
    margin-left: 10px;
    font-size: 30px;
    color: grey;
  }
  .MvComment li{
    position: relative;
    display: -webkit-box;
    margin-bottom: 10px;
    padding-top: 6px;
    border-bottom: 1px solid rgba(0,0,0,.05);
    padding-bottom: 10px;
  }
  .MvCommentTx{
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 100%;
    background-color: rgba(203,203,203,.2);
    -webkit-user-select: none;
  }
  .MvCommentTx img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
    pointer-events: none;
  }
  .MvCommentMain{
    position: relative;
    -webkit-box-flex: 1;
    padding-bottom: .1rem;
  }
  .MvHeaderBox{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    min-height: .35rem;
    margin-bottom: 6px;
  }
  .comment_list__heading {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    min-height: .35rem;
  }
  .comment_list__heading h3{
    display: -webkit-box;
    -webkit-box-align: center;
    margin: -.04rem 0 -.02rem;
    font-size: 26px;
    font-weight: 300;
    color: grey;
  }
  .MvDate{
    display: -webkit-box;
    -webkit-box-align: center;
    font-size: .1rem;
    color: grey;
  }
  .js_cmt_click{
    position: relative;
    font-size: 24px;
  }
  .js_cmt_click p {
    margin: 0;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    text-align: justify;
    line-height: 1.6;
  }
  .load{
    text-align: center;
    font-size: 24px;
  }
  .noComment{
    font-size: 30px;
    margin-top: 20px;
    margin-left: 10px;
  }
</style>
