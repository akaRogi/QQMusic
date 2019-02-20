<template>
  <ul>
    <li
      v-for="(item, index) in data.index"
      v-if="index > 0"
      :class="{show : index === isShow}"
      @click="tagshow(item.id, index)"
      :key="index"
    >{{item.name}}</li>
  </ul>
</template>

<script>
export default {
  name: 'tag',
  props: ['data'],
  data () {
    return {
      isShow: 1
    }
  },
  methods: {
    tagshow (id, index) {
      this.isShow = index
      this.$emit('tag', id)
    }
  }
}
</script>

<style scoped>
ul{
  background: #fff;
}
li{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
li.show{
  color: #31c27c;
}
</style>
