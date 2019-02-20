<template>
  <div class="sort">
    <ul>
      <router-link
        tag="li"
        v-for="(item,index) in list"
        :key="index"
        :to="item.url"
      ><i class="iconfont" :class="item.icon"></i><p>{{item.name}}</p></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sort',
  data () {
    return {
      list: this.UrlData.sort
    }
  }
}
</script>

<style scoped>
.sort{
  height: 88px;
  margin-bottom: 75px;
}
.sort ul{
  display: flex;
  justify-content: space-around;
}
.sort ul li{
  font-size: 28px;
  text-align: center;
}
.sort ul li i{
  font-size: 40px;
  color: #32c27c;
  line-height: 2;
}
.sort ul li p{
  color: #000;
}
</style>
