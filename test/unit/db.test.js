const expect = require('chai').expect;
require('dotenv').config({ path: __dirname + `/../../.env.test` });
const { conn, connectToDb } = require('../../db/conn');
const { createMessagesTable, createUsersTable } = require('../../db/create-tables');
const { insertUsers } = require('../../db/users.wrap');
const { insertMessage, getUnsentMessages, updateMessages } = require('../../db/messages.wrap');

before(async () => {
    await connectToDb();
})

describe('Users Unit Tests', () => {
    beforeEach(() => {
        conn.query('DROP TABLE users', () => {});
        createUsersTable(conn);
    });

    it('should insert a user', async () => {
        await insertUsers([['Ido', 'Kabelly', 'developer', '1234', '2222']]);
        conn.query('SELECT * from users where uniqueId = 1234', (err, res) => {
            expect(res[0]).to.eql({firstName: 'Ido', uniqueId: '1234', lastName: 'Kabelly', occupation: 'developer', id: 1, messageId: '2222'});
        });
    });

    it('should throw an error for duplicate users', async () => {
        await insertUsers([['Ido', 'Kabelly', 'developer', '1234', '2222'], ['Shahar', 'Lev', 'coffe masker', '1234', '2222']], err => {
            expect(err.code).to.be('ER_DUP_ENTRY');
        });
    });
});

describe('Messages Unit Tests', () => {
    beforeEach(() => {
        conn.query('DROP TABLE messages', () => {});
        createMessagesTable(conn);
    });

    it('should insert a message', async () => {
        const date = new Date();
        await insertMessage(['1234', date, false]);
        conn.query('SELECT * from messages where uniqueId = 1234', (err, res) => {
            expect(res[0]).to.include({ uniqueId: '1234', was_sent: 0 });
        });
    });
    
    it('should update messages was_sent = true', async () => {
        await insertMessage(['1234', new Date(), false]);
        await updateMessages(['1234', '2222']);
        conn.query('SELECT * from messages where uniqueId in (1234, 2222)', (err, res) => 
            expect(res.every( message => message.was_sent)).to.be.true);
    });

    it('should return 3 unsent messages', async () => {
        await Promise.all([
            insertMessage(['1234', new Date(), false]),
            insertMessage(['2222', new Date(), false]),
            insertMessage(['3333', new Date(), false])
        ]);
        const unsentMessages = await getUnsentMessages();
            expect(unsentMessages).to.have.length(3);
    });
})