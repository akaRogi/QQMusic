<template>
  <div class="Main">
    <ul>
      <router-link
        tag="li"
        v-for="(item, index) in list"
        :key="index"
        :to="'/songersong/' + item.singer_mid"
      >{{item.singer_name}}</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: ['list']
}
</script>

<style scoped>
  .Main{
    margin: 0 10px;
  }
  .Main li{
  padding: 20px 0;
  border-bottom: 1px solid rgba(0,0,0,.2);
}
</style>
