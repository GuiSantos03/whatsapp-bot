const speechPt = require("../libs/speechPt");

module.exports = async (client, message, now, config) => {
    if (message.quotedMsg && message.body.startsWith(`${config.prefix}ptts`)) {
        if (message.quotedMsg.type === "chat") {
            speechPt(client, message, now);
            return;
        }

        return client.reply(message.from, "Apenas texto", message.id);
    }
};


