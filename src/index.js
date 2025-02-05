const wa = require("@open-wa/wa-automate");
const Consign = require("consign");
const tweetsFeijoada = require("./commands/libs/tweetsFeijoada");
const config = require("./config.json");
const { isFiltered, addFilter } = require("./commands/libs/antiSpam");

const Table = require("./database/createTable");

const { connection } = require("./database/connection");


module.exports = function run() {
    wa.create().then(client => start(client));

    new Table(connection);

    const consign = Consign();

    consign.include("./src/commands").exclude("./src/commands/libs");

    async function start(client) {
        client.onMessage(async message => {
            const isCmd =
                message.body !== undefined &&
                message.body.startsWith(`${config.prefix}`);
            if (isCmd && isFiltered(message.sender.id)) {
                addFilter(message.sender.id);
                const now = Date.now();
                consign.into(client, message, now, config);
                cutCache(client);
            } else if (isCmd && !isFiltered(message.sender.id)) {
                console.log("\x1b[31m", "[LOG] SPAM");
            }
        });

        tweetsFeijoada(client);
    }
};


async function cutCache(client) {
    const msgsCount = await client.getAmountOfLoadedMessages();

    if (msgsCount >= 4000) {
        console.log(` [LOG] ${msgsCount} messages in cache`);
        const cut = await client.cutChatCache();
        console.log(" [LOG] cache wiped");
        console.log(cut);
    }
}
