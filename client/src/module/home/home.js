import Vue from 'vue'
import './../client.config'
import VueRouter from 'vue-router'
import ElmentUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'font-awesome/scss/font-awesome.scss'
import Home from './home.vue'

import ProPage from './components/pro_page'
import TopicPage from './components/topic_page'
import Folder from './components/folder'
import AssetImg from './components/asset_img'
import AssetTmp from './components/asset_tmp'
import Create from './components/create.vue'
import HappyScroll from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'

Vue.use(VueRouter)
Vue.use(ElmentUI)
Vue.use(HappyScroll)

Vue.config.productionTip = false
Vue.prototype.$http = axios;
const routes = [
	{ path: '/', redirect: '/info/pro' },
  	{ path: '/info/pro', component: ProPage },
  	{ path: '/topic/topic', component: TopicPage },
	{ path: '/folder/:pagetype/:id', component: Folder },
	{ path: '/create', component: Create },
	{ path: '/assetimg', component: AssetImg },
	{ path: '/assettmp', component: AssetTmp }
]
const router = new VueRouter({
  	routes // （缩写）相当于 routes: routes
})
new Vue({
  el: '#home',
  router,
  template: '<Home />',
  components: { Home }
})