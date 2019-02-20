<template>
  <li @click="urlShow(data.album_mid, data)">
    <div class="imgBox" :style="'margin-right:' + marg">
      <img :src="imgUrl()" alt="">
    </div>
    <div class="TextBox">
      <p>{{Title(data.album_name)}}</p>
      <p><span
        v-for="(item,index) in SongEr(data.singers)"
        :key="index"
      >{{item.singer_name || item.name}}</span></p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'plateLi',
  inject: ['PushSong'],
  props: ['data', 'marg', 'UrlOff'],
  data () {
    return {
      DieImgT: this.UrlData.DieImgT,
      DieImgH: this.UrlData.DieImgH,
      ImgUlrT: this.UrlData.ImgUlrT,
      ImgUrlH: this.UrlData.ImgUrlH,
      songer: []
    }
  },
  methods: {
    imgUrl () {
      let imgurl = this.data.album_mid
      if (imgurl) {
        imgurl = this.DieImgT + imgurl + this.DieImgH
      } else {
        imgurl = this.data.album.mid
        imgurl = this.ImgUlrT + imgurl + this.ImgUrlH
      }
      return imgurl
    },
    Title (data) {
      let title = data
      if (!title) {
        title = this.data.subtitle || this.data.title
      }
      return title
    },
    SongEr (data) {
      let songer = data
      if (!songer) {
        songer = this.data.singer
      }
      return songer
    },
    urlShow (url, data) {
      if (this.UrlOff) {
        this.$router.push('/NewDie/' + url)
      } else {
        // console.log(data)
        this.PushSong(data)
      }
    }
  }
}
</script>

<style scoped>
  .TextBox p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
