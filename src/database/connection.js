const mysql = require("mysql");

const connection = new mysql.createConnection({
    user: "",
    host: "",
    database: "",
    password: "",
    port: 3306
});

module.exports = connection;
