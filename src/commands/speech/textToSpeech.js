const { speech } = require("../libs/speech");

module.exports = async (client, message, now, config) => {
    if (message.body !== undefined && !message.quotedMsg && message.body.startsWith(`${config.prefix}tts`)) {
        console.log("chgou");
        speech(client, message, now);
    }
};

