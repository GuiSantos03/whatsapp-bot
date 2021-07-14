const wa = require("@open-wa/wa-automate");
const Consign = require("consign");
const config = require("./config.json");

module.exports = function run() {
    wa.create().then(client => start(client));

    const consign = Consign();

    consign
        .include("./src/commands")
        .exclude("./src/commands/libs");

    async function start(client) {
        client.onMessage(async message => {
            const now = Date.now();
            consign.into(client, message, now, config);
        });
    }
};
