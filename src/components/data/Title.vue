<template>
  <div class="header">
    <i
      class="iconfont icon-fanhui"
      @click="back"
    ></i>
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: ['title'],
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  header{
    margin-bottom: 30px;
  }
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
</style>
