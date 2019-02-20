<template>
  <div class="MvList">
    <TopTitle :title="'分类'"></TopTitle>
    <MavNav :data="data.nav"></MavNav>
    <div class="MainBox">
      <h3>推荐的Mv</h3>
      <Main :data="data.main"></Main>
    </div>
  </div>
</template>

<script>
import MavNav from './com/Nav'
import Main from './com/Main'
export default {
  name: 'MvList',
  components: {
    MavNav,
    Main
  },
  data () {
    return {
      data: {
        nav: {},
        main: []
      },
      p: 0
    }
  },
  created () {
    // 由于请求导航的时候
    // 导航的api与内容内容会在一起所以不能一起请求
    let This = this
    this.axios.get('http://xiaonaimao.gotoip2.com/music/php/SortMv.php')
      .then(function (response) {
        console.log(response.data)
        This.data.nav = response.data.mv_tag.data
        This.data.main = response.data.mv_list.data.list
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>
.MainBox{
  margin: 0 10px;
}
.MainBox h3{
  margin-bottom: 32px;
  font-size: 30px;
  font-weight: 400;
}
</style>
