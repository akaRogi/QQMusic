<template>
  <div class="Title">
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: ['title']
}
</script>

<style scoped>
.Title{
  text-align: center;
  margin-bottom: 40px;
}
.Title h2{
  font-size: 34px;
  font-weight: 400;
}
</style>
