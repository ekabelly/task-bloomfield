const handleTableCreateionErr = (err, tableName) => {
    if(err.code === 'ER_TABLE_EXISTS_ERROR'){
        console.log(`table ${tableName} already exists.`);
    } else {
        console.error(err);
    }
}

const createUsersTable = conn => {
    const sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255)NOT NULL, uniqueId VARCHAR(255) unique, occupation VARCHAR(255) NOT NULL, messageId VARCHAR(255) NOT NULL)";
    conn.query(sql, err => 
        err ? handleTableCreateionErr(err, 'users') : process.env.NODE_ENV !== 'test' ? console.log('table users created successfully') : null);
}

const createMessagesTable = conn => {
    const sql = "CREATE TABLE messages (uniqueId VARCHAR(255) unique, date DATE NOT NULL, was_sent BOOLEAN)";
    conn.query(sql, err => 
        err ? handleTableCreateionErr(err, 'messages') : process.env.NODE_ENV !== 'test' ? console.log('table messages created successfully') : null);
}

const createTables = conn => {
    createUsersTable(conn);
    createMessagesTable(conn);
}

module.exports = {
    createUsersTable,
    createMessagesTable,
    createTables
}