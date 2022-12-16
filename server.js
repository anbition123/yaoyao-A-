const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const users = require("./serverRouter/api/users")
const { db } = require('./lib/index')
const joi = require('joi')
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
// 导入配置文件
const config = require('./config/jwtSecretKey')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 响应数据的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
      res.send({
        // 状态
        status,
        // 状态描述，判断 err 是 错误对象 还是 字符串
        message: err instanceof Error ? err.message : err,
      })
    }
    next()
  })

db.query('select 1',(err,results)=>{
    if(err) return console.log(err.message)
    console.log(results)
})


app.get('/',(req,res)=>{
    res.send('hello,word')
})

app.use("/api/users",users)
const port = process.env.PROT || 7000

app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 未知错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err)
  })

app.listen(port,()=>{
    console.log("express running on 7000")
})