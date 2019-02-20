<template>
  <div class="Main">
    <h3>推荐的音乐</h3>
    <ul class="MainUl">
      <ListLi
        v-for="(item, index) in data"
        :key="index"
        :data="item"
      ></ListLi>
    </ul>
  </div>
</template>

<script>
import ListLi from './listLi'
export default {
  name: 'Main',
  props: ['data'],
  components: {
    ListLi
  }
}
</script>

<style scoped>
.Main{
  margin: 0 10px;
}
.Main h3{
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 32px;
}
.MainUl{
  overflow: hidden;
}

</style>
