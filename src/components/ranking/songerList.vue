<template>
  <div class="songerList">
    <Main :data="data"></Main>
  </div>
</template>

<script>
import Main from './listCom/songlist'
export default {
  name: 'songerList',
  components: {
    Main
  },
  data () {
    return {
      data: {
        list: []
      }
    }
  },
  created () {
    let id = this.$route.params.id
    let url = `http://xiaonaimao.gotoip2.com/music/php/songersong.php?id=${id}`
    let This = this
    this.axios.get(url)
      .then(function (response) {
        This.data = response.data.data
        console.log(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
