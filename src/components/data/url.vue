<template>
  <span></span>
</template>

<script>
const rankingUrl = 'http://xiaonaimao.gotoip2.com/music/php/rb.php' // 歌榜排行
const ImgUlrT = 'https://y.gtimg.cn/music/photo_new/T002R90x90M000'
const ImgUrlH = '.jpg?max_age=2592000'
const DieImgT = 'https://y.gtimg.cn/music/photo_new/T002R300x300M000'
const DieImgH = '.jpg?max_age=2592000'
const NewDieT = 'https://y.gtimg.cn/music/photo_new/T002R150x150M000'
const NewDieH = '.jpg?max_age=2592000'
const SongerT = 'https://y.gtimg.cn/music/photo_new/T001R150x150M000'
const SongerH = '.jpg?max_age=2592000'
const SongUrlT = 'http://ws.stream.qqmusic.qq.com/'
const SongUrlH = '?fromtag=0&guid=126548448&vkey='
const NavData = [
  {name: '我的', url: '/user'},
  {name: '音乐馆', url: '/'},
  {name: '发现', url: '/demo'}
]
const sort = [
  {name: '歌手', icon: 'icon-ai-user', url: '/songer'},
  {name: '排行', icon: 'icon-paihangbang', url: '/ranking'},
  {name: '分类歌单', icon: 'icon-fenlei1', url: '/sort'},
  {name: '视频', icon: 'icon-shipin', url: '/MvSort'}
]
function userlogin () {
  let userlist = JSON.parse(localStorage.getItem('QQMusicUser'))
  let user
  if (userlist) {
    for (var i = 0; i < userlist.length; i++) {
      if (userlist[i].off) {
        user = userlist[i]
      }
    }
  }
  return user
}
function usersave (data, off) {
  let userlist = JSON.parse(localStorage.getItem('QQMusicUser'))
  if (userlist) {
    for (var i = 0; i < userlist.length; i++) {
      if (userlist[i].off) {
        if (off === 'collectsong') {
          userlist[i].collectsong.unshift(data)
        } else if (off === 'songlist') {
          userlist[i].songlist.unshift(data)
        }
      }
    }
    localStorage.setItem('QQMusicUser', JSON.stringify(userlist))
  }
}
export default {
  name: 'url',
  NavData,
  rankingUrl,
  sort,
  ImgUlrT,
  ImgUrlH,
  DieImgT,
  DieImgH,
  NewDieT,
  NewDieH,
  SongerT,
  SongerH,
  SongUrlT,
  SongUrlH,
  userlogin,
  usersave
}
</script>

<style scoped>

</style>
