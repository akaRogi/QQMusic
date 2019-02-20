<template>
  <div class="box">
    <Main
      :data="data"
    ></Main>
  </div>
</template>

<script>
import Main from './listCom/listCom'
export default {
  name: 'DieList',
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
    let url = 'http://xiaonaimao.gotoip2.com/music/php/dieMain.php?id='
    let id = this.$route.params.id
    this.axios.get(url + id)
      .then(function (response) {
        console.log(response.data.data)
        This.data = response.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
