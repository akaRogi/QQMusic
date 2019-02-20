<template>
  <div class="Introduction">
    <h2>专辑简介</h2>
    <p>
      {{desc}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
  props: ['desc']
}
</script>

<style scoped>
.Introduction{
  text-align: center;
  padding: 0 10px 60px 10px;
  box-sizing: border-box;
}
  .Introduction h2{
    font-size: 34px;
    letter-spacing: 5px;
    font-weight: 400;
    margin-bottom: 20px;
    color: #000;
  }
  .Introduction p{
    font-size: 30px;
    color: #777;
  }
</style>
