<template>
  <div class="Mv">
    <div class="MvPlayBox">
      <VideoPlayer v-if="hackReset"></VideoPlayer>
      <nav>
        <ul class="nav">
          <li @click="DetailsShow" :class="{show : !NavTag}">详情</li>
          <li @click="CommentShow" :class="{show : NavTag}">评论</li>
        </ul>
      </nav>
    </div>
    <MvDetails v-if="hackReset" v-show="!NavTag"></MvDetails>
    <Comment v-if="hackReset" v-show="NavTag" :off="NavTag"></Comment>
  </div>
</template>

<script>
import VideoPlayer from './VideoPlayer/ViderPlayer'
import MvDetails from './Com/MvDetails'
import Comment from './Com/comment'
export default {
  name: 'Mv',
  components: {
    VideoPlayer,
    MvDetails,
    Comment
  },
  data () {
    return {
      hackReset: true,
      NavTag: false,
      HeightStyle: ''
    }
  },
  methods: {
    off () {
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    DetailsShow () {
      this.NavTag = false
    },
    CommentShow () {
      this.NavTag = true
    }
  },
  watch: {
    $route () {
      this.off()
    }
  }
}
</script>

<style scoped>
nav ul{
  display: flex;
  justify-content: space-around;
  padding: 20px 0 10px 0;
}
nav li{
  color: #000;
  font-size: 24px;;
  position: relative;
  padding-bottom: 10px;
}
nav li.show{
  color: #31c27c;
}
nav li.show:after{
  position: absolute;
  bottom: 0;
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: #31c27c;
}
</style>
