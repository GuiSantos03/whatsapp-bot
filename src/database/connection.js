const { createPool } = require("mysql");

const connection = createPool({
    connectionLimit: 15,
    user: "",
    host: "",
    database: "",
    password: "",
    port: 3306
});

module.exports = {
    connection
};
