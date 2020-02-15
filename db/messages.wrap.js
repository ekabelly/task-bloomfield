const { conn } = require('../db/conn');

const insertMessage = message => new Promise((resolve, reject) => {
    conn.query('INSERT INTO messages (uniqueId, date, was_sent) VALUES (?)', [message], (err, res)=> {
        if(err){
            throw err;
        }
        resolve(res);
    });
})

const updateMessage = messageId => new Promise((resolve, reject) => {
    conn.query('UPDATE messages SET was_sent = true where uniqueId = (?)', messageId, (err, res)=> {
        if(err){
            throw err;
        }
        resolve(res);
    });
})


module.exports = { insertMessage, updateMessage }