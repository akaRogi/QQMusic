<template>
  <div>
    <Main
      :data="data"
    ></Main>
  </div>
</template>

<script>
import Main from './listCom/listCom'
export default {
  name: 'SongList',
  components: {
    Main
  },
  data () {
    return {
      data: {
        songlist: []
      }
    }
  },
  created () {
    let This = this
    let url = 'http://www.theskytydd.cn/Api/SongLlst.php?id='
    let id = this.$route.params.id
    this.axios.get(url + id)
      .then(function (response) {
        This.data = response.data.cdlist[0]
        console.log(response.data.cdlist[0])
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
