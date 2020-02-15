const { conn } = require('../db/conn');

const insertUsers = users => new Promise(resolve => {
    conn.query('INSERT INTO users (firstName, lastName, occupation, uniqueId, messageId) VALUES (?)', users, (err, res)=> {
        if(err){
            throw err;
        }
        resolve(res);
    });
})

module.exports = { insertUsers }