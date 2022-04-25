import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import * as utilsDate from "@/utils/date"
Vue.config.productionTip = false
// 引入公共css
import "@/assets/style/reset.css"
import "@/assets/style/index.css"
// 引入字体文件
import "@/assets/fonts/iconfont.css"
// 引入UI框架
Vue.use(ElementUI);
// 注册过滤器(高级写法)
Object.keys(utilsDate).forEach(item=>{
  Vue.filter(item,utilsDate[item])
})
// Vue.filter("setYMDforfat",setYMDforfat)
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
