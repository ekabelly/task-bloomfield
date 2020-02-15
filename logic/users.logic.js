const { insertUsers } = require('../db/users.wrap');
const { insertMessage } = require('../db/messages.wrap');
const util = require('../util/app-util');
const messagesLogic = require('./messages.logic');

const handleUsersCreation = async users => {
    const messageId = util.makeUniqueId();
    await insertUsers(
        util.transformUsersObjToArr(users, messageId)
    );
    await insertMessage([messageId, new Date(), false]);
    messagesLogic.handleMessageLogic(messageId);
    return true;
}

module.exports = {
    handleUsersCreation
}