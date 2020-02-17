require("dotenv").config()
const mysql = require("mysql2");
const con = mysql.createConnection({
    host: process.env.mysqlhost,
    user: process.env.mysqluser,
    database: process.env.mysqldb,
    password: process.env.mysqlpw
});
module.exports = con;