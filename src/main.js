import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementUI from 'element-ui'

//引入ElementUI
import 'element-ui/lib/theme-chalk/index.css'
//导入图标
import './assets/fonts/iconfont.css'
// 引入reset.css
import './assets/css/reset.css'

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
