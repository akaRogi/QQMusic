<template>
  <div class="Features">
    <div><i class="iconfont icon-xihuan"></i></div>
    <div><i class="iconfont icon-zuijinyuedu"></i></div>
  </div>
</template>

<script>
export default {
  name: 'Features'
}
</script>

<style scoped>
.Features{
  width: 90%;
  overflow: hidden;
  box-shadow: 0 0 25px 7px rgba(0,0,0,.2);
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  margin: 0 auto;
  padding: 20px 0;
}
.Features div{
  position: relative;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
}
.Features div:first-child:before{
  content: "";
  display: block;
  position: absolute;
  right: 0;
  width: 2px;
  height: 50px;
  background: #32c27c;
}
.Features div:last-child{
  width: calc(50% - 2px);
}
.Features div i{
  font-size: 50px;
  color: #32c27c;
}
</style>
