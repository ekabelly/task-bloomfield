const axios = require('axios');

const sendMessage = async messageId => {
    const res = await axios.put(process.env.MESSAGES_DESTINATION_URL, { messageId });
    return res && res.status === 200;
} 

module.exports = {
    sendMessage
}