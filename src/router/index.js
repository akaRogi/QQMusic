import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
// import demo from '@/components/HelloWorld'
// 歌榜列表
import ranking from '@/components/ranking/ranking'
//  歌榜内容
import rankList from '@/components/ranking/List'
// 歌单内容
import SongList from '@/components/ranking/SongList'
// 新碟首发列表
import NewPlate from '@/components/newPlate/Plate'
// 新碟首发内容
import NewDie from '@/components/ranking/DieList'
// 新歌首发
import NewSong from '@/components/newSong/newSong'
// 分类
import sort from '@/components/sort/sort'
// 分类列表内容
import sortList from '@/components/sort/list'
// Mv分类'
import MvSort from '@/components/nav/MvList/MvList'
// Mv分类列表
import MvList from '@/components/nav/MvList/list'
// Mv内容
import Mv from '@/components/Mv/Mv'
// 歌手
import songer from '@/components/nav/songer/songer'
// 歌手音乐
import songersong from '@/components/ranking/songerList'
// 用户
import user from '@/components/user/user'
// 登录
import login from '@/components/user/login/login'
// 注册
import registered from '@/components/user/login/registered'
// 本地存储的歌单
import LocalData from '@/components/user/LocalData/LocalData'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'show',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/rankList/:id?',
      name: 'rankList',
      component: rankList
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking
    },
    {
      path: '/SongList/:id?',
      name: 'SongList',
      component: SongList
    },
    {
      path: '/NewPlate/:id?',
      name: 'NewPlate',
      component: NewPlate
    },
    {
      path: '/NewSong/:id?',
      name: 'NewSong',
      component: NewSong
    },
    {
      path: '/NewDie/:id?',
      name: 'NewDie',
      component: NewDie
    },
    {
      path: '/sort/:id?',
      name: 'sort',
      component: sort
    },
    {
      path: '/sortList/:id?',
      name: 'sortList',
      component: sortList
    },
    {
      path: '/MvSort/:id?',
      name: 'MvSort',
      component: MvSort
    },
    {
      path: '/songer',
      name: 'songer',
      component: songer
    },
    {
      path: '/MvList/:id?',
      name: 'MvList',
      component: MvList
    },
    {
      path: '/Mv/:id?',
      name: 'Mv',
      component: Mv
    },
    {
      path: '/songersong/:id?',
      name: 'songersong',
      component: songersong
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/registered',
      name: 'registered',
      component: registered
    },
    {
      path: '/LocalData/:id?',
      name: 'LocalData',
      component: LocalData
    }
    // {
    //   path: '/demo',
    //   name: 'demo',
    //   component: demo
    // }
  ]
})
