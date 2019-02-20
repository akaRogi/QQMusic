<template>
  <div class="Search">
    <div class="search" style="display: block;">
      <div class="off">
        <div class="input_box">
          <div class="fanhui">
            <i class="iconfont icon-fanhui" @click.stop="fanhui()"></i>
          </div>
          <div class="inp">
            <input type="text" name="" id="sea" value="" @keyup.13="searchFn()" v-model="val">
          </div>
        </div>
        <div class="Hot_box">
          <div class="SongList" v-show="!off">
            <ul class="list_search">
              <li
                v-for="(item,index) in SongList"
                :key="index"
                @click="PlayMusic(item)"
              >
                <h6>{{item.name || item.title}}</h6>
                <p><span v-for="(SongName, j) in item.singer" :key="j">{{SongName.name}}</span></p>
              </li>
            </ul>
          </div>

          <div class="search_hot" v-show="off">
            <h3>热门搜索</h3>
            <ul class="hot_ul">
              <li v-for="hotItem in HotList" :key="hotItem.k"><a href="Javascript:;;" @click="clickSearch(hotItem.k)">{{hotItem.k}}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  inject: ['PushSong'],
  data () {
    return {
      val: '',
      p: 20,
      off: true,
      HotList: [],
      SongList: []
    }
  },
  methods: {
    PlayMusic (data) {
      this.PushSong(data)
    },
    fanhui () {
      this.$emit('searchHid')
    },
    searchFn () {
      let This = this
      let val = this.val
      let p = this.p
      let url = `http://xiaonaimao.gotoip2.com/qq/php/newsearch.php?val=${val}&p=${p}`
      this.axios.get(url)
        .then(function (response) {
          This.SongList = response.data.data.song.list
          This.off = false
          console.log(response.data.data.song.list)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    clickSearch (val) {
      this.val = val.split(' ').join('')
      this.searchFn()
    }
  },
  created () {
    let This = this
    let url = 'http://xiaonaimao.gotoip2.com/qq/php/search_Hot.php'
    this.axios.get(url)
      .then(function (response) {
        This.HotList = response.data.data.hotkey
        console.log(response.data.data.hotkey)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>
.Search{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 9999999999;
}
.input_box {
  padding: 20px;
  background: rgb(244, 244, 244);;
}
.Hot_box {
  overflow: hidden;
  background: #fff;
  padding: 30px 30px 20px 30px;
}
.fanhui{
  width: 50px;
  height: 100%;
  line-height: 2.5;
  float: left;
}
.input_box .inp {
  width: calc(100% - 50px);
  height: 72px;
  overflow: hidden;
  background: #fff;
  border-radius: 6px;
  background-repeat: no-repeat;
  background-position: 12px;
  background-size: 48px;
  box-sizing: border-box;
  padding-left: 80px;
  background-image: url(../../../assets/imgs/search.png);
}
.input_box .inp input {
  width: 100%;
  height: 100%;
  border: 2px;
  font-size: 30px;
  border-radius: 12px;
  outline: none;
  color: rgba(0,0,0,.3);
}
.Hot_box h3 {
  color: rgba(0,0,0,.6);
  margin-bottom: 16px;
  font-size: 28px;
}
.list_search li {
  position: relative;
  margin-top: 26px;
  height: 100px;
  padding-left: 112px;
  background-repeat: no-repeat;
  background-size: 52px;
  background-position: 10px 20px;
  background-image: url(../../../assets/imgs/search_sprite.png);
}
.list_search li h6 {
  margin-bottom: 5px;
  line-height: 36px;
  font-size: 32px;
  font-weight: normal;
  color: #000;
}
.list_search li p {
  color: #808080;
}
.list_search li span:nth-child(n+1) {
  margin-right: 20px;
}
.Hot_box .hot_ul li {
  float: left;
  padding: 8px 20px;
  font-size: 28px;
  border: 1px solid rgba(0,0,0,.6);
  border-radius: 99px;
  margin-bottom: 20px;
  margin-right: 28px;
}
.Hot_box li a {
  color: #000;
}

</style>
