<template>
  <div id="app">
    <router-view v-if="appOff"/>
    <Music :replaceList="replaceList" :AddSong="AddSong"></Music>
  </div>
</template>

<script>
import Music from './components/music/music'
export default {
  name: 'App',
  components: {
    Music
  },
  data () {
    return {
      // 把之前的播放列表替换成这个播放列表
      replaceList: [],
      // 在已有的播放列表，添加一首歌到播放列表
      AddSong: {},
      appOff: true
    }
  },
  provide () {
    return {
      PushSong: this.PushSong,
      replace: this.replace,
      reload: this.reload
    }
  },
  methods: {
    PushSong (list) {
      this.AddSong = list
    },
    replace (list) {
      this.replaceList = list
      // console.log(list)
    },
    reload () {
      this.appOff = false
      this.$nextTick(() => {
        this.appOff = true
      })
    }
  }
}
</script>

<style>
  #app{
    position: relative;
  }
</style>
