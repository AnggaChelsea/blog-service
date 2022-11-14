const sql = require('../../config/db_sql_connect')

const allNav = () => {
    const Query = 'SELECT * FROM navbar'
    return sql.execute(Query)
}

module.exports = {
    allNav
}