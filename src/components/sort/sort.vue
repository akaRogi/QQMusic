<template>
  <div class="sort">
    <TopTitle :title="'分类歌单'"></TopTitle>
    <RecoSort></RecoSort>
    <Main :data="list"></Main>
  </div>
</template>

<script>
import RecoSort from './SortCom/RecoSort'
import Main from './SortCom/Main'
export default {
  name: 'sort',
  components: {
    RecoSort,
    Main
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    let This = this
    let id = 165
    let sin = 0
    let ein = 29
    let url = `http://www.theskytydd.cn/Api/SortList.php?id=${id}&sin=${sin}&ein=${ein}`
    this.axios.get(url)
      .then(function (response) {
        This.list = response.data.data.list
        console.log(response.data.data.list)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
