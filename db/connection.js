const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',

    user: "root",

    password: "juanjohn",

    database: "employees"

});

module.exports = connection;
