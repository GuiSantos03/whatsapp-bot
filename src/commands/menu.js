const { readFile } = require("fs");

module.exports = (client, message, now, config) => {
    if (message.body !== undefined && message.body.startsWith(`${config.prefix}menu`)) {
        readFile("./commands/libs/utils/commands.txt", "utf-8", (error, data) => {
            client.reply(message.from, data, message.id);
            console.log("\x1b[32m", `[LOG] Menu enviado em ${Date.now() - now}ms`);
            if (error) console.error(error);
        });
    }
};
