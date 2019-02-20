<template>
  <div class="MainUl">
    <!--推荐歌单-->
    <ul v-if="type === 'SongList'">
      <li
        v-for="(item,index) in data"
        :key="index"
        v-if="index <= 5"
        @click="SongListFn(item)"
      >
        <div class="imgBox">
          <img :src="item.cover" alt="">
        </div>
        <div class="TextBox">
          <p>{{item.title}}</p>
          <p>{{'播放量：' + listen_num(item.listen_num)}}</p>
        </div>
      </li>
    </ul>
    <!--推荐音乐-->
    <ul v-if="type === 'RandomSong'">
      <li
        v-for="(item,index) in data"
        :key="index"
        v-if="index <= 5"
        @click="pushList(item)"
      >
        <div class="imgBox">
          <img :src="ImgUlrT + item.data.albummid + ImgUrlH" alt="">
        </div>
        <div class="TextBox">
          <p>{{item.data.songname}}</p>
          <p><span
            v-for="(val,j) in item.data.singer"
            :key="j"
          >{{val.name}}</span></p>
        </div>
      </li>
    </ul>
    <!--推荐MV-->
    <ul class="MvUl" v-if="type === 'MvList'">
      <li
        v-for="(item,index) in data"
        :key="index"
        v-if="index <= 5"
      >
        <div class="imgBox">
          <img :src="item.picurl" alt="">
        </div>
        <div class="TextBox">
          <p>{{item.mvtitle}}</p>
          <p><span
            v-for="(val,j) in item.singers"
            :key="j"
          >{{val.name}}</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Main',
  inject: ['PushSong', 'replace'],
  props: ['type', 'data'],
  data () {
    return {
      ImgUlrT: this.UrlData.ImgUlrT,
      ImgUrlH: this.UrlData.ImgUrlH
    }
  },
  methods: {
    listen_num (val) {
      let num = val
      if (num >= 10000) {
        num = (num / 10000).toFixed(1) + '万'
      }
      return num
    },
    SongListFn (data) {
      let id = data.content_id
      this.$router.push('/SongList/' + id)
      // console.log(data)
    },
    pushList (data) {
      this.PushSong(data)
      // console.log(data)
    }
  }
}
</script>

<style scoped>
.MainUl{
  margin-bottom: 50px;
}
.MainUl ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.MainUl li .imgBox{
  height: 248px;
  overflow: hidden;
}
.MainUl li .imgBox img{
  width: 100%;
}
.MainUl li{
  width: 248px;
  overflow: hidden;
  margin-bottom: 45px;
}
.TextBox{
  padding-left: 6px;
  box-sizing: border-box;
}
.MainUl li p{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.MainUl li p:nth-child(1){
  font-size: 24px;
  margin: 22px 0 11px 0;
}
.MainUl li p:nth-child(2){
  font-size: 22px;
  color: #666;
}
.MainUl .MvUl li{
  width: calc(50% - 2px);
}
.MainUl .MvUl li .imgBox{
  height: auto;
}
</style>
