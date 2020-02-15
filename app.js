require('dotenv').config({ path: __dirname + `/.env.${process.env.NODE_ENV}` });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { connectToDb } = require('./db/conn');
const usersLogic = require('./logic/users.logic');
const messagesLogic = require('./logic/messages.logic');

app.use(require('sanitize').middleware);
app.use(bodyParser.json());

app.post('/users', async (req, res, next) => {
    await usersLogic.handleUsersCreation(req.body.users);
    res.send({ success: true });
});

// catch all errors with express middleware
app.use((err, req, res) => {
    console.error(err);
    res.status(500).send({ success: false, message: err })
});

const startApp = () => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`test server up and running on port ${port}`));
    messagesLogic.sendUnsentMessages();
}

connectToDb().then(startApp);
