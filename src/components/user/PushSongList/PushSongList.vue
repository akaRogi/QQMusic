<template>
  <div class="PushSongList">
    <div class="TitleBox">
      <span class="iconfont icon-fanhui" @click="cancel"></span>
      <h3>添加歌单</h3>
    </div>
    <div class="Box SongListTitle">
      <span>歌单标题：</span>
      <input type="text" v-model="SongMain.title"/>
    </div>
    <div class="Box SongListDescription">
      <span>歌单描述：</span>
      <textarea v-model="SongMain.description"></textarea>
    </div>
    <div class="PushBtn" @click="PushSong">
      确定添加
    </div>
  </div>
</template>

<script>
export default {
  name: 'PushSongList',
  inject: ['reload'],
  data () {
    return {
      SongMain: {
        // id由随机数生成，四舍五入，取值在7位数，去除小数点
        id: parseInt(Math.random() * 9999999 + 1000000),
        title: '',
        description: '',
        list: [],
        SongLister: '',
        // 记录创建歌单的时间
        date: new Date().getFullYear() + '年' + new Date().getMonth() + '月' + new Date().getDate() + '日',
        dele: false
      }
    }
  },
  methods: {
    PushSong () {
      if (this.SongMain.title === '' || this.SongMain.description === '') {
        alert('歌单标题或歌单描述不能为空')
      } else {
        let user = this.UrlData.userlogin()
        // 判断是否登陆
        if (user) {
          // 判断该用户的收藏歌单里面是否存在收藏的歌单
          this.UrlData.usersave(this.SongMain, 'songlist')
          alert('添加成功')
          this.reload()
          // console.log(JSON.parse(localStorage.getItem('QQMusicUser')))
        } else {
          alert('请先登陆')
        }
      }
    },
    cancel () {
      this.$emit('PushShow', false)
    }
  },
  created () {
    this.SongMain.SongLister = this.UrlData.userlogin().account
  }
}
</script>

<style scoped>
.TitleBox{
  height: 100px;
  position: relative;
  text-align: center;
  background: #31c27c;
  color: #fff;
}
.TitleBox h3{
  line-height: 3;
  font-size: 30px;
  font-weight: 400;
}
.TitleBox span{
  position: absolute;
  top: calc(50% - 20px);
  left: 10px;
}
.PushSongList{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}
.Box.SongListTitle{
  margin-top: 20px;
}
.Box.SongListDescription textarea{
  width: 80%;
  height: 200px;
  border: 2px solid;
  padding: 10px 10px;
  box-sizing: border-box;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  float: right;
}
.Box{
  width: 90%;
  margin: 0 auto 50px auto;
  overflow: hidden;
}
.Box span{
  width: 20%;
  float: left;
}
.Box input{
  width: calc(80% - 4px);
  height: 50px;
  border: 2px solid;
  padding: 0 10px;
  box-sizing: border-box;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  float: right;
}
.PushBtn{
  width: 200px;
  padding: 20px 0;
  background: #31c27c;
  color: #fff;
  text-align: center;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  margin: 0 auto;
}
</style>
