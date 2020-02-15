require('dotenv').config({ path: __dirname + `/.env.${process.env.NODE_ENV}` });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { connectToDb } = require('./db/conn');
const { errHandler } = require('./middlewares/app-middlewares');
const usersLogic = require('./logic/users.logic');
const messagesLogic = require('./logic/messages.logic');

app.use(require('sanitize').middleware);
app.use(bodyParser.json());

app.post('/users', async (req, res, next) => {
    try {
        await usersLogic.handleUsersCreation(req.body.users);
        res.send({ success: true });
    } catch(err){
        next(err);
    }
});

// catch all errors with express middleware
app.use(errHandler);

const startApp = () => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`test server up and running on port ${port}`));
    // this is the logic for handling unsent messages
    messagesLogic.sendUnsentMessages();
}

connectToDb().then(startApp);
