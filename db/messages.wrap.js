const { conn } = require('../db/conn');

const insertMessage = message => new Promise(resolve => {
    conn.query('INSERT INTO messages (uniqueId, date, was_sent) VALUES (?)', [message], (err, res)=> {
        if(err){
            throw err;
        }
        resolve(res);
    });
})

const updateMessages = messageIdArr => new Promise(resolve => {
    conn.query('UPDATE messages SET was_sent = true where uniqueId IN(?)', [messageIdArr], (err, res)=> {
        if(err){
            throw err;
        }
        resolve(res);
    });
})

const getUnsentMessages = () => new Promise(resolve => {
    conn.query('SELECT uniqueId from messages where was_sent = 0', (err, res) => {
        if(err){
            throw err;
        }
        resolve(res);
    });
});


module.exports = { insertMessage, getUnsentMessages, updateMessages }