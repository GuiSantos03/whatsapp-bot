const wa = require("@open-wa/wa-automate");
const Consign = require("consign");
const tweetsFeijoada = require("./commands/libs/tweetsFeijoada");
const config = require("./config.json");
const { isFiltered, addFilter } = require("./commands/libs/antiSpam");

module.exports = function run() {
    wa.create().then(client => start(client));

    const consign = Consign();

    consign
        .include("./src/commands")
        .exclude("./src/commands/libs");

    async function start(client) {
        client.onMessage(async message => {
            if (message.body.startsWith(`${config.prefix}`) && isFiltered(message.sender.id)) {
                addFilter(message.sender.id);
                const now = Date.now();
                consign.into(client, message, now, config);
            } else {
                console.log("\x1b[31m", "[LOG] SPAM");
            }
        });

        tweetsFeijoada(client);
    }
};
