const mysql = require('mysql');

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const connectToDb = () => {
  return new Promise((resolve, reject) => {
    conn.connect(async err => {
      if(err){
        console.error(err);
        return reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = { connectToDb, conn };