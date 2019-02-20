<template>
  <div class="set">
    <h3>我收藏的歌单</h3>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="Show(item.disstid)"
      >
        <div class="ImgBox">
          <img :src="item.logo" alt="">
        </div>
        <div class="TextBox">
          <h3>{{item.dissname}}</h3>
          <p>{{'创建者：' + item.nick}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'set',
  data () {
    return {
      list: []
    }
  },
  methods: {
    Show (id) {
      this.$router.push('/SongList/' + id)
    }
  },
  created () {
    let user = this.UrlData.userlogin()
    let This = this
    let url = 'http://www.theskytydd.cn/Api/SongLlst.php?id='
    if (user) {
      let id = user.collectsong.join(',')
      this.axios.get(url + id)
        .then(function (response) {
          This.list = response.data.cdlist
          console.log(This.list)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    // console.log(user.collectsong)
  }
}
</script>

<style scoped>
  .set{
    margin: 50px 10px 40px 10px;
  }
  .set h3{
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: 400;
  }
  .ImgBox{
    width: 150px;
    height: 150%;
    margin-right: 20px;
  }
  .ImgBox img{
    width: 100%;
  }
  .set li{
    display: flex;
    margin-bottom: 20px;
  }
  .TextBox{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
  }
</style>
