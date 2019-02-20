<template>
  <div class="user">
    <Nav></Nav>
    <Userlogin></Userlogin>
    <Features></Features>
    <Set></Set>
    <Songlist @PushShow="PushShow"></Songlist>
    <PushSongList @PushShow="PushShow" v-if="PushOff"></PushSongList>
  </div>
</template>

<script>
import Nav from '../nav/nav'// 导航
import Userlogin from './Userlogin/Userlogin'// 用户头像
import Features from './Features/Features'// 用户头像
import Set from './list/set'// 用户头像
import Songlist from './list/songlist'// 用户头像
import PushSongList from './PushSongList/PushSongList'// 用户头像
export default {
  name: 'user',
  components: {
    Nav,
    Userlogin,
    Features,
    Set,
    Songlist,
    PushSongList
  },
  data () {
    return {
      PushOff: false
    }
  },
  methods: {
    PushShow (off) {
      this.PushOff = off
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
