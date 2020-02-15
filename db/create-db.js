const mysql = require('mysql');
const { createTables } = require('./create-tables');
require('dotenv').config({ path: __dirname + `/../.env.${process.env.NODE_ENV}` })

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

const mysqlConn = mysql.createConnection(dbconfig);

const createDb = (resolve, reject) =>
    mysqlConn.query(`CREATE DATABASE ${process.env.DB_NAME}`, err => {
        if(err && err.code !== 'ER_DB_CREATE_EXISTS'){
            console.error(err)
            reject();
        }
        resolve(true);
    });

const initDb = async () => {
    const res = await  new Promise(createDb);
    if(res){
        const conn = mysql.createConnection({
            ...dbconfig,
            database: process.env.DB_NAME 
        });
        createTables(conn);
    }
}

initDb();
