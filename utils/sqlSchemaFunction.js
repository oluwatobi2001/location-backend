const mysql = require("mysql");
const config = require("../Config/config.js");

const db =  mysql.createConnection(config);

const createNewColumn = (schema) => {
    return new Promise((resolve, reject) => {
        db.query(schema, (err, res) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(res)
            }
        })
    })
}

const checkRecordsExists = (tableName, column, value)=> {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`
        db.query(query, [value] , (err, res)  => {
            if(err) {
                reject(err)
            }
            else{
                resolve(res.length ? res[0] : null)
            }
        })

    })
}

const insertRecord = (tableName, record) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${tableName} SET ?`
        db.query(query, [record], (err, res) => {
            if(err) {
                reject(err) 
            } else {
                resolve(res)
            }
        })
    })
}

const updateRecord = (tableName, column, variable, userID) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${tableName} SET ${column} INTO ${tableName} = ${variable} WHERE userID = ${userID} `
        db.query(query, [record], (err, res) => {
            if(err) {
                reject(err) 
            } else {
                resolve(res)
            }
        })
    })
}
const FetchLocRecord = (tableName1, tableName2, column1, column2, column3, userID) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT ${column1}, ${column2}, ${column3} FROM ${tableName1} WHERE ${tableName1}.userID = ${userID} `
        db.query(query,  (err, res) => {
            if(err) {
                reject(err) 
            } else {
                resolve(res)
            }
        })
    })
}

const FetchNotifRecord = (tableName1,  column1,  userID) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT ${column1} FROM ${tableName1} WHERE ${tableName1}.user_id = ${userID} `
        db.query(query,  (err, res) => {
            if(err) {
                reject(err) 
            } else {
                resolve(res)
            }
        })
    })
}
module.exports = {
    createNewColumn, checkRecordsExists,  
    insertRecord , updateRecord, FetchLocRecord,  FetchNotifRecord
  };
  