<template>
  <div class="login">
    <TopTitle :title="'登录'"></TopTitle>
    <div class="main">
      <form @submit.prevent="showData">
        <div class="Account">
          <span>账号：</span>
          <input type="text"/>
        </div>
        <div class="Password">
          <span>密码：</span>
          <input type="text"/>
        </div>
        <div class="loginBtn">
          <input type="submit" value="登录" class="btn"/>
        </div>
        <div class="registeredBtn">
          <router-link
            tag="div"
            class="btn bs"
            to="/registered"
          >注册</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    showData () {
      // this.UrlData.userlogin()
    }
  }
}
</script>

<style scoped>
.main{
  padding-top: 50px;
  text-align: center;
}
.Account,.Password{
  display: inline-block;
  margin-bottom: 50px;
}
.loginBtn,.registeredBtn{
  width: 100%;
  display: inline-block;
  margin-bottom: 30px;
}
.Account span,.Password span{
  font-size: 26px;
}
.Account input,.Password input{
  width: 500px;
  height: 50px;
  padding: 0 20px;
  border: 2px solid #31c27c;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
}
.btn{
  display: inline-block;
  width: 200px;
  height: 50px;
  background: #31c27c;
  line-height: 2;
  color: #fff;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  border: 1px solid;
  cursor: pointer;
}
.bs{
  background: #fff;
  color: #000;
  line-height: 2.4;
}
</style>
