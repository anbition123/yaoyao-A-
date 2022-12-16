const express = require("express");
const User = require("../../models/Users");
const router = express.Router();
const bcrypt = require("bcrypt")
const {db} = require('../../lib/index')
const jwt = require('jsonwebtoken')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../../schema/user')
const config = require('../../config/jwtSecretKey')
// const user = require("../../models/Users");

// const port = process.env.PROT || 7000



router.get("/test", (req, res) => {
  // res.send('hello,word')
  res.json({ msg: "login works" });
});

// 注册
router.post("/register",expressJoi(reg_login_schema), (req, res) => {
  // console.log(req.body) 
  
  const userinfo = req.body
  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 1, message: '用户名或密码不能为空！' })
  }
  
//   res.send(userinfo)
  db.query(`select * from yao_user where username= ? `, [userinfo.username], function (err, results) {
    // 执行 SQL 语句失败
    if (err) {
      return res.send({ status: 1, message: err.message })
    }
    // 用户名被占用
    if (results.length > 0) {
      return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
    }
    // TODO: 用户名可用，继续后续流程...
  })

  userinfo.password = bcrypt.hashSync(userinfo.password, 10)
// 插入新用户

  db.query('insert into yao_user set ?', { username: userinfo.username, password: userinfo.password }, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.send({ status: 1, message: err.message })
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
      return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
    }
    // 注册成功
    res.send({ status: 0, message: '注册成功！' })
  })

//   res.send(userinfo.password)
});


// 登录

router.post("/login",expressJoi(reg_login_schema), (req, res) => {
    const userinfo = req.body

    const sql = `select * from yao_user where username=?`

    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！')
        // TODO：判断用户输入的登录密码是否和数据库中的密码一致
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
        return res.cc('登录失败！')
        }
        console.log(results,'results')
        // TODO：登录成功，生成 Token 字符串
         // 在生成 Token 字符串的时候，一定要剔除 密码 和 头像 的值
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = { ...results[0], password: '', user_pic: '' }
        // 将用户信息对象加密成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token 有效期为 10 个小时
          })

        //   将生成的 Token 字符串响应给客户端：
          res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
          })
      })
})

module.exports = router;
