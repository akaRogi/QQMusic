// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import url_ from './components/data/url'
import 'swiper/dist/css/swiper.css'
import './assets/css/app.css'
import loading from './assets/plugins/components'
import axios from 'axios'
import Qs from 'qs'
import Mui from 'vue-awesome-mui'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(Mui)
Vue.use(loading)
Vue.prototype.axios = axios
Vue.prototype.qs = Qs
Vue.prototype.UrlData = url_

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
