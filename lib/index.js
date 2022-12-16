// 导入mysql模块
const mysql = require('mysql')

const mysqlPool = require("../config/mysqlPool")

// 建立与MySQL数据库的连接

const db = mysql.createPool(mysqlPool)



module.exports = {
    db
}