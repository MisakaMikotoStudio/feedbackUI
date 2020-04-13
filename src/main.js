// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill'
import VCharts from 'v-charts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import './mock'
Vue.use(VCharts);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$formatTime = function(v, format){
  if (!v) {
    return "";
  }
  var dateV = new Date(v);
  var year = dateV.getFullYear();
  var month = dateV.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  var date = dateV.getDate();
  date = date < 10 ? ("0" + date) : date;
  var hour = dateV.getHours();
  hour = hour < 10 ? ("0" + hour) : hour;
  var minute = dateV.getMinutes();
  minute = minute < 10 ? ("0" + minute) : minute;
  var second = dateV.getSeconds();
  second = second < 10 ? ("0" + second) : second;
  var str1 = year + "-" + month + "-" + date
  var str2 = hour + ":" + minute + ":" + second;
  var str
  if ("yyyy-MM-dd" == format) {
    str = str1;
  } else {
    str = str1 + " " + str2
  }
  return str;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
