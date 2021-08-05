const { speech } = require("../libs/speech");

module.exports = async (client, message, now, config) => {
    if (!message.quotedMsg && message.body.startsWith(`${config.prefix}tts`)) {
        speech(client, message, now);
    }
};

