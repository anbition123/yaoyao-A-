/*
*created by chengting on 2121-8-19
 * 说明requset请求
 */ 

// 1,引入axios
 import axios from 'axios'
// import { reject, resolve } from 'core-js/fn/promise';
//  引入element的message
import {Message}from 'element-ui'
// 引入qs

// 创建axios实例，设置配置得默认值
const instance = axios.create({
	baseURL: 'http://127.0.0.1:7000',   // 这里写接口的http地址，
	timeout: 5000,  // 设置请求超时的默认值 
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// //  配置地址
//  axios.defaults.baseURL = 'http://127.0.0.1:7000';

// //  配置请求超时时间 
// axios.defaults.timeout = 5000;

    // 配置请求头

    instance.interceptors.request.use((config)=>{

        let token = localStorage.getItem('t_k') ||'';//拿到本地token
        if(token){
            config.header.Authorization = token
        }
        return config
    })
// 配置请求拦截
instance.interceptors.response.use(res =>{
    console.log(res)
    // 如果有code和message
    if(res&&res.data.status !==undefined && res.data.message !==undefined){
        let{
            message,
            status
        }= res.data
        if(status ===0){
            //成功的样式的提示框
            Message({
                type:'success',
                message:message
            })
        }else if(status ===1){
            Message.error(message)
        }
        
    }
    return res
})

// 设置响应拦截
instance.interceptors.response.use(
	res => {
		const data1 = res.data
        console.log(data1,'data1111')
		return data1
	},
	err => {
		// return Promise.reject(error)
        let message = "";
        switch (err.response.status) {
          case 400:
            message = "请求错误(400)";
            break;
          case 401:
            message = "未授权，请重新登录(401)";
            // 这里可以做清空storage并跳转到登录页的操作
            break;
          case 403:
            message = "拒绝访问(403)";
            break;
          case 404:
            message = "请求出错(404)";
            break;
          case 408:
            message = "请求超时(408)";
            break;
          case 500:
            message = "服务器错误(500)";
            break;
          case 501:
            message = "服务未实现(501)";
            break;
          case 502:
            message = "网络错误(502)";
            break;
          case 503:
            message = "服务不可用(503)";
            break;
          case 504:
            message = "网络超时(504)";
            break;
          case 505:
            message = "HTTP版本不受支持(505)";
            break;
          default:
            message = `连接出错(${err.response.status})!`;
        }
        Message.error(message)
	}	
)

// 配置通用的get和post请求方法
// export default{
//     get (url,params={}){
//         return new Promise((resolve,reject)=>{
//             axios.get(url,{
//                 params
//             }).then((res)=>{
//                 resolve(res.data)
//             }).catch((err)=>{
//                 reject(err)
//             })
//         })
//     },
//     post (url,parmas={}){
//         return new Promise((resolve,reject)=>{
//             axios.post(url,qs.stringify(parmas)).then((res)=>{
//                 console.log(res,'res')
//                 if(res){         
//                 resolve(res.data)
//                 }
//             }).catch((err)=>{
//                 reject(err)
//             })
//         })
//     }
// }

// module exports =  axios
// module.exports = req = axios

export default instance