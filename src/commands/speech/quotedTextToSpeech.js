const { speech } = require("../libs/speech");

module.exports = async (client, message, now, config) => {
    if (message.quotedMsg && message.body.startsWith(`${config.prefix}tts`)) {
        if (message.quotedMsg.type === "chat") {
            speech(client, message, now);
            return;
        }

        return client.reply(message.from, "Apenas texto", message.id);
    }
};


