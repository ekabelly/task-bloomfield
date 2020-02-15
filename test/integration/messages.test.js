const expect = require('chai').expect;
require('dotenv').config({ path: __dirname + `/../../.env.test` });
const { conn, connectToDb } = require('../../db/conn');
const { createMessagesTable } = require('../../db/create-tables');
const { insertMessage } = require('../../db/messages.wrap');
const { sendUnsentMessages } = require('../../logic/messages.logic');

before(async () => {
    await connectToDb();
})

describe('Messages Integration Tests', () => {
    beforeEach(() => {
        conn.query('DROP TABLE messages', () => {});
        createMessagesTable(conn);
    });

    it('should update 3 messages to was_sent = true', async () => {
        await Promise.all([
            insertMessage(['1234', new Date(), false]),
            insertMessage(['2222', new Date(), false]),
            insertMessage(['3333', new Date(), false])
        ]);
        await sendUnsentMessages();
        conn.query('SELECT * from messages where uniqueId in (1234, 2222, 3333)', (err, res) => {
            expect(res).to.have.length(3);
            expect(res.every( message => message.was_sent)).to.be.true;
        });
    });
})