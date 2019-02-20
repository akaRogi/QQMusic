<template>
  <div class="registered">
    <TopTitle :title="'注册'"></TopTitle>
    <div class="main">
      <form @submit.prevent="showData">
        <div class="Account">
          <span>账号：</span>
          <input type="text" v-model="user.account"/>
        </div>
        <div class="Password">
          <span>密码：</span>
          <input type="text" v-model="user.password"/>
        </div>
        <div class="Password">
          <span>确认密码：</span>
          <input type="text" v-model="user.okpassword"/>
        </div>
        <div class="loginBtn">
          <input type="submit" value="注册" class="btn"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'registered',
  data () {
    return {
      user: {
        account: '', // 账号
        password: '', // 密码
        okpassword: '', // 确认密码
        off: true, // 登录状态
        mvlist: [], // 收藏的Mv
        collectsong: [], // 收藏的歌单
        songlist: [] // 自己新建的歌单
      }
    }
  },
  methods: {
    showData () {
      let userlist = JSON.parse(localStorage.getItem('QQMusicUser'))
      let user = this.user
      if (user.account !== '' && user.password !== '' && user.okpassword !== '') {
        if (user.password === user.okpassword) {
          // 如果用户第一次注册则添加一个账号数组
          if (!userlist) {
            userlist = []
          } else {
            // 如果用户的电脑存在往期的账号则吧往期账号退出
            for (var i = 0; i < userlist.length; i++) {
              userlist[i].off = false
              localStorage.setItem('QQMusicUser', JSON.stringify(userlist))
            }
          }
          userlist.push(user)
          localStorage.setItem('QQMusicUser', JSON.stringify(userlist))
        } else {
          alert('密码不一致')
        }
      } else {
        alert('账号或密码不能为空')
      }
      console.log(this.user)
    }
  },
  created () {
    // localStorage.clear('QQMusicUser')
    // let userlist = JSON.parse(localStorage.getItem('QQMusicUser'))
    // let userlist = null
    // if (userlist) {
    //   alert(22222)
    // }
    // console.log(userlist)
  }
}
</script>

<style scoped>
  .main{
    padding-top: 50px;
    text-align: center;
  }
  .Account,.Password{
    width: 100%;
    display: inline-block;
    margin-bottom: 50px;
    text-align: left;
  }
  .loginBtn,.registeredBtn{
    width: 100%;
    display: inline-block;
    margin-bottom: 30px;
  }
  .Account span,.Password span{
    display: inline-block;
    width: 20%;
    font-size: 26px;
    text-align: right;
  }
  .Account input,.Password input{
    display: inline-block;
    width: calc(70% - 10px);
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
