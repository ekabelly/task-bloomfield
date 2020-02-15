const axios = require('axios');

const sendMessages = async messageIdArr => {
    const res = await axios.put(process.env.MESSAGES_DESTINATION_URL, { messages: messageIdArr });
    return res && res.status === 200;
} 

module.exports = {
    sendMessages
}