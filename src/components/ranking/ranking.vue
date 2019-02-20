<template>
  <div class="ranking">
    <div class="header">
      <router-link
        tag="i"
        class="iconfont icon-fanhui"
        to="/"
      ></router-link>
      <h2>QQ音乐排行榜</h2>
    </div>
    <ul>
      <li
        v-for="(item,index) in list"
        :key="index"
        @click="rankingFn(item)"
      >
        <div class="item">
          <div class="imgBox">
            <img :src="item.picUrl">
          </div>
          <div class="info">
            <div>
              <h3>{{item.topTitle}}</h3>
              <p v-for="(name,index) in item.songList" :key="name.songname">{{index+1}}<span>{{name.songname}}</span>-{{name.singername}}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <loading v-if="loadingOff"></loading>
  </div>
</template>

<script>
export default {
  name: 'ranking',
  data () {
    return {
      list: [],
      loadingOff: true
    }
  },
  methods: {
    rankingFn (data) {
      let id = data.id
      this.$router.push('/rankList/' + id)
      // console.log(data.id)
    }
  },
  created () {
    let This = this
    let url = this.UrlData.rankingUrl
    this.axios.get(url)
      .then(function (response) {
        console.log(response.data.data.topList)
        This.list = response.data.data.topList
        This.loadingOff = false
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>
  .header{
    height: 88px;
    background: #31c27c;
    text-align: center;
    position: relative;
    color: #fff;
  }
  .header h2{
    line-height: 2.6;
    font-size: 35px;
  }
  .header i{
    position: absolute;
    left: 10px;
    font-size: 30px;
    top: calc(50% - 20px);
  }
  .ranking ul{
    margin: 20px;
  }
  .ranking li {
    margin-bottom: 20px;
    overflow: hidden;
    background-color: #fff;
  }
  .ranking li .item {
    display: -webkit-box;
  }
  .ranking li .imgBox{
    position: relative;
    width: 200px;
    height: 200px;
  }
  .ranking li .info {
    position: relative;
    -webkit-box-flex: 1;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  .ranking li .imgBox img {
    width: 100%;
  }
  .ranking li .info div {
    -webkit-box-flex: 1;
    margin: 0 20px 0 30px;
  }
  .ranking li .info div h3 {
    font-size: 32px;
    color: #000;
    font-weight: normal;
    margin-bottom: 10px;
  }
  .ranking li .info div h3, .ranking li .info div p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ranking li .info div p{
    font-size: 28px;
    color: rgba(0,0,0,.5);
  }
  .ranking li .info div p span {
    color: #000;
    margin-left: 16px;
    margin-right: 10px;
  }

</style>
