<template>
  <video id="Video" :src="PlaySong" autoplay></video>
</template>

<script>
export default {
  name: 'VideoBox',
  props: ['src', 'tiemPlay', 'p'],
  data () {
    return {
      list: this.src,
      SongUrlT: this.UrlData.SongUrlT,
      SongUrlH: this.UrlData.SongUrlH,
      PlayData: '',
      PlaySong: '',
      SongLeng: ''
    }
  },
  mounted () {
    let This = this
    // 找到播放列表的第p项
    this.PlayData = this.list[this.p]
    // 获取该项的歌曲ID
    let id = null
    if (this.PlayData.mid) {
      id = this.PlayData.mid
    } else if (this.PlayData.data.songmid) {
      id = this.PlayData.data.songmid
    }
    // 通过该ID进行请求播放地址
    this.request(id)
    // 把当前播放音乐的数据传递到父级组件 （用于获取歌曲封面、歌曲标题、歌手等...）
    let TIME = null
    This.$emit('dataShow', This.PlayData)

    var md = document.getElementById('Video')
    if (md.ended) {
      alert('歌曲BUG触发')
    }
    md.addEventListener('ended', function () {
      // 播放完毕之后执行的事件
      // 列表+1(自动播放下一首)
      This.$emit('PlusLess', true)
      // 找到+1对应的数据
      This.PlayData = This.list[This.p]
      // 获取到改数据的播放ID
      if (This.PlayData.mid) {
        id = This.PlayData.mid
      } else if (This.PlayData.data.songmid) {
        id = This.PlayData.data.songmid
      }
      // 通过该ID进行请求
      This.request(id)
      // 把当前播放音乐的数据传递到父级组件 （用于获取歌曲封面、歌曲标题、歌手等...）
      This.$emit('dataShow', This.PlayData)
      // 当播放完毕之后，把按钮改成暂停
      This.$emit('SongFn', false)
      // 一首歌播放完毕之后清楚进度条的定时器
      clearInterval(TIME)
    })
    md.addEventListener('canplay', function () {
      // 当载入完毕之后，把按钮改成播放
      This.$emit('SongFn', true)
      // 当前歌曲的总长
      console.log(md.duration)
      // 当新的歌曲载入完毕之后。开启进度条定时器
      This.SongLeng = md.duration
      md.play()
      TIME = setInterval(() => {
        This.$emit('thisTime', md.currentTime / md.duration * 100)
        // console.log(md.currentTime)
      }, 1000)
    })
  },
  methods: {
    request (id) {
      let This = this
      let mid = id
      let url = `http://xiaonaimao.gotoip2.com/music/php/getsongurl.php?mid=${mid}`
      this.axios.get(url)
        .then(function (response) {
          This.PlaySong = This.SongUrlT + response.data.data.items[0].filename + This.SongUrlH + response.data.data.items[0].vkey
          console.log(response.data.data.items)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  watch: {
    tiemPlay (to) {
      // console.log(this.SongLeng * (to / 100))
      var md = document.getElementById('Video')
      md.currentTime = this.SongLeng * (to / 100)
      // currentTime
    },
    p (to) {
      this.PlayData = this.list[this.p]
      // 获取到改数据的播放ID
      let id = this.PlayData.mid
      if (this.PlayData.mid) {
        id = this.PlayData.mid
      } else if (this.PlayData.data.songmid) {
        id = this.PlayData.data.songmid
      }
      // 通过该ID进行请求
      this.request(id)
      this.$emit('dataShow', this.PlayData)
    }
  }
}
</script>

<style scoped>

</style>
