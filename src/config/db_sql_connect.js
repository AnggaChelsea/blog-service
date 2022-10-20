const mysql = require('mysql');
const dbConfig = require('./sql_connect')

const connection = mysql.createConnection({
    host: dbConfig.host || 'localhost',
    user: dbConfig.user || 'root',
    database: dbConfig.database
})

connection.connect(error => {
    if(error) throw error;
    console.log('success connection')
})

module.exports = connection