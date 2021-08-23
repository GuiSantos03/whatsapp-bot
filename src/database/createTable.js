class Table {
    constructor(connection) {
        this.connection = connection;
        this.createUsersTable();
    }

    createUsersTable() {
        const sql =
            "CREATE TABLE IF NOT EXISTS users (userId varchar(50) NOT NULL, lastfmUsername varchar(20) NOT NULL, PRIMARY KEY(userId))";

        this.connection.query(sql, err => {
            if (err) {
                console.log(err);
            } else {
                console.log("users table already exists");
            }
        });
    }
}

module.exports = Table;
