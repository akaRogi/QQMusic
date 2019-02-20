<template>
  <div class="loading">
  </div>
</template>

<script>
export default {
  name: 'load'
}
</script>

<style scoped>
.loading{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  background-image: url("../../assets/imgs/load.gif");
  background-position: center;
  background-repeat: no-repeat;
  z-index: 999999999999;
}
</style>
