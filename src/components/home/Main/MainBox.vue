<template>
  <div class="mainBox">
    <Title :title="data.title"></Title>
    <MainUl :data="data.list" :type="data.type"></MainUl>
  </div>
</template>

<script>
import Title from './MainComponent/Title'
import MainUl from './MainComponent/Main'
export default {
  name: 'MainBox',
  props: ['data'],
  components: {
    Title,
    MainUl
  }
}
</script>

<style scoped>

</style>
