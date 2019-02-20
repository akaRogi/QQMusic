<template>
  <div class="MvNav">
    <ul>
      <li
        v-for="(item, index) in data.area"
        :key="index"
        @click="listPlay(item)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: ['data'],
  methods: {
    listPlay (data) {
      console.log(data)
      this.$router.push({
        name: 'MvList',
        query: {
          id: data.id,
          name: data.name
        }
      })
    }
  }
}
</script>

<style scoped>
  .MvNav{
    overflow: hidden;
    margin: 20px 10px 52px 10px;
  }
  .MvNav li{
    width: 32%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f4f4f4;
    float: left;
    text-align: center;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    margin-right: 2%;
    margin-bottom: 16px;
  }
  .MvNav li:nth-child(3n){
    margin: 0;
  }
</style>
