const { readFile } = require("fs");
const path = require("path");

module.exports = (client, message, now, config) => {
    if (message.body.startsWith(`${config.prefix}menu`)) {
        readFile(path.join("src", "commands", "libs", "utils", "commands.txt"), "utf8", async (error, data) => {
            await client.reply(message.from, data, message.id);
            console.log("\x1b[32m", `[LOG] Menu enviado em ${Date.now() - now}ms`);
            if (error) console.error(error);
        });
    }
};
