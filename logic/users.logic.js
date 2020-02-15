const { insertUsers } = require('../db/users.wrap');
const { insertMessage } = require('../db/messages.wrap');
const util = require('../util/app-util');
const messagesLogic = require('./messages.logic');

const handleUsersCreation = async users => {
    if(users && users.length > 0){
        const messageId = util.makeUniqueId();
        await insertUsers(
            // transform users arr (of objects) to users arr of arrays and add messageId to each user.
            util.transformUsersObjToArr(users, messageId)
        );
        // create a message with was_sent is false
        await insertMessage([messageId, new Date(), false]);
        // will send message and update in db
        messagesLogic.handleMessageLogic(messageId);
        return true;
    }
    // throw an error if no users were given.
    throw new Error('no users were given.');
}

module.exports = {
    handleUsersCreation
}