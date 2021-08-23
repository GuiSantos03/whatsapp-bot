const connection = require("../database/connection");

class LastfmRepo {
    addUser(user) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO users SET ?";
            connection.query(
                sql,
                user,
                (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                }
            );
        });
    }

    searchById(userId) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE userId="${userId}"`;

            connection.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                }

                const user = results[0];
                const lastfmUsername = user?.lastfmUsername;
                resolve(lastfmUsername);
            });
        });
    }
}

module.exports = new LastfmRepo();
