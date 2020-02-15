const crypto = require('crypto');

const makeUniqueId = () => crypto.randomBytes(16).toString("hex");

const transformUsersObjToArr = (usersObjArr, messageId) => 
    usersObjArr.map(user => [ user.firstName, user.lastName, user.occupation, makeUniqueId(), messageId ]);

module.exports = {
    transformUsersObjToArr,
    makeUniqueId
}