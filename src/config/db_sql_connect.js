
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const dbpool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'osi_admin',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = dbpool.promise()