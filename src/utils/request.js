// /**
// * 封装axios 请求模块
// */
// // 加载axios
// import axios from 'axios'
// //加载store 容器
// // import store from '@/store'

// //axios创建的请求对象
// const request = axios.create({
//     //配置接口的基准路径
//     baseURL:'http://192.168.13.50:8000'
// })

// //请求拦截器
// request.interceptors.request.use(function (config) {
//     // 请求发起会经过这里
//   //   //config: 本次请求的请求配置对象
//   //   const { user } = store.state
//   //   if (user && user.token) {
//   //       config.headers.Authorization = `Bearer ${user.token}`
//   //   }
//   //   // 注意： 这里务必要返回 config 配置对象，否则请求就会停在这里出不去了
//   //   return config;
//   // }, function (error) {
//   //   // 对请求错误做些什么
//   //   return Promise.reject(error);
//   });

// //响应拦截器

// // 导出
// export default request
