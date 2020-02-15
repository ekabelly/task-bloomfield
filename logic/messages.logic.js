const messagesService = require('../services/messages.service');
const { updateMessages, getUnsentMessages,  } = require('../db/messages.wrap');

const sendUnsentMessages = async () => {
    const messages = await getUnsentMessages();
    const messagesIdArr = messages.map(message => message.uniqueId);
    await messagesService.sendMessages(messagesIdArr);
    await updateMessages(messagesIdArr);
}

const handleMessageLogic = async messageId => {
    // send messageId and then updates in db message was sent
    const res = await messagesService.sendMessages([messageId]);
    if(res){
        updateMessages([messageId]);
    }
}

module.exports = {
    handleMessageLogic,
    sendUnsentMessages
}