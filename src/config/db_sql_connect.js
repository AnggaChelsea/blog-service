// Create the connection pool. The pool-specific settings are the defaults
// const dbpool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'osi_admin',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
  const mysql = require('mysql2');
  const express = require('express');
// module.exports = () => {
  const connection =  () => {
    mysql.createPool({
    host: "localhost",
    user: "root",
    database: "indowalks",
  });
}
module.exports = connection;
// }


