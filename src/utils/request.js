import axios from 'axios'
import store from '@/store'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:8001/', // api的base_url
  timeout: 10000 // request timeout
})
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
  for(let p in pending){
    if(pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.cancelToken = new cancelToken((c)=>{
    pending.push({ u: config.url + '&' + config.method, f: c });// 这里的ajax标识是用请求地址&请求方式拼接的字符串
  });
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    return response;
  },
  error => {
    //console.log('err' + error) // for debug
    return Promise.reject(error)
  })

export default service
