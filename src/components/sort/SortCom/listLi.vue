<template>
  <li
    class="listLi"
    @click="SongListFn(data)"
  >
    <div class="ImgBox">
      <img :src="data.imgurl" alt="">
    </div>
    <div class="TextBox">
      <p>{{data.dissname}}</p>
      <p>{{data.creator.name}}</p>
      <p>{{listen_num(data.listennum)}}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'listLi',
  props: ['data'],
  methods: {
    listen_num (val) {
      let num = val
      if (num >= 10000) {
        num = (num / 10000).toFixed(1) + '万'
      }
      return num
    },
    SongListFn (data) {
      let id = data.dissid
      this.$router.push('/SongList/' + id)
      // console.log(data)
    }
  }
}
</script>

<style scoped>
  .ImgBox{
    margin-bottom: 20px;
  }
  .listLi{
    width: calc(50% - 5px);
    float: left;
    margin-bottom: 20px;
  }
  .listLi:nth-child(odd){
    margin-right: 10px;
  }
  .listLi img{
    width: 100%;
  }
  .listLi p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 2;
  }
</style>
