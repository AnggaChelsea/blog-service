const pgsql = require('pg-promise')
const db = pgsql()(process.env.DATABASE_URL_REPORT)