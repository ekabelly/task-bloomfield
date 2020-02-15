const messagesService = require('../services/messages.service');
const { updateMessage } = require('../db/messages.wrap');

const handleMessageLogic = async messageId => {
    const res = await messagesService.sendMessage(messageId);
    if(res){
        updateMessage(messageId);
    }
}

module.exports = {
    handleMessageLogic
}