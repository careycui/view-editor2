import Vue from 'vue'
import './../../global'
import VueRouter from 'vue-router'
import ElmentUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Home from './home.vue'
import Info from './components/info'
import Topic from './components/topic'
import Folder from './components/folder'
import AssetImg from './components/asset_img'
import AssetTmp from './components/asset_tmp'
import Create from './components/create.vue'


Vue.use(VueRouter)
Vue.use(ElmentUI)

Vue.config.productionTip = false
Vue.prototype.$http = axios;
const routes = [
	{ path: '/', redirect: '/info/pc' },
  	{ path: '/info/:type', component: Info },
  	{ path: '/topic/:type', component: Topic },
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