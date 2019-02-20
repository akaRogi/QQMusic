<template>
  <div class="songlist">
    <h3>我的歌单</h3>
    <div class="Gn">
      <span @click="deleshow" :class="{show : show}">管理</span>
      <span @click="PushSongList">新增</span></div>
    <ul>
      <li
        v-for="(item, index) in list.songlist"
        :key="index"
        :class="{show : show}"
      >
        <router-link
          tag="div"
          class="Box"
          :to="'/LocalData/' + item.id"
        >
          <div class="ImgBox">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548929737170&di=05f26a24adcd22298386c8c78d25c7f4&imgtype=0&src=http%3A%2F%2Fwww.jf258.com%2Fuploads%2F2015-05-16%2F200044886.jpg" alt="">
          </div>
          <div class="TextBox">
            <h3>{{item.title}}</h3>
            <p>{{item.description}}</p>
          </div>
        </router-link>
        <div class="cheBox" @click="item.dele = !item.dele">
          <input type="checkbox" v-model="item.dele"/>
        </div>
      </li>
    </ul>
    <div class="DeleBox" :class="{show : show}">
      <div class="DeleIcon">
        <i class="iconfont icon-iconfontshanchu2" @click="delelist()"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'songlist',
  data () {
    return {
      list: [],
      show: false
    }
  },
  methods: {
    PushSongList () {
      this.$emit('PushShow', true)
    },
    deleshow () {
      this.show = !this.show
    },
    delelist () {
      var mymessage = confirm('确定要删除吗')
      if (mymessage === true) {
        let userlist = JSON.parse(localStorage.getItem('QQMusicUser'))
        if (userlist) {
          for (var i = 0; i < userlist.length; i++) {
            if (userlist[i].off) {
              userlist[i].songlist = this.list.songlist.filter(itme => !itme.dele)
              this.list.songlist = this.list.songlist.filter(itme => !itme.dele)
              localStorage.setItem('QQMusicUser', JSON.stringify(userlist))
              alert('删除成功')
            }
          }
        }
      }
    }
  },
  created () {
    this.list = this.UrlData.userlogin()
    console.log(this.list)
  }
}
</script>

<style scoped>
.songlist{
  margin: 50px 10px 40px 10px;
  position: relative;
}
.songlist h3{
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 400;
}
.songlist .Gn{
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24px;
}
.songlist .Gn span{
  float: left;
}
.songlist .Gn span.show{
  color: #32c27c;
}
.songlist .Gn span:last-child{
  position: relative;
  padding-left: 19px;
  margin-left: 20px;
}
.songlist .Gn span:last-child::before{
  content: "";
  display: block;
  position: absolute;
  width: 2px;
  left: 0;
  top: calc(50% - 6px);
  height: 15px;
  background: #2b333f;
}
.ImgBox{
  width: 150px;
  height: 150%;
  margin-right: 20px;
}
.ImgBox img{
  width: 100%;
}
.songlist li {
  overflow: hidden;
  position: relative;
  width: 100%;
}
.songlist .Box{
  display: flex;
  margin-bottom: 20px;
}
.cheBox{
  position: absolute;
  padding: 0 5% 0 0;
  transition: right .2s;
  right: calc(-5% - 66px);
  top: 0;
  z-index: 9999999;
  display: flex;
  align-items: center;
  height: 100%;
}
.show .cheBox{
  padding: 0 5% 0 95%;
  height: 100%;
  right: 0;
}
.TextBox{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
}
.DeleBox.show{
  bottom: 0;
}
.DeleBox{
  position: fixed;
  transition: bottom .2s;
  left: 0;
  bottom: -130px;
  width: 100%;
  height: 80px;
  border-top: 2px solid rgba(0,0,0,.2);
}
.DeleIcon{
  position: relative;
  width: 100%;
  height: 100%;
}
.DeleIcon i{
  position: absolute;
  width: 100px;
  height: 100px;
  top: 0;
  right: 0;
  bottom: 70px;
  left: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background: #fff;
  border-top: 2px solid rgba(0,0,0,.2);
  font-size: 40px;
}
</style>
