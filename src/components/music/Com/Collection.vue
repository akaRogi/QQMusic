<template>
  <div class="Collection">
    <header>
      <i class="iconfont icon-fanhui" @click="pushno()"></i>
      <h3>收藏歌曲</h3>
    </header>
    <div class="Main">
      <ul>
        <li
          v-for="(item, index) in data"
          :key="index"
          @click="PushList(item)"
        >
          <div class="ImgBox">
            <img src="https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/default_pic.jpg?max_age=19830212&d=20151105145423" alt="">
          </div>
          <div class="Text">
            <p>{{item.title}}</p>
            <p>{{leng(item.list)}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Collection',
  props: ['res'],
  data () {
    return {
      data: {}
    }
  },
  methods: {
    leng (data) {
      return '共' + data.length + '首'
    },
    pushno () {
      this.$emit('PushSong', false)
    },
    PushList (item) {
      console.log(item)
      let pushOff = true
      // 判断该歌单是否存在歌曲
      if (!item.list.length) {
      //  如果没歌曲
        item.list.push(this.res)
        console.log(item)
        alert('收藏成功')
      } else {
        //  如果有歌曲
        // 判断该歌曲在该歌单是否存在
        for (var i = 0; i < item.list.length; i++) {
          if (item.list[i].mid === this.res.mid) {
            pushOff = false
          }
        }
        if (pushOff) {
          item.list.push(this.res)
          alert('收藏成功')
        } else {
          alert('该歌曲已存在该歌单')
        }
      }
      let userlist = JSON.parse(localStorage.getItem('QQMusicUser'))
      if (userlist) {
        for (var j = 0; j < userlist.length; j++) {
          if (userlist[j].off) {
            for (var e = 0; e < userlist[j].songlist.length; e++) {
              if (userlist[j].songlist[e].id === item.id) {
                userlist[j].songlist[e] = item
                localStorage.setItem('QQMusicUser', JSON.stringify(userlist))
              }
            }
          }
        }
      }
    }
  },
  created () {
    let user = this.UrlData.userlogin()
    this.data = user.songlist
    console.log(user.songlist)
  }
}
</script>

<style scoped>
header{
  position: relative;
  padding: 20px 0;
}
header h3{
  font-size: 30px;
  font-weight: 400;
  text-align: center;
}
header i{
  position: absolute;
  left: 10px;
}
.Collection{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99999999;
  background: #fff;
}
.Collection li{
  display: flex;
  margin-bottom: 20px;
}
.Collection li:last-child{
  margin-bottom: 0;
}
.ImgBox{
  width: 30%;
}
.Text{
  width: 70%;
  padding-left: 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.Text p{
  width: 100%;
  font-size: 24px;
  color: #b3b3b3;
}
.Text p:first-child{
  font-size: 30px;
  color: #555;
}
</style>
