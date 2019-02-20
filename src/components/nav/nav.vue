<template>
  <header>
    <nav>
      <ul>
        <router-link
          tag="li"
          v-for="(item, index) in navData"
          :key="index"
          :to="item.url"
          exact
        >{{item.name}}</router-link>
      </ul>
    </nav>
    <div class="search" @click="searchShow()">
      <Search @searchHid="searchHid" v-if="searchOff"></Search>
    </div>
  </header>
</template>

<script>
import Search from '../home/search/search'
export default {
  name: 'Nav',
  components: {
    Search
  },
  data () {
    return {
      searchOff: false,
      navData: this.UrlData.NavData
    }
  },
  methods: {
    searchShow () {
      this.searchOff = true
    },
    searchHid () {
      this.searchOff = false
      console.log(this.searchOff)
    }
  }
}
</script>

<style scoped>
header{
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
  background: #32c27c;
}
nav{
  height: 100px;
  padding: 0 40px;
  box-sizing: border-box;
}
nav ul{
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
}
nav ul li{
  color: #fff;
  font-size: 28px;
}
nav ul li.show {
  font-size: 36px;
}
.search{
  height: 64px;
  background: #2caa6d;
}
</style>
