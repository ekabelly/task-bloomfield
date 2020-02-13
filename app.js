const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const conn = require('./db/conn');

app.use(bodyParser.json());


let Test = 0;

app.get('/test', (req, res, next) => {
    Test++;
    res.status(200).send({Test});
});

conn.connect(err => {
    if(err){
        console.error(err);
    } else {
        app.listen(3001, () => console.log(`test server up and running on port 3001`));
    }
})
