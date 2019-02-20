<template>
  <div class="Userlogin">
    <router-link
      tag="div"
      class="userAvatar"
      v-if="!userOff"
      to="/login"
    >
      登录
    </router-link>
    <div class="userAvatar" v-if="userOff">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549027361316&di=5ecc9144fdb9f35f074660f11b187717&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F18%2F20181018161442_ahsds.jpeg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Userlogin',
  data () {
    return {
      userOff: false
    }
  },
  created () {
    let user = this.UrlData.userlogin()
    // let user = null
    if (user) {
      this.userOff = true
    } else {
      this.userOff = false
    }
    // console.log(user)
  }
}
</script>

<style scoped>
.Userlogin{
  position: relative;
  height: 200px;
  background-image: url("../../../assets/imgs/userBg.jpg");
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 20px;
  margin-bottom: 50px;
}
.userAvatar{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  background: #31c27c;
  margin: auto;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  overflow: hidden;
}
.userAvatar img{
  width: 100%;
}
</style>
