const mysql = require("mysql");

const config = require('./config');

const connectDB  =async () => {
    const pool =  mysql.createConnection(config);
    pool.connect(function (err) {
        if (err) throw err;
        console.log("connected")
    })
console.log("DB successfully connected")
console.log(pool)
}
module.exports = connectDB;