/**
 * 账号功能模块相关的所有请求都放到这里
 * 
 */


import  req  from '../utils/request.js'
// import { post } from '../../serverRouter/api/users.js'
// import { instance } from '../utils/request.js'
/*------------登录请求---------------*/
export function  checkLogin(data){
    const results = req.post('/api/users/login',data)
    // console.log(Promise.resolve(results),results,'resultsresults')
    return results
}

